import {SafeAreaView, StyleSheet, View} from "react-native";
import React, {useEffect} from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue, withDelay,
    withSequence, withSpring,
    withTiming
} from "react-native-reanimated";
import {CheckMark} from "./CheckMark";
import {BlurView} from 'expo-blur';
import CheckMarkText from "./CheckMarkText";

const AnimatedCheckMark = Animated.createAnimatedComponent(CheckMark);

const CHECKMARK_ANIMATION_DURATION = 250;
const GRADIENT_ANIMATION_DURATION = 4000;
const CHECKMARK_ANIMATION_DELAY = 500;

export const CheckMarkInCircle = () => {
    const gradientPosition = useSharedValue({ x: 0, y: 0 })
    const checkMarkScale = useSharedValue(1)
    const circleScale = useSharedValue(1)


    useEffect(() => {
        /*Gradient circle movement*/
        gradientPosition.value = withTiming(
            { x: 200, y: 250 },
            {
                duration: GRADIENT_ANIMATION_DURATION,
                easing: Easing.ease,
            }
        )
        /*Bouncing checkmark*/
        checkMarkScale.value = withDelay(
            CHECKMARK_ANIMATION_DELAY,
            withSpring(2, {
                duration: CHECKMARK_ANIMATION_DURATION,
                overshootClamping: false,
                dampingRatio: 0.5,
                stiffness: 100,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
            })
        )

        /* Circle around checkmark */
        circleScale.value = withDelay(
            CHECKMARK_ANIMATION_DELAY,
            withSequence(
                withTiming(1.5, {
                    duration: GRADIENT_ANIMATION_DURATION,
                    easing: Easing.bounce,
                }),
                withTiming(1, {
                    duration: GRADIENT_ANIMATION_DURATION,
                    easing: Easing.bounce,
                })
            )
        )
    }, [
        gradientPosition,
        checkMarkScale,
        circleScale,
    ])


    const animatedStyleGradient = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: gradientPosition.value.x },
                { translateY: gradientPosition.value.y },
            ],
        }
    })

    const animatedStyleCheckMark = useAnimatedStyle(() => {
        return {
            transform: [{ scale: checkMarkScale.value }],
        }
    })

    const animatedStyleCircle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: circleScale.value }],
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.gradientSpot, animatedStyleGradient]}/>
            <BlurView intensity={100} style={StyleSheet.absoluteFill}/>
            <View style={styles.outerCircle}>
                <Animated.View style={[styles.innerCircle, animatedStyleCircle]}>
                    <AnimatedCheckMark
                        width={32}
                        height={32}
                        color={"white"}
                        style={animatedStyleCheckMark}
                    />
                </Animated.View>

            </View>
            <CheckMarkText onAnimationEnd={()=>{}} />
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
