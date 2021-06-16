import React,{useState,useLayoutEffect} from 'react'
import { StatusBar } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input} from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'


const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle:'Back to Login',
    })
  }, [navigation])
  const register =()=>{
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
        photoURL: imageUrl ||
         'https://www.cyphercoders.com/sites/default/files/default_images/default-user-icon-4.jpg',
      })
    })
    .catch((error)=>alert(error.message))
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light'/>
      <Text h3 style={{ marginBottom:50}}>i am register screenaa </Text>

      <View style={styles.inputContainer}>

        <Input placeholder='Full Name'
        autofocus
        type='text'
        value={name}
        onChangeText={(text)=> setName(text)}/>

        <Input placeholder='Eamil'
         type='text' value={email} onChangeText={(text)=> setEmail(text)}/>


        <Input placeholder='Password'
        secureTextEntry
        type='text' value={password}
        onChangeText={(text)=> setPassword(text)}/>


        <Input placeholder='Profile Picture Url (optional)'
         type='text'
         value={imageUrl}
         onChangeText={(text)=> setImageUrl(text)}
         onSubmitEditing={register}/>

      </View>
      <Button raised onPress={register} title='Register'/>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:'white',
  },
  button:{
    width:200,
    marginTop:10,
  },
  inputContainer:{
    width:300,
  }

})
