import * as React from 'react';
import {Text,View,TouchableOpacity,TextInput,StyleSheet,KeyboardAvoidingView,ToastAndroid,Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';
import * as firebase from 'firebase';
import db from '../config';
import writeScreen from './writeScreen';
export default class readScreen extends React.Component{
    constructor(){
        super();
        this.state={
        search: '',
        }   
    }
    handleSearch=async()=>{
        var storyType=await this.checkStoryEligibility();
        if(!storyType){
            Alert.alert("The story doesn't exist")
         this.setState({
                search: ''
            })
        }
        else if(storyType==="Found"){
            this.initiateBookIssue();
            Alert.alert("Here are the following stories.")
        }
    }
    checkStoryEligibility=async()=>{
        
        const StoryRef= await db.collection("Stories").where("author","==",this.state.search).get()
        var storyType=""
        if(StoryRef.docs.length===0){
          storyType="AllBooks"  
        }
        else{
            StoryRef.docs.map((doc)=>{
                var story=doc.data()
                
                    storyType="A book"

               
            })
        }
    }
    
    render(){
    const {search}=this.state;
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <SearchBar
                placeholder="Type here..."
                onChangeText={search => {
                    this.handleSearch();
                    this.setState({ search: search });
                  }}
                  
                  value={this.state.search}
                  />
                  
              </View>
        )
            }
        
//    StoryAvailability               
        
    }
 