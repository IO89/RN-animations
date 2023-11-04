import {View, StyleSheet} from "react-native";
import React from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue, withRepeat,
    withTiming
} from "react-native-reanimated";
import {CheckMark} from "./CheckMark";

const AnimatedCheckMark = Animated.createAnimatedComponent(CheckMark);

const ANIMATION_DURATION = 2000;
export const CheckMarkInCircle = () => {
    /*Bouncing checkmark*/
    const scale = useSharedValue(1);
    scale.value = withRepeat(withTiming(1.2, {
        duration: ANIMATION_DURATION,
        easing: Easing.bounce
    }), Infinity)


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value}
            ]
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                    <Animated.View style={animatedStyle}>
                        <AnimatedCheckMark style={animatedStyle} height={42} width={42}  />
                    </Animated.View>
                </View>
            </View>
            <Animated.Text>Congrats</Animated.Text>
            {/* Overlay Gradient */}
            {/*<LinearGradient*/}
            {/*    colors={['#FDFCFB', 'rgba(255, 218, 185, 0.3)']}*/}
            {/*    style={styles.gradientSpot}*/}
            {/*    start={{x: 0, y: 4}}*/}
            {/*    end={{x: 2, y: 2}}*/}
            {/*/>*/}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#FDFCFB",
        justifyContent: "space-evenly",
        alignItems: "center",
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
        alignSelf: "center",
    }
})
