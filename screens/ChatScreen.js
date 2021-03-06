import React, { useLayoutEffect,useState } from 'react'
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import {Platform} from 'react-native'
import { auth, db } from '../firebase';
import  firebase from 'firebase'
const ChatScreen = ({navigation, route}) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] =useState([])
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign:'left',
      headerTitle:()=>(
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
        }}
        
        >
          <Avatar rounded source={{
            uri:
            'https://www.cyphercoders.com/sites/default/files/default_images/default-user-icon-4.jpg'

          }}/>          
          <Text style={{color:'white',marginLeft:10, fontWeight:'700'}}
          >{route.params.chatName}</Text>
        </View>
      ),
    headerLeft: ()=>(
      <TouchableOpacity
      style={{marginLeft:10}}
      onPress={navigation.goBack}>
        <AntDesign name='arrowleft' size={24} color='white' />
      </TouchableOpacity>

    ),
       headerRight: ()=>(
         <View
         style={{
           flexDirection:'row',
           justifyContent:'space-between',
           width: 80,
           marginRight: 20,
         }}>
      <TouchableOpacity>
         <FontAwesome name='video-camera' size={24} color='white' />
      </TouchableOpacity>
       <TouchableOpacity>
         <FontAwesome name='heart' size={24} color='white' />
      </TouchableOpacity>
    </View>
    )

    })
  },[navigation])

  const sendMessage =()=> {
    Keyboard.dismiss()

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      diplayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
    setInput('')
  }

  useLayoutEffect(() => {
    const unsubscribe = 
    db.collection('chats')
    .doc(route.params.id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot=> setMessages(
      snapshot.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }))
    ))
    return unsubscribe
  }, [route])
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <StatusBar style='light' />
      <Text>{route.params.chatName}</Text>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      style={styles.container}
      keyboardVerticalOffset={90}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
        <ScrollView>
          {messages.map(({id, data})=>(
              data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar />
                    <Text style={styles.recieverText}>
                      {data.message}
                    </Text>
                  </View>
              ):(
                <View style={styles.sender}>
                         <Avatar />
                    <Text style={styles.senderText}>
                      {data.message}
                    </Text>
                </View>
              )
          ))}

        </ScrollView>
        <View style={styles.footer}>
          <TextInput value={input} 
          onSubmitEditing={sendMessage}
          onChangeText={(text)=>setInput(text)}
          placeholder='chat' 
          style={styles.textInput}
          />
          <TouchableOpacity
          onPress={sendMessage}
          activeOpacity={0.5}
          >
            <Ionicons name="send" size={24} color="#2B68E6" />

          </TouchableOpacity>
        </View>
        </>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  reciever:{
    padding:15,
    backgroundColor:'#ECECEC',
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:'80%',
    position:'relative',
  },
  recieverText:{  },
  senderText:{ },
  footer:{
    flexDirection: 'row',
    alignItems:'center',
    width:'100%',
    padding:15,
  },
  textInput:{
    bottom:0,
    height:40,
    flex:1,
    marginRight:15,
    bordercolor:'transparent',
    backgroundColor:'#ECECEC',
    // borderWidth: 1,
    padding: 10,
    color:'gray',
    borderRadius:30,
  },



})
