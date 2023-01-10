import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MD3Theme, Surface, useTheme } from "react-native-paper";
import { generationsAreSaved, saveGenerationData } from "./api/generations";
import { getRandomPokemon } from "./api/pokemon";
import Choices from "./components/choicePicker";
import Header from "./components/header";
import { GameContext } from "./context/gameContext";

export default function Game({
	navigation
}: NativeStackScreenProps<ParamListBase>
) {
	const theme: MD3Theme = useTheme()
	const imageSize: number = 300

	const { gameState, generations, addGeneration } = useContext(GameContext)
	const pokemon = gameState.pokemon
	const wipeProgress = useRef(new Animated.Value(0.0)).current
	const [pokemonShown, setPokemonShown] = useState<boolean>(false)

	function togglePokemonVisibility() {
		Animated.timing(wipeProgress, {
			toValue: (pokemonShown) ? 1.0 : 0.0,
			duration: 200,
			useNativeDriver: false,
		}).start()
	}

	useEffect(() => {
		togglePokemonVisibility()
	}, [pokemonShown])


	return (
		<>
			<Header showButton={true} onButtonPress={() => { navigation.navigate("Settings") }} />
			<View style={styles.container}>
				<Surface style={styles.pokemonContainer}>
					<Pressable onPress={() => setPokemonShown(!pokemonShown)} style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
						<Image source={{ uri: pokemon?.spriteUrl, height: imageSize, width: imageSize }} style={{ position: "absolute", tintColor: theme.colors.primary }} />
						<Animated.Image source={{ uri: pokemon?.spriteUrl, height: imageSize, width: imageSize }} style={{ opacity: wipeProgress }} />
					</Pressable>
				</Surface>
				<Choices />
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

	choicesContainer: {
		flexDirection: "row",
		borderWidth: 1,
		marginTop: 50,
		flexWrap: "wrap",
		alignItems: "center"
	},
	choiceButton: {
		borderWidth: 1,
		height: 50,
		width: "50%",
		justifyContent: "center",
		alignItems: "center",
	}
})

