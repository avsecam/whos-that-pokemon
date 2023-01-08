import { createContext, useContext, useState } from "react";

import dewott from "../../dewott.json"

// REMEMBER: After setting generation or when opening app, fetch pokemon list. Maybe save to cache

type GameContext = {
	generations: string[], // Which generations to pick from
	pokemon: typeof dewott, // TODO: change this when you are going to use the API
	choices: [string, string, string, string],
	choice: string,
	choose: (choice: string) => boolean, // true iff correct
}

export const GameContext = createContext({} as GameContext)

export function GameProvider({ children }: { children: JSX.Element }) {
	const [context, setContext] = useState({
		pokemon: dewott,
		choices: ["A", "Dewott", "C", "D"]
	} as GameContext)

	function choose(choice: string) {
		const choiceLowercase: string = choice.toLowerCase()
		setContext({
			...context,
			choice: choiceLowercase
		})
		return (choiceLowercase === context.pokemon.name)
	}

	return (
		<GameContext.Provider value={{ ...context, choose }}>
			{children}
		</GameContext.Provider>
	)
}