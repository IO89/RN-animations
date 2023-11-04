import {View, StyleSheet, SafeAreaView} from "react-native";
import React from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue, withRepeat,
    withTiming
} from "react-native-reanimated";
import {CheckMark} from "./CheckMark";
import { BlurView } from 'expo-blur';

const AnimatedCheckMark = Animated.createAnimatedComponent(CheckMark);

const ANIMATION_DURATION = 2000;
export const CheckMarkInCircle = () => {
    /*Gradient*/
    const gradientPosition = useSharedValue({x: 0, y: 0});
    gradientPosition.value = withRepeat(withTiming({x: 200, y: 80}, {
        duration: ANIMATION_DURATION,
        easing: Easing.linear
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
                <Animated.View style={[styles.gradientSpot,animatedStyleGradient]} />
            <BlurView intensity={100} style={StyleSheet.absoluteFill}/>
            <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                    <AnimatedCheckMark style={animatedStyleCheckMark} height={42} width={42}/>
                </View>
            </View>
            <Animated.Text>Congrats</Animated.Text>

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
        backgroundColor:'#FCDCC8',
        top: 100,
    }
})
