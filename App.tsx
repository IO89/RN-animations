import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CheckMarkInCircle} from "./src/CheckmarkDone/CheckMarkInCircle";
import {Routes} from "./src/Routes";
import {Examples} from "./src/Examples/Examples.screen";

const Stack = createNativeStackNavigator<Routes>();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Examples"} component={Examples} options={{
                    title: "Examples"
                }} />
                <Stack.Screen name={"CheckmarkDone"} component={CheckMarkInCircle} options={{
                    title: "Congratulations",
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
