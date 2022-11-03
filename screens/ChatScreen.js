import { Image, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useRef, useEffect } from 'react'
import { Menu, MenuItem } from 'react-native-material-menu';
import { useRoute } from '@react-navigation/native';
// import Realm from 'realm';

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function ChatScreen({ navigation }) {
  const route = useRoute();
  var [name, setName] = useState("name")
  useEffect(() => {
    if (route.params != null)
      setName(route.params.name[0])
  }, [])
  const user = useRef(route.params.idCurrent)
  console.log(user.current)
  const [messages, setMessages] = useState([])
  const obj = []
  const [lastID, setLastID] = useState("")
  const [text, setText] = useState('');
  useEffect(() => {
    fetch("https://633f923ee44b83bc73bc8cc7.mockapi.io/api/message")
      .then((res) => { return res.json() })
      .then((data) => {
        for (let index = 0; index < data.length; index++) {
          if (route.params.id == data[index].id_group) {
            obj.push(data[index])
          }
        }
        const count = data.length
        setLastID(data[count])
        setMessages(obj)
        console.log(count)
      })
  }, [text])

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const millis = new Date();
  // console.log(millis.getHours() + ":" + millis.getMinutes());
  
  const scrollView = useRef();

  const Message = ({ time, isLeft, title, id, image }) => {
    const isOnLeft = (type) => {
      if (isLeft && type === "messageContainer") {
        return {
          alignSelf: "flex-start",
          backgroundColor: "#f0f0f0",
          borderTopLeftRadius: 0,
        };
      } else if (isLeft && type === "message") {
        return {
          color: "#000000",
        };
      } else if (isLeft && type === "time") {
        return {
          color: "darkgray",
        };
      } else {
        return {
          borderTopRightRadius: 0,
        };
      }
    };
    return (
      <View style={[]}>
        <View style={[styles.messageContainer, isOnLeft("messageContainer"),]}>
          <View style={styles.messageView}>
            <Text style={[styles.message, isOnLeft("message")]}>{title}</Text>
          </View>
          <View style={styles.timeView}>
            <Image source={{ uri: image }} style={{ resizeMode: 'contain', minWidth: 20 }} />
            {/* <Text >{id}</Text> */}
            <View style={styles.menu}>
              <Menu
                visible={visible}
                anchor={<TouchableOpacity onPress={() => setVisible(true)}><Image style={{ width: 22, height: 22 }} source={require("../assets/more.png")} /></TouchableOpacity>}
                onRequestClose={hideMenu}
              >
                <MenuItem onPress={hideMenu}><Image style={{ width: 18, height: 18 }} source={require("../assets/delete.png")} />   Xóa</MenuItem>
                <MenuItem onPress={() => {
                  messages[id].content = 'Đã thu hồi';
                  console.log(id)
                  setVisible(false);
                }}><Image style={{ width: 20, height: 20 }} source={require("../assets/undo.png")} />  Thu hồi</MenuItem>
              </Menu>
            </View>
            <Text style={[styles.time, isOnLeft("time")]}>{time}</Text>
          </View>
        </View>
      </View>
    )
  };


  const send = () => {
    if (text != '') {
      // const last_element = messages[messages.length - 1].id;
      // setMessages(messages.concat({
      //   id_sender: user.current,
      //   id: last_element + 1,
      //   id_group: route.params.id,
      //   content: text,
      //   time: millis.getHours() + ":" + millis.getMinutes()
      // }));
      fetch(`https://633f923ee44b83bc73bc8cc7.mockapi.io/api/message`, {
        method: "POST",
        body: JSON.stringify({
          id: lastID,
          id_sender: user.current,
          id_group: route.params.id,
          content: text,
          time: millis.getHours() + ":" + millis.getMinutes(),
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      setText('');
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 37, backgroundColor: '#3643ff', width: SCREEN_WIDTH }}></View>
      <View style={{ width: SCREEN_WIDTH, height: 50, backgroundColor: '#3989ff', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 23, height: 15, marginLeft: 20 }} source={require("../assets/back-icon.png")} />
        </TouchableOpacity>
        <Image style={{ width: 40, height: 40, borderRadius: 30, marginLeft: 5 }} source={require('../assets/empty-avatar.jpg')}></Image>
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>{name}</Text>
          <Text style={{ fontSize: 12, fontWeight: '350', color: 'white', marginLeft: 3 }}>Truy cập 5 phút trước</Text>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}
        ref={ref => scrollView.current = ref}
        onContentChange={() => { scrollView.current.scrollToEnd({ animated: true }) }}>
        {messages.map((message, index) => (
          <Message
            key={index}
            time={message.time}
            isLeft={message.id_sender != user.current}
            title={message.content}
            id={index}
            image={message.file}
          />
        ))}
      </ScrollView>
      <View style={{ width: SCREEN_WIDTH, height: 45, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: '#f0f0f0', borderRadius: 10 }}>
        <Image style={{ width: 28, height: 28, marginLeft: 10 }} source={require("../assets/sticker-icon.png")} />
        <TextInput style={{ width: 230 }} placeholder='Tin nhắn ' value={text} onChangeText={(text) => setText(text)}></TextInput>
        <TouchableOpacity>
          <Image style={{ width: 28, height: 28, marginLeft: 5 }} source={require("../assets/more.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={{ width: 28, height: 28, marginLeft: 5 }} source={require("../assets/galery.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={send}>
          <Image style={{ width: 40, height: 40, marginLeft: 10 }} source={require("../assets/send.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  messageContainer: {
    backgroundColor: '#99ccff',
    maxWidth: "80%",
    alignSelf: "flex-end",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginTop: 10
  },
  messageView: {
    backgroundColor: "transparent",
    maxWidth: "80%",
    flexDirection:'column'
  },
  timeView: {
    flexDirection: 'row',
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  message: {
    color: "black",
    alignSelf: "flex-start",
    fontSize: 15,
  },
  time: {
    color: "black",
    alignSelf: "flex-end",
    fontSize: 10,
  },
  menu: {
    marginRight: 10,
    alignSelf: "flex-end",
    marginBottom: -5
  }
});