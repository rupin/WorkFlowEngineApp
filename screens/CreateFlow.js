
    import React, { Component } from "react";  
    import { StyleSheet, View, TextInput, Text, Button } from "react-native";  
    import { useNavigation } from '@react-navigation/native';
    import {styles} from "../styles/styles.js"
    import { AsyncStorage } from 'react-native';
    import CommonDataManager from "../utilities/CommonDataManager.js"   

    export default class CreateFlow extends React.Component {          
      constructor(props) {
      //constructor to set default state
      super(props);
      this.props=props
      console.log(global.commonData.getToken())
      this.state = {  
       flowName:"",
       parentFlow:null,
       restricted:false,
       flow_type:null
       

         }  
      }
     
      flowNameTextChange = (inputText) => {  
        this.setState({ flowName: inputText }) 

      }  
      
     
     

    createNewFlow=()=>{
    //POST json 
    console.log(global.commonData.getHeaders())
    var dataToSend = {};
    //dataToSend.username=this.state.userName
    //dataToSend.password=this.state.userPassword

    dataToSend["flow_name"]=this.state.flowName
    dataToSend["restricted"]=this.state.restricted
    dataToSend["flow_type"]=this.state.flow_type
    dataToSend["parent_flow"]=this.state.parentFlow
    
    
    //POST request 
    fetch(global.commonData.getBaseURL()+'/createFlow/', {
      method: "POST",//Request Type 
      body: JSON.stringify(dataToSend),
      headers: global.commonData.getHeaders(),
     
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        //console.log(responseJson);
        
        
        
    })
    //If response is not in json then in error
    .catch((error) => {
      //alert(JSON.stringify(error));
      console.error(error);
    });
  }
      
      render() { 

        return (  
          <View style={styles.container}>  
            <Text style={styles.txtLogin}>Create a New Flow</Text>  
            
            <TextInput  
              style={styles.textInputStyle}  
              onChangeText={this.flowNameTextChange}  
              placeholder="Project Name"  
                
            />  
            
            <View style={{ margin: 25 }}>  
              <Button  
                title="Create"  
                color="green"  
                onPress={this.createNewFlow}  
              />  
            </View>  
          </View>  
        );  
      }  
    }  
      
    
      
  
