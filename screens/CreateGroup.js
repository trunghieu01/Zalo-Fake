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

    var [nameGroup, setNameGroup] = useState("");
    var [idMember, setIdMember] = useState([idCurrent])
    var [nameMember, setNameMember] = useState([])
    const [m, setM] = useState([])

    useEffect(() => {
        console.log('hi')
        console.log(idMember)
        console.log(nameMember)
    }, [nameMember])

    const groupUser = {
        "name": nameGroup,
        "id_member": idMember,
        "isGroup": true,
        "id": lastID - 1,
        "idAdmin": idCurrent
    }

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
            <View style={{ height: 150, marginBottom: 20, marginTop: 5, borderWidth: 0.7, borderRadius: 10, width: '95%', alignSelf: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18, color: '#003366' }}>Thành viên nhóm:</Text>
                <FlatList
                    data={m}
                    extraData={m}
                    refreshing={true}
                    renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", borderRadius: 20, backgroundColor: '#F6F6F6' }}>
                            <View style={{ padding: 10, width: 300 }}>
                                <Text style={{ fontSize: 17 }}>{item.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setM(current => current.filter((name) => {
                                    return name.name !== item.name;
                                }),);
                                setM(current => current.filter((id) => {
                                    return id.id !== item.id;
                                }),);
                                setIdMember(current => current.filter((id) => {
                                    return id !== item.id;
                                }))
                                setNameMember(current => current.filter((name) => {
                                    return name !== item.name
                                }))
                            }} style={{ justifyContent: 'center', marginRight: -20 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../assets/remove.png')}></Image>
                            </TouchableOpacity>
                        </View>}
                />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                <TextInput style={{ height: 40, width: 200, marginRight: 15, borderRadius: 5, borderWidth: 0.5 }} placeholder='Nhập tên nhóm' onChangeText={(value) => setNameGroup(value)} value={nameGroup}></TextInput>
                <Button onPress={() => {
                    if (idMember.length > 2)
                        if (nameGroup.length == 0)
                            alert("Chưa nhập tên nhóm")
                        else {
                            fetch(`https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group`, {
                                method: "POST",
                                body: JSON.stringify({
                                    "name": [nameGroup],
                                    "id_member": idMember,
                                    "isGroup": true,
                                    "idAdmin": idCurrent
                                }),
                                headers: { "Content-type": "application/json; charset=UTF-8" }
                            });
                            setIdMember([idCurrent]);
                            setNameMember([]);
                            setM([])
                            setNameGroup("")
                            alert("Thành công!")
                        }
                    else
                        alert("Nhóm phải có từ 3 thành viên trở lên")
                    console.log(groupUser)
                }} color={'green'} title='Tạo nhóm'></Button>
            </View>
            <FlatList
                data={user}
                renderItem={({ item, index }) =>
                    <View style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 30 }} source={require('../assets/empty-avatar.jpg')}></Image>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 17, width: 200 }}>{item.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            let x = 0
                            // if (typeof idMember === 'string')
                                for (let i = 0; i <= idMember.length; i++) {
                                    if (idMember[i] === item.id) {
                                        console.log(item.id)
                                        x = 1
                                    }
                                }
                            if (x == 0) {
                                setIdMember(idMember.concat(item.id));
                                setNameMember(nameMember.concat(item.name));
                                setM(m.concat({ 'id': item.id, name: item.name }))
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