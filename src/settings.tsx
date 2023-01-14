import { useContext, useEffect, useState } from "react"
import { Alert, View } from "react-native"
import { Checkbox, List, Switch } from "react-native-paper"
import { formatGenerationName, getGenerations, LinkData } from "./api/generations"
import Header, { HEADER_HEIGHT } from "./components/header"
import { GameContext } from "./context/gameContext"

export function Settings() {
	return (
		<>
			<Header title="Settings" />
			<View style={{ paddingTop: HEADER_HEIGHT }}>
				<GenerationPicker />
				<List.Item title="Dark Theme" right={ThemeSwitch}/>
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

	const rows: JSX.Element[] = generationList.map(gen => <GenerationRow generation={gen} key={gen.name} />)

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
	
	const { generations, toggleGeneration } = useContext(GameContext)
	const [checked, setChecked] = useState<boolean>(generations.find(gen => gen === generation.name) ? true : false)
	
	function handlePress() {
		if (generations.length === 1 && checked) {
			Alert.alert("", "Please add at least one generation.")
			return
		}
		toggleGeneration(generation.name)
		setChecked(!checked)
	}
	
	return <Checkbox.Item label={formatGenerationName(generation.name)} onPress={handlePress} status={checked ? "checked" : "unchecked"} disabled={
		(generation.name === "generation-ix") ? true : false // REMEMBER: Remove this when Generation 9 has sprites
	}/>
}

function ThemeSwitch() {
	const [on, setOn] = useState<boolean>(false)

	return (
		<Switch onValueChange={() => setOn(!on)} value={on ? true : false} />
	)
}