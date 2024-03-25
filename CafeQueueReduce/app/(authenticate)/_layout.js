import {Stack} from "expo-router";

export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown:false}}/>
            <Stack.Screen name="register" options={{headerShown:false}}/>
            <Stack.Screen name="arrangement_table" options={{headerShown:false}}/>
        </Stack>
    )
}