import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import GenerationsButton from "./components/generationsButton";
import { GameContext } from "./context/gameContext";

export function GameOverScreen({
	navigation
}: NativeStackScreenProps<ParamListBase>
) {
	const theme: MD3Theme = useTheme()
	const styles = StyleSheet.create({
		container: {
			height: "100%",
			width: "100%",
			backgroundColor: theme.colors.primaryContainer,
			alignItems: "center",
		},
		gameOver: {
			flex: 1.5,
			textAlignVertical: "center",
			fontSize: theme.fonts.displayLarge.fontSize
		},
		score: {
			flex: 1,
			fontSize: theme.fonts.displayLarge.fontSize
		},
		reset: {
			flex: 1,
		},
		resetText: {
			fontSize: theme.fonts.displayLarge.fontSize
		}
	})

	const { gameState, resetScoreAndLives } = useContext(GameContext)

	function onResetGame() {
		resetScoreAndLives()
		navigation.replace("Game")
	}

	return (
		<View style={styles.container}>
			<Text style={styles.gameOver}>Game Over</Text>
			<Text style={styles.score}>Score: {gameState.score ?? 0}</Text>
			<TouchableOpacity onPress={onResetGame} style={styles.reset}>
				<Text style={styles.resetText}>
					Retry
				</Text>
			</TouchableOpacity>
			<GenerationsButton onPress={() => navigation.navigate("Settings")} />
		</View>
	)
}