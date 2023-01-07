import { useEffect, useRef, useState } from "react";
import { View, Pressable, Text, StyleSheet, Animated, Dimensions, Easing } from "react-native";
import { IconButton } from "react-native-paper";

const colorRight: string = "limegreen"
const colorWrong: string = "red"

export default function Choices() {
	return (
		<View style={styles.choicesContainer}>
			<ChoiceButton text="A" isCorrect={true} />
			<ChoiceButton text="A" isCorrect={false} />
			<ChoiceButton text="A" isCorrect={false} />
			<ChoiceButton text="A" isCorrect={false} />
		</View>
	)
}

function ChoiceButton({
	text,
	isCorrect,
}: {
	text?: string,
	isCorrect: boolean,
}) {
	const wipeDuration: number = 250
	const [showAnswer, setShowAnswer] = useState<boolean>(false)
	const wipeProgress = useRef(new Animated.Value(0)).current

	useEffect(() => {
		// Animate to wipe green or red
		if (showAnswer) {
			wipeIn()
		} else {
			wipeOut()
		}
	}, [showAnswer])

	function wipeIn() {
		Animated.timing(wipeProgress, {
			toValue: Dimensions.get("screen").width / 2,
			duration: wipeDuration,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start()
	}

	function wipeOut() {
		Animated.timing(wipeProgress, {
			toValue: 0,
			duration: wipeDuration,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start()
	}

	return (
		<>
			<Pressable onPress={() => setShowAnswer(!showAnswer)} style={styles.choiceButton}>
				<Animated.View style={[styles.choiceOverlay, { width: wipeProgress }]} />
				<Text>{text ? text : null}</Text>
			</Pressable>
		</>
	)
}

const styles = StyleSheet.create({
	choicesContainer: {
		flexDirection: "row",
		marginTop: 50,
		flexWrap: "wrap",
		alignItems: "center",
	},

	choiceOverlay: {
		backgroundColor: "red",
		position: "absolute",
		left: 0,
		height: 101,
	},

	choiceButton: {
		width: "50%",
		height: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
})