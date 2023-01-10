import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ActivityIndicator, MD3Theme, Surface, useTheme } from "react-native-paper";
import { generationsAreSaved, getRandomGeneration, saveGenerationData } from "./api/generations";
import { getRandomPokemon, PokemonData } from "./api/pokemon";
import Choices from "./components/choicePicker";
import Header from "./components/header";
import { GameContext } from "./context/gameContext";

export default function Game({
	navigation
}: NativeStackScreenProps<ParamListBase>
) {
	const theme: MD3Theme = useTheme()
	const imageSize: number = 300

	const { gameState, resetPokemonAndChoices } = useContext(GameContext)
	const pokemon = gameState.pokemon
	const wipeProgress = useRef(new Animated.Value(0.0)).current

	function showPokemon() {
		Animated.timing(wipeProgress, {
			toValue: 1.0,
			duration: 200,
			useNativeDriver: false,
		}).start()
	}

	useEffect(() => {
		if (gameState.choice) {
			showPokemon()
		}
	}, [gameState.choice])

	return (
		<>
			<Header showButton={true} onButtonPress={() => { navigation.navigate("Settings") }} />
			<View style={styles.container}>
				{(!gameState.pokemon || !gameState.choices) ?
					<ActivityIndicator /> :
					<>
						<Surface style={styles.pokemonContainer}>
							<View style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
								<Image source={{ uri: pokemon?.spriteUrl, height: imageSize, width: imageSize }} style={{ position: "absolute", tintColor: theme.colors.primary }} />
								<Animated.Image source={{ uri: pokemon?.spriteUrl, height: imageSize, width: imageSize }} style={{ opacity: wipeProgress }} />
							</View>
						</Surface>
						<Choices />
						<View>
							<Text style={[styles.score, { color: theme.colors.primary }]}>Score: {gameState.score ?? 0}</Text>
						</View>
					</>
				}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		alignSelf: "center",
	},

	pokemonContainer: {
		marginTop: 50,
		width: "80%",
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	score: {
		fontSize: 30,
	}
})

