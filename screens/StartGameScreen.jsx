import { useState } from "react";
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    useWindowDimensions
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Colors from "../constants/colors";

/*
useWindowDimensions is the preferred API for React components.
Unlike Dimensions, it updates as the window's dimensions update. This works nicely with the React paradigm.
*/

function StartGameScreen({ onPickedNumber }) {
    const [number, setNumber] = useState("");
    const { width, height } = useWindowDimensions();

    const inputHandler = (enteredNumer) => setNumber(enteredNumer);

    const resetInputHandler = () => setNumber("");

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(number);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number!", "Number has to be a value between 1 and 99.", [
                { text: "Okay", style: "destructive", onPress: resetInputHandler }
            ]);
            return;
        }

        onPickedNumber(chosenNumber);
    };

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behaviour="position">
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={number}
                            onChangeText={inputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        alignItems: "center"
    },
    instructionText: {
        color: Colors.accent500,
        fontSize: 24
    },
    numberInput: {
        width: 50,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        marginVertical: 8,
        color: Colors.accent500,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
});

export default StartGameScreen;

/* We use the shadowColor, shadowOffset, shadowRadius, shadowOpacity to mimic the elevation property on ios devices */
