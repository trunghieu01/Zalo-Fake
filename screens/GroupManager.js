import { StatusBar } from 'expo-status-bar';
import { React, useState, useEffect } from 'react';
import { Text, Alert, StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function GroupManager({ navigation, route }) {
    const [shouldShow, setShouldShow] = useState(false)
    const name = route.params.name
    const idGroup = route.params.idGroup
    const [idMember, setIdMember] = useState(route.params.idMember)
    const idAdmin = route.params.idAdmin
    const idCurrent = route.params.idCurrent
    const nameCurrent = route.params.nameCurrent


    useEffect(() => { if (idAdmin === idCurrent) { setShouldShow(true) } else setShouldShow(false) }, [shouldShow])

    fetch(`https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group/${idGroup}`, {
        method: "PUT",
        body: JSON.stringify({ "id_member": idMember }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 30, height: 37 }}>
                <Image style={{ width: 15, height: 27, marginLeft: 20, marginTop: -155 }} source={require("../assets/back-black.png")} />
            </TouchableOpacity>
            <Image style={{ width: 120, height: 120, borderRadius: 30, alignSelf: 'center', marginTop: -50 }} source={require('../assets/empty-avatar.jpg')}></Image>
            <Text style={{ textAlign: 'center', fontSize: 22, marginTop: 10 }}>{name}</Text>
            <TouchableOpacity style={{ height: 40, borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6', marginTop: 90, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }} onPress={() => navigation.navigate('ViewMember', { idMember: idMember, idAdmin: idAdmin, idCurrent: idCurrent, idGroup: idGroup })}>Xem thành viên </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                if (idCurrent === idAdmin)
                    Alert.alert(
                        "Không thể rời nhóm",
                        "Bạn cần phải trao lại quyền Admin trưóc khi rời khỏi nhóm",
                        [
                            {
                                text: "Cancel"
                            },
                            { text: "OK" }
                        ]
                    );
                else {
                    setIdMember(id => id.filter((id) => {
                        return id !== idCurrent
                    }))
                    navigation.navigate('Home', {
                        screen: 'Nhắn tin',
                        params: { id: idCurrent, name: nameCurrent },
                    })
                }
            }} style={{ height: 40, borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6', marginTop: 20, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Rời nhóm</Text>
            </TouchableOpacity>
            {shouldShow ? <TouchableOpacity onPress={() => {
                if (idCurrent === idAdmin) {
                    fetch(`https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group/${idGroup}`, { method: "DELETE" })
                    console.log('a')
                    navigation.navigate('Home', {
                        screen: 'Nhắn tin',
                        params: { id: idCurrent, name: nameCurrent },
                    })
                }
            }} style={{ height: 40, borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6', marginTop: 20, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Xóa nhóm</Text>
            </TouchableOpacity> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});