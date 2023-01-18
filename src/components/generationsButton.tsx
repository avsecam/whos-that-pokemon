import { useContext } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { MD3Theme, useTheme, Text } from "react-native-paper"
import { formatGenerationName } from "../api/generations"
import { GameContext } from "../context/gameContext"

export default function GenerationsButton({
	onPress
}: {
	onPress: () => void
}) {
	const theme: MD3Theme = useTheme()
	const styles = StyleSheet.create({
		settings: {
			padding: 10,
			position: "absolute",
			width: "90%",
			bottom: 20,
			backgroundColor: theme.colors.primary,
			borderRadius: 5,
		},
		settingsText: {
			textAlign: "center",
			textAlignVertical: "center",
		}
	})

	const { generations } = useContext(GameContext)

	return (
		<TouchableOpacity onPress={onPress} style={styles.settings}>
			<Text variant="bodyLarge" style={styles.settingsText}>
				{generations.map((gen, idx) => {
					return (idx !== generations.length - 1) ? `${formatGenerationName(gen)}, ` : `${formatGenerationName(gen)}`
				})}
			</Text>
		</TouchableOpacity>
	)
}