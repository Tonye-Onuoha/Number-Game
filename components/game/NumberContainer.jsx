import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children} </Text>
        </View>
    );
}

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        minWidth: "30%"
    },
    numberText: {
        fontFamily: "opens-sans",
        fontSize: deviceWidth < 380 ? 28 : 36,
        color: Colors.accent500,
        textAlign: "center"
    }
});

// Dimensions Value
/*
Name	Type	Description
window	ScaledSize	Size of the visible Application window.
screen	ScaledSize	Size of the device's screen.
*/

// To know if the device is in portrait mode, simply check if height > width.
// To know if the device is in landscape mode, simply check if width > height.
