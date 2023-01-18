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
		}
	})

	const { gameState, resetScoreAndLives } = useContext(GameContext)

	function onResetGame() {
		resetScoreAndLives()
		navigation.replace("Game")
	}

	return (
		<View style={styles.container}>
			<Text>Game Over</Text>
			<Text>Score: {gameState.score}</Text>
			<GenerationsButton onPress={onResetGame} />
		</View>
	)
}