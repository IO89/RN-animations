import {useNavigation} from "@react-navigation/native";
import {Routes} from "../Routes";
import {ScrollView, View, Text, Pressable, StyleSheet} from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

const examples = [
    {
        title: "Checkmark done",
        screen: "CheckmarkDone"
    }
] as const;

export const Examples = () => {
    const { navigate } = useNavigation<StackNavigationProp<Routes, "Examples">>();
    return (
        <ScrollView style={styles.container}>
            {examples.map((example) => (
                <Pressable
                    key={example.screen}
                    onPress={() => navigate(example.screen)}
                >
                    <View style={styles.thumbnail}>
                        <Text>{example.title}</Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        flex:1
    },
    thumbnail: {
        backgroundColor: "white",
        padding: 20
    }
});
