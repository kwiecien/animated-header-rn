import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {LOREM_IPSUM} from "./LoremIpsum";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function App() {
    const scroll = useRef(new Animated.Value(0)).current;
    const translateHeader = scroll.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });
    const translateHeaderText = Animated.multiply(translateHeader, -1.5);
    const fadeOut = scroll.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const headerText = (
        <Animated.Text style={[styles.headerText, {transform: [{translateY: translateHeaderText}]}]}>
            Animated header
        </Animated.Text>
    );

    const fadingOutText = (
        <Animated.Text style={[styles.fadingOutText, {opacity: fadeOut}]}>
            Is it magic?
        </Animated.Text>
    );

    const animatedHeader = (
        <Animated.View style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
            {headerText}
            {fadingOutText}
        </Animated.View>
    );

    const animatedScrollView = (
        <Animated.ScrollView
            contentContainerStyle={styles.scrollView}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scroll}}}], {
                useNativeDriver: true,
            })}
            scrollEventThrottle={1}>
            <Text>{LOREM_IPSUM}</Text>
        </Animated.ScrollView>
    );

    return (
        <View style={styles.container}>
            {animatedHeader}
            {animatedScrollView}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        justifyContent: "space-between",
        backgroundColor: '#E7C5E0',
        height: HEADER_MAX_HEIGHT,
        padding: 20,
        position: "absolute",
        width: '100%',
        zIndex: 1,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    fadingOutText: {
        fontSize: 18,
    },
    scrollView: {
        backgroundColor: '#7FD8DD',
        marginTop: HEADER_MAX_HEIGHT,
        padding: 20,
    },
});
