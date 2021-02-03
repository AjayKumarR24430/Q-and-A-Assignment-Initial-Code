import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator } from 'react-native';

import firebase from '../FirebaseConfig';

import BasicButton from "../components/BasicButton";

export default function AddQuizQstn({ route: {
    params: {
        quizId,
    } = {},
} = {},
    navigation,
}) {
    const [isLoading, setIsLoading] = useState(false);

    const [qstn, setQstn] = useState("");

    //function to handle when add btn clicked on
    function hanldeAddBtnClick() {
        if (quizId) {
            setIsLoading(true);

            const timeStamp = ___ // add here: generate the timestamp as taught for quizmania app
            const qstnId = quizId + "_qstn_" + timeStamp;
            console.log(qstnId);

            //adding qstn for that quiz in firebase
            const quizDbRef = firebase.app().database().ref(''); // add your firebase name
            quizDbRef
                .child(quizId + "/questions/" + qstnId)
                .set({
                    question: qstn,
                },
                    (error) => {
                        setIsLoading(false);
                        navigation.goBack();
                    });
        } else {
            navigation.goBack();
        }
    }

    //function to handle when cancel btn is pressed
    function hanldeCancelBtnClick() {
        navigation.goBack();
    }

    //component rendering
    return (
        <>
            {
                isLoading ?
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator style={styles.loader} />
                    </View>
                    :
                    <ScrollView style={styles.container}>
                        <Text style={styles.label}>Question</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Your question?"
                            ____ // add here: the value of this text input to qstn variable
                            autoFocus={true}
                            onChangeText={(val) => setQstn(val)}
                        />
                        <View style={styles.divider}></View>
                        <View style={styles.divider}></View>


                        <View style={styles.btnsContainer}>
                            <BasicButton
                                text="Add"
                                customStyle={styles.button}
                                onPress={hanldeAddBtnClick}
                            />

                            <BasicButton
                                text="Cancel"
                                customStyle={styles.button}
                                onPress={hanldeCancelBtnClick}
                            />
                        </View>
                    </ScrollView >
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 30,
    },

    title: {
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.1,
        color: '#2E2E2E',
    },

    divider: {
        paddingVertical: 8,
    },

    label: {
        fontSize: 16,
        lineHeight: 18,
        color: '#666666',
        marginBottom: 3,
    },

    inputField: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingVertical: 6,
    },

    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },

    button: {
        width: "43%",
    },

    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
