import { StatusBar } from 'expo-status-bar';
import { React, useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function AddFriend({ navigation, route }) {
    const image = require('../assets/empty-avatar.jpg')

    const nameCurrent = route.params.nameCurrent
    const idCurrent = route.params.idCurrent
    var [group, setGroup] = useState([]);
    var [user, setUser] = useState([]);
    useEffect(() => {
        fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/user")
            .then((res) => res.json())
            .then((data) => {
                setUser(user = data);
            })
    }, []);


    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
            <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 23, height: 15, marginLeft: 20 }} source={require("../assets/back-icon.png")} />
                </TouchableOpacity>
                <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                <TextInput style={{ height: 30, width: 250, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 20 }} placeholder='Tìm kiếm'></TextInput>
            </View>
            <FlatList
                data={user}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: item.name, id: item.id, idCurrent: idCurrent })} style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 30 }} source={image}></Image>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 17 }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});