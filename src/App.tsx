import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { GameProvider } from './context/gameContext';
import GameContainer from './game'
import { Settings } from './settings';
import SplashScreen from './splash';

const PaperTheme: ThemeProp = {
	...DefaultTheme
}

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<PaperProvider theme={PaperTheme}>
			<GameProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
						<Stack.Screen name='Game' component={GameContainer} />
						<Stack.Screen name='Splash' component={SplashScreen} />
						<Stack.Screen name='Settings' component={Settings} />
					</Stack.Navigator>
				</NavigationContainer>
			</GameProvider>
		</PaperProvider>
	);
}