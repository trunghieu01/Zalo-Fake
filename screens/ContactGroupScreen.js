import { StatusBar } from 'expo-status-bar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Image, StyleSheet, Text, View, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function ContactGroupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});