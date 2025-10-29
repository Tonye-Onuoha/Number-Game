import { Text, StyleSheet, Platform } from "react-native";

function Title({ children }) {
    return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        borderWidth: Platform.OS === "android" ? 2 : 0, // You can also achieve the same result using Platform.select({ android: 2, ios: 0 })
        borderColor: "white",
        padding: 12,
        maxWidth: "80%",
        width: 300,
        marginTop: 10
    }
});

/*

React Native enables the import of modules based on the platform in several ways: platform-specific extensions.
When platform-specific code becomes more extensive, React Native allows the use of platform-specific file extensions.
For example, if you have MyComponent.ios.js and MyComponent.android.js, a simple import statement like import MyComponent
from './MyComponent'; will automatically load the correct file based on the running platform (iOS or Android).
This method is ideal for components or modules with significant platform-dependent logic or UI. platform module.
Again this feature is not just limited to component modules, it applies to any module that can be imported e.g the "colors.js" module.
*/
