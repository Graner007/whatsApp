import { FontAwesome, FontAwesome5, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ChatScreen from '../screens/ChatScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, MainTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle: { 
        backgroundColor: Colors.light.tint,
        shadowOpacity: 0,
        elevation: 0
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <Stack.Screen name="Root" component={MainTabNavigator} options={{ 
        title: 'WhatsApp',
        headerRight: () => (
          <View style={{ 
              flexDirection: 'row',
              width: 60,
              justifyContent: 'space-between',
              marginRight: 10
            }}>
              <Octicons name='search' size={22} color='white' />
              <MaterialCommunityIcons name='dots-vertical' size={22} color='white' />
          </View>
        )
      }}/>
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={({ route }) => ({ 
          title: route.params.name,
          headerRight: () => {
            <View style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-between',
              marginRight: 10,
            }}>
              <FontAwesome5 name="video" size={22} color={'white'} />
              <MaterialIcons name="call" size={22} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
            </View>
          }
        })} 
      />
      <Stack.Screen 
        name="Contacts" 
        component={ContactsScreen} 
        options={{ title: 'Contacts' }} 
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        style: {
          backgroundColor: Colors[colorScheme].tint
        },
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 4
        },
        labelStyle: {
          fontWeight: 'bold'
        },
        showIcon: true
      }}>
      <MainTab.Screen
        name="Camera"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => <Fontisto size={18} name="camera" color={color} />,
          tabBarLabel: () => null
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatScreen}
      />
      <MainTab.Screen
        name="Status"
        component={TabTwoScreen}
      />
      <MainTab.Screen
        name="Calls"
        component={TabTwoScreen}
      />
    </MainTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
