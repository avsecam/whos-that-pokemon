import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MD3Theme, useTheme } from "react-native-paper"

export default function Header({
	title = "Who's That Pokemon?",
	showButton = false,
	onButtonPress = () => {},
}: {
	title?: string,
	showButton?: boolean,
	onButtonPress?: () => void,
}) {
	const theme: MD3Theme = useTheme()

	return (
		<>
			<View style={[styles.header, { backgroundColor: theme.colors.secondary }]}>
				<Text style={{ fontSize: 25 }}>{title}</Text>
				{showButton ?
					<TouchableOpacity style={styles.button} onPress={onButtonPress}>
						<MaterialIcon name="settings" size={30} />
					</TouchableOpacity> :
					null}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 70,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20
	},

	button: {
		height: "80%",
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
	}
})