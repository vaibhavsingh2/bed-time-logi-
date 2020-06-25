import * as React from 'react';
import {Text,View,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component{
constructor(){
    super();
    this.state={
        emailId: '',
        password: ''
    }
}

Login=async(email,password)=>{
   
    if(email && password){
        try{

            const response=await firebase.auth().signInWithEmailAndPassword(email,password)
            console.log("Correct id")

            if(response){
                this.props.navigation.navigate('Read')
            }
        }
        catch(error){
            switch(error.code){
                case 'auth/user-not-found':
                Alert.alert("User does not exist")
                console.log("User does not exist.")
                break;
                case 'auth/invalid-email':
                Alert.alert("incorrect email or password")
                console.log("Invalid id")
            }
        }
    }
    else{
        Alert.alert("Enter email and password");
    }
}

render(){
        return(
           <KeyboardAvoidingView style={{alignItems: 'center', marginTop:20}}>
               <View>
                   <Text style={{textAlign: 'center', fontSize: 30}}> Login  </Text>
               </View>
               <View>
                   <TextInput
                   style={styles.loginBox}
                   placeholder="abc@example.com"
                   keyboardType='email-address'
                   onChangeText={(text)=>{
                    this.setState({
                        emailId: text
                    })
                   }}
                   />
                   <TextInput
                   style={styles.loginBox}
                   secureTextEntry={true}
                   placeholder="enter Password"
                   onChangeText={(text)=>{
                    this.setState({
                        password: text
                    })
                   }}
                   />
               </View>
               <View>
                   <TouchableOpacity style={{height: 40, width: 90,backgroundColor:'green',borderWidth: 1.5, marginTop: 20,paddingTop: 5,borderRadius: 10}}
                   onPress={()=>{this.Login(this.state.emailId ,this.state.password)}}>

                        
                        <Text style={{ textAlign: 'center'}}> Login </Text>
                        </TouchableOpacity>
               </View>
           </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    loginBox:{
        width:300,
        height: 50,
        borderWidth: 1.5,

        fontSize: 20,
        margin: 20,
        paddingLeft: 20
    }
});