import AsyncStorage from "@react-native-async-storage/async-storage/"
import { useContext, useEffect, useState } from "react"
import { Text, View } from "react-native"
import { Button, Checkbox, List } from "react-native-paper"
import { getGenerations } from "./api/fetch"
import Header from "./components/header"
import { GameContext } from "./context/gameContext"

export function Settings() {
	return (
		<>
			<Header title="Settings" />
			<View>
				<GenerationPicker />
				<List.Item title="Theme" />
			</View>
		</>
	)
}

function GenerationPicker() {
	const { generations } = useContext(GameContext)

	let allGenerations
	useEffect(() => {
		(async () => {
			allGenerations = await getGenerations()
		})()
	}, [allGenerations])

	// const generationCheckboxes: JSX.Element[] = allGenerations.map(gen => 
	// 	<Checkbox.Item label={gen.name} />
	// )

	return (
		<>
			<List.Accordion title="Generations" onPress={async () => console.log(await AsyncStorage.getItem("generation-i"))}>
			</List.Accordion>
		</>
	)
}
