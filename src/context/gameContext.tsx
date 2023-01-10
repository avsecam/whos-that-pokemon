import { createContext, useEffect, useState } from "react";

import dewott from "../../dewott.json"

// REMEMBER: After setting generation or when opening app, fetch pokemon list. Maybe save to cache

type GameState = {
	pokemon: typeof dewott, // TODO: change this when you are going to use the API
	choices: [string, string, string, string],
	choice: string,
}

type GameContext = {
	gameState: GameState,
	generations: string[], // Which generations to pick from. IDs
	addGeneration: (id: string) => void,
	removeGeneration: (id: string) => void,
	choose: (choice: string) => boolean, // true iff correct
}

export const GameContext = createContext({} as GameContext)

export function GameProvider({ children }: { children: JSX.Element }) {
	const [gameState, setGameState] = useState<GameState>({
		pokemon: dewott,
		choices: ["A", "Dewott", "C", "D"],
		choice: ""
	})

	const [generations, setGenerations] = useState<string[]>([])

	useEffect(() => {
		console.log(generations)
	}, [generations])

	function addGeneration(id: string) { // Add generation if it isn't in the array yet
		let newGenerations: string[] = []
		if (generations !== undefined) {
			newGenerations = (generations.find(val => val === id)) ? generations : [...generations, id]
		} else {
			newGenerations = [id]
		}
		setGenerations(newGenerations)
	}
	
	function removeGeneration(id: string) {
		if (generations === undefined) return
		setGenerations(generations.filter(val => val === id))
	}

	function choose(choice: string) {
		const choiceLowercase: string = choice.toLowerCase()
		setGameState({
			...gameState,
			choice: choiceLowercase
		})
		return (choiceLowercase === gameState.pokemon.name)
	}

	return (
		<GameContext.Provider value={{ gameState, generations, addGeneration, removeGeneration, choose }}>
			{children}
		</GameContext.Provider>
	)
}