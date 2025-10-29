import { useState, useEffect } from "react";
import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";
import { StatusBar } from "expo-status-bar";

// This prevents SplashScreen from auto hiding while the fonts are in loading state.
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [userNumber, setUserNumber] = useState(null);
    const [guessRounds, setGuessRounds] = useState(0);
    const [gameIsOver, setGameIsOver] = useState(true);

    const [loaded, error] = useFonts({
        "opens-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "opens-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    const pickedNumberHandler = (pickedNumber) => {
        setUserNumber(pickedNumber);
        setGameIsOver(false); // initially to indicate that the game has just started and is not over.
    };

    const gameOverHandler = (numberOfRounds) => {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    };

    const startNewGameHandler = () => {
        setUserNumber(null);
        setGuessRounds(0);
    };

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

    if (userNumber) screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;

    if (userNumber && gameIsOver)
        screen = (
            <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
        );

    return (
        <>
            <StatusBar style="light" />
            <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
                <ImageBackground
                    source={require("./assets/images/background.png")}
                    resizeMode="cover"
                    style={styles.rootScreen}
                    imageStyle={styles.backgroundImage}>
                    <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1
    },
    backgroundImage: {
        opacity: 0.15
    }
});

// expo-linear-gradient provides a native React view that transitions between multiple colors in a linear direction.

/*
SafeAreaView is a React Native component primarily used to render content within the "safe area" boundaries of a device's screen.
The safe area refers to the portion of the screen that is not obscured by physical features of the device (like camera notches, rounded corners, or the sensor housing area)
or by system UI elements (such as the status bar, navigation bars, tab bars, or toolbars).
*/
