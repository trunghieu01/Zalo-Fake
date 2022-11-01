import { Image, StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function HomeScreen({ navigation, route }) {
  var [idCurrent, setIdCurrent] = useState("0")
  useEffect(() => {
    if (route.params != null)
      setIdCurrent(route.params.id)
  },[]);
  console.log('idCurrent: '+ idCurrent)

  var [obj, setObj] = useState([]);
  useEffect(() => {
    fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/group")
      .then((res) => res.json())
      .then((data) => {
        setObj(data);
      })
  }, []);
  // console.log(obj)
  const image = require('../assets/empty-avatar.jpg')

  return (
    <View style={styles.container}>
      <FlatList
        data={obj}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: item.name, id:item.id ,idCurrent: idCurrent})} style={{ height: 75, flexDirection: 'row', borderWidth: 1, borderColor: "#C4C4C4", backgroundColor: '#F6F6F6' }}>
            <Image style={{ width: 70, height: 70, borderRadius:30}} source={image}></Image>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 17 }}>{item.name[1]}</Text>
              <Text>{item.shop}</Text>
            </View>
          </TouchableOpacity>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});