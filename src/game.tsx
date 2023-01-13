import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, MD3Theme, Surface, useTheme } from "react-native-paper";
import Choices from "./components/choicePicker";
import Header, { HEADER_HEIGHT } from "./components/header";
import PlayerStats from "./components/playerStats";
import { GameContext } from "./context/gameContext";

export default function GameContainer({
	navigation
}: NativeStackScreenProps<ParamListBase>
) {
	const { gameState } = useContext(GameContext)

	return (
		<View style={{ height: "100%" }}>
			<Header showButton={true} onButtonPress={() => { navigation.navigate("Settings") }} />
			<View style={{ alignItems: "center", justifyContent: "space-around" }}>
				<Game />
			</View>
		</View>
	);
}

function Game() {
	const theme: MD3Theme = useTheme()
	const imageSize: number = 300

	const { gameState } = useContext(GameContext)
	const pokemon = gameState.pokemon
	const fadeProgress = useRef(new Animated.Value(0.0)).current

	function showPokemon() {
		Animated.timing(fadeProgress, {
			toValue: 1.0,
			duration: 200,
			useNativeDriver: false,
		}).start()
	}

	useEffect(() => {
		if (gameState.choice) {
			showPokemon()
		} else {
			fadeProgress.setValue(0.0)
		}
	}, [gameState.choice])

	return (
		<>
			<View style={styles.container}>
				{(!gameState.pokemon || !gameState.choices) ?
					<ActivityIndicator size={80} style={{ height: "100%", width: "100%", alignSelf: "center" }} /> :
					<>
						<Surface style={styles.pokemonContainer}>
							<View style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
								<Image source={{ uri: pokemon?.spriteUrl, height: imageSize, width: imageSize }} style={{ position: "absolute", tintColor: theme.colors.primary }} />
								<Animated.Image source={{ uri: pokemon?.spriteUrl, height: imageSize, width: imageSize }} style={{ opacity: fadeProgress }} />
							</View>
						</Surface>
						<Choices />
					</>
				}
			</View>
			<PlayerStats />
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		alignItems: "center",
		justifyContent: "space-evenly"
	},

	pokemonContainer: {
		width: "80%",
		aspectRatio: 1,
		marginTop: HEADER_HEIGHT,
		justifyContent: "center",
		alignItems: "center",
	},
})

