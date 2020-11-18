import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import * as firebase from 'firebase'
import db from '../config.js'
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
    }
    login=async(email,password)=>{
        if(email&&password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate("Transaction")
                }

            }
            catch(err){
                switch(err.code){
                    case "auth/user-not-found":alert("User does not exist");
                    break;
                    case "auth/invalid-email":alert("Invalid email or password");
                    break;
                    
                }
            }
        }
        else{
            alert("Enter email and password");
        }
    }
    render(){
        return(
            <View>
                <TextInput style={styles.inputBox}
                placeholder="abc@example.com"
                keyboardType="email-address"
                onChangeText={(text)=>{
                    this.setState({
                        email:text
                    })
                }}
                >

                </TextInput>
                <TextInput style={styles.inputBox}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                       password:text
                    })
                }}
                >

                </TextInput>
                <TouchableOpacity style={styles.scanButton}
                onPress={()=>{this.login}}>
                
                
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles=StyleSheet.create({
    inputBox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
      },
      scanButton:{
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
      },
      loginText:{
        padding:25,
        fontWeight:'bold',
        fontSize:25
      }
})