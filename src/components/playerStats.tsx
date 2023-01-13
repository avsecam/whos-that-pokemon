import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { MD3Theme, useTheme, Text } from "react-native-paper";
import { GameContext, MAX_LIVES } from "../context/gameContext";
import { HEADER_HEIGHT } from "./header";

export default function PlayerStats() {
	const theme: MD3Theme = useTheme()
	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			marginBottom: HEADER_HEIGHT / 2,
		},
		lives: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			flex: 1,
		},
		life: {
			height: 20,
			aspectRatio: 1,
			borderRadius: 999,
			marginHorizontal: 5,
		},
		score: {
			fontSize: 30,
			flex: 1,
			textAlign: "center"
		}
	})

	const { gameState } = useContext(GameContext)

	return (
		<View style={styles.container}>
			<View style={styles.lives}>
				{Array(MAX_LIVES).fill("").map((_, idx) =>
					<View style={[styles.life, {backgroundColor: (idx < (gameState.lives ?? 0)) ? "red" : "gray"}]} key={idx}></View>
				)}
			</View>
			<Text style={[styles.score, { color: theme.colors.primary }]}>Score: {gameState.score ?? 0}</Text>
		</View>
	)
}
