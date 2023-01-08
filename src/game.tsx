import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import Choices from "./components/choicePicker";
import { GameContext } from "./context/gameContext";

export function Game() {
	const { pokemon } = useContext(GameContext)

	return (
		<>
			<View style={styles.container}>
				<Surface style={styles.pokemonContainer}>
					<Image source={{ uri: pokemon.sprites.front_default, height: 300, width: 300 }} style={styles.pokemon} />
					<Image source={{ uri: pokemon.sprites.front_default, height: 300, width: 300 }} style={styles.overlay} />
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

	overlay: {
		position: "absolute",
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