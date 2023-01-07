import { View, Pressable, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const colorRight: string = "limegreen"
const colorWrong: string = "red"

export default function Choices() {
	return (
		<View style={styles.choicesContainer}>
			<ChoiceButton text="A" />
			<ChoiceButton text="A" />
			<ChoiceButton text="A" />
			<ChoiceButton text="A" />
		</View>
	)
}

function ChoiceButton({
	text
}: {
	text?: string
}) {


	return (
		<Pressable style={styles.choiceButton}>
			<Text style={{ marginLeft: 15 }}>{text ? text : null}</Text>
			<IconButton icon="check-bold" iconColor={colorRight} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	choicesContainer: {
		flexDirection: "row",
		marginTop: 50,
		flexWrap: "wrap",
		alignItems: "center"
	},

	choiceButton: {
		borderWidth: 1,
		height: 100,
		width: "50%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
})