import React,{useState,useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input} from 'react-native-elements'
import { db } from '../firebase'
import Icon from 'react-native-vector-icons/FontAwesome'
const AddChatScreen = ({navigation}) => {
  const [input, setInput] = useState('')


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'add a new chat',
      headerBackTitle:'chats',
    })
  }, [navigation])

  const createChat = async () => {
    await db.collection('chats').add({
      chatName: input
    }).then(()=>{
      navigation.goBack()
    }).catch((error)=> alert(error))
  }
  return (
    <View style={styles.container}>
      <Input
      placeholder='Enter a chat name'
      value={input}
      onChangeText={(text)=> setInput(text)}
      onSubmitEditing={createChat}
      leftIcon={
        <Icon />
      }
      />
      <Button onPress={createChat} title='Create new Chat'/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container:{

  }

})
