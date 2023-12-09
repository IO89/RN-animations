import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

const TEXT_ARRAY = ['start', 'in porgress', 'end']

type Props = {
    onAnimationEnd: () => void
}
const CheckMarkText = ({ onAnimationEnd }: Props) => {
    const [text, setText] = useState(TEXT_ARRAY[0])

    useEffect(() => {
        const interval = setInterval(() => {
            const currentIndex = TEXT_ARRAY.indexOf(text)
            if (currentIndex < TEXT_ARRAY.length - 1) {
                setText(TEXT_ARRAY[currentIndex + 1])
            } else {
                clearInterval(interval)
                onAnimationEnd()
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [text, onAnimationEnd])

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Animated.Text
                    style={styles.text}
                    key={`Text ${text}`}
                    entering={FadeIn.duration(500).delay(500)}
                >
                    {text}
                </Animated.Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        rowGap: 32,
        alignItems: 'center',
        position: 'absolute',
    },
    text: {
        fontSize: 32,
    }

})
export default CheckMarkText
