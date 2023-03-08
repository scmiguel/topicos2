import { SafeAreaView, StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, TextStyle } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function Login(){
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <View style={styles.content}>
                <View style={styles.textWrapper}>
                    <Text style={styles.hiText}> Olá </Text>
                    <Text style={styles.userText}> Seja bem-vindo </Text>
                    <Text style={styles.userText}> Daniel </Text>
                </View>
                <View style={styles.form}>
                    <FontAwesome5 name="lock" style={styles.iconLock}/>
                    <TextInput style={styles.inputPassword} secureTextEntry="true" autoFocus="true" placeholder="Digite sua senha" placeholderTextColor="#929292"/>
                    <TouchableOpacity style={styles.buttonLogin}>  
                        <Text style={styles.buttonLoginText}> Conecte-se </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.action}>
                    <TouchableOpacity > 
                            <Text style={styles.userText}> Esqueceu a senha </Text>
                    </TouchableOpacity>
                    <TouchableOpacity > 
                            <Text style={styles.userText}> Sou mulher </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const TEXT: TextStyle = {
    color: "#fff",
    textAlign: "center"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#b0006d",
        paddingTop: Constants.StatusBarHeight
    },
    content: {
        paddingHorizontal: 30
    },
    textWrapper: {
        marginTop: 60,
        marginBottom: 30
    },
    hiText: {
        ...TEXT,
        fontSize: 20,
        lineHeight: 50,
        fontWeight: "bold"
    },
    userText: {
        ...TEXT,
        fontSize: 16,
        lineHeight: 30
    },
    form: {
        marginBottom: 30
    },
    iconLock: {
        color: "#929292",
        position: "absolute",
        fontSize: 16,
        top: 22,
        left: 22,
        zIndex: 10
    },
    inputPassword: {
        height: 60,
        borderRadius: 30,
        paddingHorizontal: 30,
        fontSize: 20,
        color: "#929292",
        backgroundColor: "#fff",
        textAlign: "center",
        textAlignVertical: "center"
    },
    buttonLogin: {
        height: 50,
        borderRadius: 25,
        backgroundColor: "#8d015a",
        justifyContent: "center",
        marginTop: 15
    },
    buttonLoginText: {
        ...TEXT
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})