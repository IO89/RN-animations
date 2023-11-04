import {SafeAreaView, StyleSheet, View} from "react-native";
import React from "react";
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";
import {CheckMark} from "./CheckMark";
import {BlurView} from 'expo-blur';

const AnimatedCheckMark = Animated.createAnimatedComponent(CheckMark);

const ANIMATION_DURATION = 3000;

// Array of texts you want to show
const textArray = ['Start', 'In Progress', 'Done'];
export const CheckMarkInCircle = () => {
    /*Text animation based on progress*/
    const progress = useSharedValue(0);
    progress.value = withRepeat(withTiming(1, {duration: ANIMATION_DURATION}), Infinity);
    const updateText = (value: number) => {
        if (textArray[value] !== undefined) {
            setText(textArray[value]);
        }
    };
    useAnimatedReaction(
        () => {
            return interpolate(
                progress.value,
                [0, 0.5, 1],
                [0, 1, 2],
                Extrapolation.CLAMP
            );
        },
        (current, previous) => {
            if (current !== previous) {
                runOnJS(updateText)(Math.round(current));
            }
        }
    );

    const [text, setText] = React.useState('Start');


    /*Gradient circle movement*/
    const gradientPosition = useSharedValue({x: 0, y: 0});
    gradientPosition.value = withRepeat(withTiming({x: 200, y: 250}, {
        duration: ANIMATION_DURATION,
        easing: Easing.ease
    }), Infinity)


    const animatedStyleGradient = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: gradientPosition.value.x},
                {translateY: gradientPosition.value.y}
            ]
        }
    })

    /*Bouncing checkmark*/
    const scale = useSharedValue(1);
    scale.value = withRepeat(withTiming(1.3, {
        duration: ANIMATION_DURATION,
        easing: Easing.bounce
    }), Infinity)


    const animatedStyleCheckMark = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value}
            ]
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.gradientSpot, animatedStyleGradient]}/>
            <BlurView intensity={100} style={StyleSheet.absoluteFill}/>
            <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                    <AnimatedCheckMark style={animatedStyleCheckMark} height={42} width={42}/>
                </View>
            </View>
            <Animated.Text>{text}</Animated.Text>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FDFCFB",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FC9C7E",
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FDEDE3",
    },
    gradientSpot: {
        width: 400,
        height: 400,
        borderRadius: 200,
        position: "absolute",
        backgroundColor: '#FCDCC8',
        top: 100,
    }
})
