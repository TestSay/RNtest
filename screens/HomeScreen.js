import React, { useEffect, useLayoutEffect,useState } from 'react'
import { SafeAreaView, TouchableOpacity,View } from 'react-native'
import { ScrollView, StyleSheet, Text } from 'react-native'
import CustomListItem from './CustomListItem'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import {auth,db} from '../firebase'
import { Avatar } from 'react-native-elements'
const HomeScreen = ({navigation}) => {
  const [chats, setChat] = useState([])
  const signOutUser = () =>{
    auth.signOut().then(()=>{
      navigation.replace('Login')
    })
  }

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot=>{
      setChat(snapshot.docs.map(doc=>({
        id: doc.id,
        data: doc.data(),
      })))
    })
    return unsubscribe
  }, [])
  useLayoutEffect(() => {
      navigation.setOptions({
        title:'Drawing',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'black'},
        headerTintColor:'black',
        headerLeft: () => (
        <View style={{marginLeft:20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} >
          <Avatar rounded source={{uri: auth?.currentUser?.photoURL }}/>
         </TouchableOpacity>
        </View>),
        headerRight: () => (
        <View style={{
          flexDirection:'row',
          justifyContent: 'space-between',
          width:80,
          marginRight:20,
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color='black'/>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> navigation.navigate('AddChat')}
          activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' size={24} color='black'/>
          </TouchableOpacity>
        </View>), 
      })
      }, [navigation])

    const enterChat = (id, chatName) => {
      navigation.navigate('Chat',{
        id,
        chatName
      })
    }



  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id,data:{chatName}})=>(
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>

        ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    height:'100%',
  }
})
