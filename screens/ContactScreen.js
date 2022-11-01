import { StatusBar } from 'expo-status-bar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Image, StyleSheet, Text, View, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
import ContactGroupScreen from './ContactGroupScreen';
import ContactPersonScreen from './ContactPersonScreen';

const Tab = createMaterialTopTabNavigator();

const SCREEN_WIDTH = Dimensions.get('screen').width;
export default function ContactScreen({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cá nhân" component={ContactPersonScreen} />
      <Tab.Screen name="Nhóm" component={ContactGroupScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});