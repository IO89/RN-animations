import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CongratulationsScreen} from "./src/Congratulations/Congratulations.screen";
import {Routes} from "./src/Routes";

const Stack = createNativeStackNavigator<Routes>();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Congratulations"} component={CongratulationsScreen} options={{
                    title: "Congratulations",
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
