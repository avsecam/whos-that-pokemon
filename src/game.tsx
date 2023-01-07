import { Pressable, StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import Choices from "./components/radioButton";

export function Game() {
	return (
		<>
			<View style={styles.container}>
				<Surface style={styles.pokemonContainer}>
					<Text>Pokemon</Text>
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