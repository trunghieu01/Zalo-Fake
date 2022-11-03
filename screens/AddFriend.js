import { StatusBar } from 'expo-status-bar';
import { React, useState } from 'react';
import { Text, ImageBackground, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function AddFriend() {
    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
            <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                <TextInput style={{ height: 30, width: 250, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 20 }} placeholder='Tìm kiếm'></TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});