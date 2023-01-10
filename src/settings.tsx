import AsyncStorage from "@react-native-async-storage/async-storage/"
import { useContext, useEffect, useState } from "react"
import { GestureResponderEvent, Text, View } from "react-native"
import { Button, Checkbox, List } from "react-native-paper"
import { formatGenerationName, getGenerations, LinkData } from "./api/generations"
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
	const [generationList, setGenerationList] = useState<LinkData[]>([])

	useEffect(() => {
		(async () => {
			setGenerationList(await getGenerations())
		})()
	}, [])

	const rows: JSX.Element[] = generationList.map(gen => <GenerationRow generation={gen} key={gen.id} />)

	return (
		<>
			<List.Accordion title="Generations">
				{rows}
			</List.Accordion>
		</>
	)
}

function GenerationRow({
	generation
}: {
	generation: LinkData
}) {
	const { generations, addGeneration, removeGeneration } = useContext(GameContext)
	const [checked, setChecked] = useState<boolean>(generations.find(gen => gen === generation.name) ? true : false)

	function handlePress() {
		console.log(generation)
		if (checked) removeGeneration(generation.name)
		else addGeneration(generation.name)
		setChecked(!checked)
	}

	return <Checkbox.Item label={formatGenerationName(generation.name)} onPress={handlePress} status={checked ? "checked" : "unchecked"} />
}