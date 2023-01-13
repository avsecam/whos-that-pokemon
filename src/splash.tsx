import App from "../app.json"
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Animated, Image } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { GameContext } from "./context/gameContext";
import { getRandomPokemon, PokemonData } from "./api/pokemon";
import { getRandomFromArray } from "./utils/utils";
import { IMAGE_SIZE } from "./game";
import { formatGenerationName } from "./api/generations";

const CHANGE_TIMER: number = 300

export default function SplashScreen() {
	const theme: MD3Theme = useTheme()
	const styles = StyleSheet.create({
		container: {
			width: "100%",
			height: "100%",
			backgroundColor: theme.colors.primary,
			alignItems: "center",
			justifyContent: "space-around",
		},
		pokemon: {
			height: 200,
			justifyContent: "center"
		},
		pokeball: {
			height: IMAGE_SIZE / 2,
			aspectRatio: 1,
		},
		title: {

		},
		start: {
			borderRadius: 5,
			padding: 20,
			justifyContent: "center",
			backgroundColor: theme.colors.primaryContainer
		},
		startText: {
			fontSize: theme.fonts.headlineLarge.fontSize,
			includeFontPadding: false,
			textTransform: "uppercase"
		}
	})

	const { generations } = useContext(GameContext)

	const [spriteUrls, setSpriteUrls] = useState<string[]>(Array(50).fill(""))
	useEffect(() => {
		(() => {
			(async () => {
				if (generations.length > 0) {
					setSpriteUrls(await Promise.all(spriteUrls.map(async () => (await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData).spriteUrl)))
				}
			})()
		})()
	}, [generations])

	const [sprite, setSprite] = useState<string>(getRandomFromArray<string>(spriteUrls))
	useEffect(() => {
		function changePokemon() {
			setSprite(() => getRandomFromArray<string>(spriteUrls, sprite))
		}

		const interval = setInterval(changePokemon, CHANGE_TIMER)

		return () => {
			clearInterval(interval)
		}
	}, [spriteUrls])

	return (
		<View style={styles.container}>
			<View style={styles.pokemon}>
				{(sprite === "") ?
					<Image source={require("../assets/pokeball.png")} style={styles.pokeball} /> :
					<Image source={{ uri: sprite, height: IMAGE_SIZE, width: IMAGE_SIZE }} fadeDuration={0} />
				}
			</View>
			<Text variant="displayLarge" style={styles.title}>{App.displayName}</Text>
			<TouchableOpacity style={styles.start}>
				<Text style={styles.startText}>Start</Text>
			</TouchableOpacity>
			<Text variant="bodyLarge">Generations: {generations.map((gen, idx) => {
				return (idx !== generations.length - 1) ? `${formatGenerationName(gen)}, ` : `${formatGenerationName(gen)}`
			})}</Text>
		</View>
	)
}