import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Text } from '@rneui/base'
import { Button, Input } from '@rneui/themed'
import { COLORS } from '../../constants'


const Login = ({navigation}) => {
  const handleRegisterNowPress = ()=>{
    navigation.navigate("Register")
  }
  return (
    <View style={{flex:1,justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30}}>
      <Text h2>Login</Text>
      <View style={{width: '100%', alignItems: 'center', paddingVertical:40}}>
      <Input label={"Email"} labelStyle={styles.inputLabel} />
      <Input label={"Password"} labelStyle={styles.inputLabel}/>
      <Button color='primary' title={'Login'} size='lg' containerStyle={{width: 200, borderRadius:5,}}/>
      </View>
      <Text style={{paddingVertical: 10}}>Dont have an account? <Text style={{color: 'blue', fontWeight: 'bold'}} onPress={handleRegisterNowPress}>Register Now</Text></Text>
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
  inputLabel: {
    color:COLORS.black,
  },
})