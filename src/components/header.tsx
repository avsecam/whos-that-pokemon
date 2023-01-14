import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { MD3Theme, useTheme, Text, Surface } from "react-native-paper"

export const HEADER_HEIGHT: number = 70

export default function Header({
	title = "Who's That Pokemon?",
	showButton = false,
	onButtonPress = () => { },
}: {
	title?: string,
	showButton?: boolean,
	onButtonPress?: () => void,
}) {
	const theme: MD3Theme = useTheme()
	const styles = StyleSheet.create({
		header: {
			position: "absolute",
			width: "100%",
			height: HEADER_HEIGHT,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 20,
			zIndex: 10,
			backgroundColor: theme.colors.secondary,
		},
		title: {
			fontSize: theme.fonts.headlineMedium.fontSize,
			color: theme.colors.onSecondary,
		},
		button: {
			height: "80%",
			aspectRatio: 1,
			justifyContent: "center",
			alignItems: "center",
		}
	})

	return (
		<>
			<Surface elevation={5} style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				{showButton ?
					<TouchableOpacity style={styles.button} onPress={onButtonPress}>
						<MaterialIcon name="settings" size={30} />
					</TouchableOpacity> :
					null}
			</Surface>
		</>
	)
}
