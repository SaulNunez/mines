import { Button, View } from "react-native";
import { Link } from 'expo-router';

export default function LaunchScreen(){
    return (
        <View>
            <Link href="/mines" asChild>
                <Button title="Beginner" />
            </Link>
            <Link href="/mines" asChild>
                <Button title="Intermediate" />
            </Link>
            <Link href="/mines" asChild>
                <Button title="Hard"/>
            </Link>
        </View>
    )
}