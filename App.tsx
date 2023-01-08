import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { GameProvider } from './src/context/gameContext';
import { Game } from './src/game'
import { Settings } from './src/settings';

const PaperTheme: ThemeProp = {
	...DefaultTheme
}

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<PaperProvider theme={PaperTheme}>
			<GameProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name='Game' component={Game} />
						<Stack.Screen name='Settings' component={Settings} />
					</Stack.Navigator>
				</NavigationContainer>
			</GameProvider>
		</PaperProvider>
	);
}