import { useContext, useEffect, useRef, useState } from "react";
import { View, Pressable, Text, StyleSheet, Animated, Dimensions, Easing } from "react-native";
import { IconButton, MD3Theme, useTheme } from "react-native-paper";
import { GameContext } from "../context/gameContext";


export default function Choices() {
	const { gameState, choose } = useContext(GameContext)
	const choices = gameState.choices
	const [playerHasChosen, setPlayerHasChosen] = useState<boolean>(false)

	useEffect(() => {
		renderChoiceButtons()
	}, [playerHasChosen])

	function handlePress(choice: string) {
		choose(choice)
		setPlayerHasChosen(!playerHasChosen)
	}

	function renderChoiceButtons() {
		return choices?.map((choice, idx) => <ChoiceButton showCorrectness={playerHasChosen} text={choice} onPress={() => handlePress(choice)} key={idx} />)
	}

	return (
		<View style={styles.choicesContainer}>
			{renderChoiceButtons()}
		</View>
	)
}

function ChoiceButton({
	text,
	onPress,
	showCorrectness,
}: {
	text?: string,
	onPress?: () => void,
	showCorrectness?: boolean,
}) {
	const theme: MD3Theme = useTheme()
	const { gameState } = useContext(GameContext)
	const pokemon = gameState.pokemon

	const colorRight: string = "limegreen"
	const colorWrong: string = "red"

	const wipeDuration: number = 300
	const wipeProgress = useRef(new Animated.Value(0)).current

	const isCorrect: boolean = (pokemon?.name === text?.toLowerCase())

	useEffect(() => {
		// Animate to wipe green or red
		if (showCorrectness) wipeIn()
		else wipeProgress.setValue(0)
	}, [showCorrectness])

	function wipeIn() {
		Animated.timing(wipeProgress, {
			toValue: Dimensions.get("screen").width / 2,
			duration: wipeDuration,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start()
	}

	return (
		<>
			<Pressable onPress={onPress} style={styles.choiceButton}>
				<Animated.View style={[styles.choiceOverlay, { backgroundColor: (isCorrect) ? colorRight : colorWrong, width: wipeProgress }]} />
				<Text style={{ color: theme.colors.primary, fontSize: theme.fonts.headlineMedium.fontSize }}>{text ? text : null}</Text>
			</Pressable>
		</>
	)
}

const BUTTON_HEIGHT: number = 80
const styles = StyleSheet.create({
	choicesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},

	choiceOverlay: {
		position: "absolute",
		left: 0,
		height: BUTTON_HEIGHT + 1,
	},

	choiceButton: {
		width: "50%",
		height: BUTTON_HEIGHT,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
})