import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./MainScreen";
import PartOne from "./test/PartOne";
import PartThree from "./test/PartThree";
import PartThreeDetail from "./test/PartThreeDetail";
import PartTwo from "./test/PartTwo";

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <Stack.Navigator initialRouteName="main">
            <Stack.Screen 
                component={MainScreen}
                name="main"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                component={PartOne}
                name="part-one"
            />
            <Stack.Screen 
                component={PartTwo}
                name="part-two"
            />
            <Stack.Screen 
                component={PartThree}
                name="part-three"
            />
            <Stack.Screen 
                component={PartThreeDetail}
                name="part-three-detail"
            />
        </Stack.Navigator>
    );
}
