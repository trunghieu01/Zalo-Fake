import { StatusBar } from 'expo-status-bar';
import { React, useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function CreateGroup({ navigation, route }) {
    const nameCurrent = route.params.nameCurrent
    const idCurrent = route.params.idCurrent
    const array = []
    const [lastID, setLastID] = useState("0")
    var [user, setUser] = useState([]);
    useEffect(() => {
        fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/user")
            .then((res) => res.json())
            .then((data) => {
                for (let index = 0; index < data.length; index++) {
                    if (data[index].name !== nameCurrent) {
                        array.push(data[index])
                    }
                }
                setLastID(data.length)
                setUser(array);
            })
    }, []);

    const [nameGroup, setNameGroup] = useState("No Name");
    const idMember = []
    const nameMember = []
    const groupUser = {
        "name": [nameGroup],
        "id_member": idMember,
        "isGroup": true,
        "id": lastID,
        "idAdmin": idCurrent
    }

    return (
        <View style={styles.container}>
            <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
            <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require("../assets/search.png")} />
                <TextInput style={{ height: 30, width: 250, borderWidth: 0.1, backgroundColor: '#3989ff', marginLeft: 20 }} placeholder='Tìm kiếm'></TextInput>
            </View>
            <View style={{ height: 150, marginBottom: 20, borderWidth: 0.7, borderRadius: 10, width: '95%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18, color: '#003366' }}>Thành viên nhóm:</Text>
                <FlatList
                    data={nameMember}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", borderRadius: 20, backgroundColor: '#F6F6F6' }}>
                            <View style={{ padding: 10, width: 300 }}>
                                <Text style={{ fontSize: 17 }}>{item}</Text>
                            </View>
                            <TouchableOpacity onPress={{}} style={{ justifyContent: 'center', marginRight: -20 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../assets/remove.png')}></Image>
                            </TouchableOpacity>
                        </View>}
                />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                <TextInput style={{ height: 40, width: 200, marginRight: 15, borderRadius: 5, borderWidth: 0.5 }} placeholder='Nhập tên nhóm'></TextInput>
                <Button color={'green'} title='Tạo nhóm'></Button>
            </View>
            <FlatList
                data={user}
                renderItem={({ item }) =>
                    <View style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 30 }} source={require('../assets/empty-avatar.jpg')}></Image>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 17, width: 200 }}>{item.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                                for (let i = 0; i <= idMember.length; i++) {
                                    if (idMember[i] !== item.id) {
                                        idMember.push(item.id)
                                        nameMember.push(item.name)
                                        console.log(nameMember)
                                    }
                            }
                        }} style={{ justifyContent: 'center', marginRight: -20 }}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('../assets/add.png')}></Image>
                        </TouchableOpacity>
                    </View>}
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