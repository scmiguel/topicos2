import {SafeAreaView, StyleSheet, View, Text} from 'react-native'
import Constants from 'expo-constants'
import {StatusBar} from 'expo-status-bar'
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validationSchema } from './validation';
export default function SignUp() {
    return (
        <>
           <SafeAreaView style={styles.topSafeArea}/>
           <StatusBar style="light"/>
           <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}> SignUp </Text>
              </View>
              <Formik 
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                onSubmit={(values, actions) => {
                    onSubmitHandler(values, actions)
                }}
                validationSchema={validationSchema}
                >
                {({
                    handleChange, 
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleBlur
                }) => (
                    <KeyboardAwareScrollView> 

                    </KeyboardAwareScrollView>
                )}    
              </Formik>
           </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    topSafeArea: {
        backgroundColor: "#3498db"
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#3498db"      
    },
    header: {
        height: 60,
        justifyContent: "center", // centraliza na vertical
        alignItems: "center", // centraliza na horizontal
        backgroundColor: "3498db"
    },
    headerText: {
        color: "#fff",
        fontSize: 18
    }
})