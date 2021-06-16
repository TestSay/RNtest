import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input, Image} from 'react-native-elements'
import {KeyboardAvoidingView} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import { auth } from '../firebase'

 const LoginScreen = ({navigation})=> {
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')

    useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          navigation.replace('Home')
        }
      })
     return unsubscribe
    }, [])
   const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error)=>alert(error))
   }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='light' />
      <Image source={{
        uri:"https://swizzonic.ch/wp-content/uploads/2019/11/MAIL-560x560.png",
      }}
      style={{ width:200, height:200}}/>
      <View style={styles.inputContainer}>
        <Input placeholder='Email' autoFocus type="Email" value={email} onChangeText={(text)=>setEmail(text)}/>
        <Input placeholder='password'secureTextEntry  type="password" value={password} onChangeText={(text)=>setPassword(text)}/>

      </View>
      <Button containerStyle={styles.button} onPress={signIn} title='Login' />
      <Button onPress={()=> navigation.navigate('Register')}containerStyle={styles.button} type='outline' title='Register' />


    </KeyboardAvoidingView>
  )
}
export default LoginScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding:10,
  },
  inputContainer: {
    width:300,
  },
  button: { width:200,
  marginTop: 10},
})
