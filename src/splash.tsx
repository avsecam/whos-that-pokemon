import App from "../app.json"
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Animated, Image } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { GameContext } from "./context/gameContext";
import { getRandomPokemon, PokemonData } from "./api/pokemon";
import { getRandomFromArray } from "./utils/utils";
import { IMAGE_SIZE } from "./game";
import { formatGenerationName } from "./api/generations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import GenerationsButton from "./components/generationsButton";

const CHANGE_TIMER: number = 500

export default function SplashScreen({
	navigation
}: NativeStackScreenProps<ParamListBase>
) {
	const theme: MD3Theme = useTheme()
	const styles = StyleSheet.create({
		container: {
			width: "100%",
			height: "100%",
			backgroundColor: theme.colors.primaryContainer,
			alignItems: "center",
		},
		pokemon: {
			height: "47%",
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
			marginTop: 20,
			padding: 20,
			justifyContent: "center",
			backgroundColor: theme.colors.primary
		},
		startText: {
			fontSize: theme.fonts.headlineLarge.fontSize,
			includeFontPadding: false,
			textTransform: "uppercase"
		},
	})

	const { generations } = useContext(GameContext)

	const [spriteUrls, setSpriteUrls] = useState<string[]>(Array(50).fill(""))
	useEffect(() => { // Get random pokemon when generation list changes
		(async () => {
			if (generations.length > 0) {
				setSpriteUrls(await Promise.all(spriteUrls.map(async () => (await getRandomPokemon(getRandomFromArray<string>(generations)) as PokemonData).spriteUrl)))
			}
		})()
	}, [generations])

	const [sprite, setSprite] = useState<string>(getRandomFromArray<string>(spriteUrls))
	useEffect(() => { // Change pokemon displayed on interval
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
			<TouchableOpacity onPress={() => navigation.replace("Game")} style={styles.start}>
				<Text style={styles.startText}>Start</Text>
			</TouchableOpacity>
			<GenerationsButton onPress={() => navigation.push("Settings")} />
		</View>
	)
}
