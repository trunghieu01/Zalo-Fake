import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Register({ navigation , route}) {
  console.log(route.params)
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/login_background.png')} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ height:300, justifyContent: 'flex-end' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>Đăng ký</Text>
        </View>
        <View style={{ height:340, borderRadius: 10, backgroundColor: '#E7E9EB' }}>
          <TextInput style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff', marginTop: 30 }} placeholder='Tên đăng nhập' onChangeText={(val) => setusername(val)}></TextInput>
          <TextInput style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff' }} placeholder='Tên người dùng' onChangeText={(val) => setusername(val)}></TextInput>
          <TextInput style={{ height: 40, width: 250, margin: 12, borderWidth: 0.1, padding: 10, backgroundColor: '#ffffff' }} placeholder='Mật khẩu' onChangeText={(val) => setpassword(val)}></TextInput>
          <View style={{ margin: 10}}>
            <Button title='Đăng ký' onPress={() => navigation.navigate('Home')}></Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button title='Đăng nhập' onPress={() => navigation.navigate('Login')}></Button>
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