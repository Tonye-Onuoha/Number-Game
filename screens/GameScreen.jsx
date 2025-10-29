import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import NumberContainer from "../components/game/NumberContainer";
import GuessLogItem from "../components/game/GuessLogItem";
import Entypo from "@expo/vector-icons/Entypo";

function generateRandomBetween(min, max, exclude) {
    // By default this function will always exclude the max number from the guessed number.
    // The min number on the other hand will always be included.
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;

let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    // Hardcoding min and max here (as opposed to inputing their respective variables) ensures that this function never runs when they are both the same.
    // After all we only need the "initialGuess" when the component mounts initially.
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

    console.log(width, height);

    const guessRoundsListLength = guessRounds.length;

    const nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < userNumber) ||
            (direction === "higher" && currentGuess > userNumber)
        ) {
            Alert.alert("Dont lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
            return;
        }
        if (direction === "lower") {
            maxBoundary = currentGuess;
        } else if (direction === "higher") {
            minBoundary = currentGuess + 1;
        }
        const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNumber);
        setGuessRounds((prevGuessRounds) => [newRandomNumber, ...prevGuessRounds]);
    };

    useEffect(() => {
        if (currentGuess === userNumber) onGameOver(guessRoundsListLength);
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(null, "lower")}>
                            <Entypo name="minus" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(null, "higher")}>
                            <Entypo name="plus" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(null, "lower")}>
                            <Entypo name="minus" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(null, "higher")}>
                            <Entypo name="plus" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => (
                        <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        paddingBottom: 0,
        alignItems: "center"
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    buttonContainerWide: {
        flexDirection: "row",
        alignItems: "center"
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
});
