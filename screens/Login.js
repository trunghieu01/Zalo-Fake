import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useState, useEffect } from 'react';

export default function Login({ navigation }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var [obj, setObj] = useState([]);
  useEffect(() => {
    fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/user")
      .then((res) => res.json())
      .then((data) => {
        setObj(obj = data);
      })
  }, []);

  function getHome() {
    for (let index = 0; index < obj.length; index++) {
    if(obj[index].email == userName && obj[index].password == password){
      navigation.navigate('Home', {
        screen: 'Nhắn tin',
        params: { id: obj[index].id, name: obj[index].name },
      });
      console.log(obj[index].name)
    }
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/login_background.png')} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>Đăng nhập</Text>
        </View>
        <View style={{ flex: 1, borderRadius: 10, backgroundColor: '#E7E9EB' }}>
          <TextInput style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff', marginTop: 30 }} placeholder='Tên đăng nhập' onChangeText={(val) => setUsername(val)}></TextInput>
          <TextInput style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff' }} placeholder='Mật khẩu' onChangeText={(val) => setPassword(val)}></TextInput>
          <Text style={{ textAlign: 'right', marginRight: 10, marginTop: 5 }}>Quên mật khẩu?</Text>
          <View style={{ padding: 10, marginTop: 10 }}>
            <Button title='Đăng nhập' onPress={getHome}></Button>
          </View>
          <View style={{ padding: 10, marginTop: -10 }}>
            <Button title='Đăng ký' onPress={() => navigation.navigate('Register', 5)}></Button>
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={{ flex: 1 }}>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});