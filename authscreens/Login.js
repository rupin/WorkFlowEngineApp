
    import React, { Component } from "react";  
    import { StyleSheet, View, TextInput, Text, Button } from "react-native";  
    import { useNavigation } from '@react-navigation/native';
    import {styles} from "../styles/styles.js"
    
    import CommonDataManager from "../utilities/CommonDataManager.js"

    import WorkflowNavigator from "../flowScreens/WorkflowNavigator.js"
    

    export default class Login extends Component {          
      constructor(props) {
      //constructor to set default state
      super(props);
      this.props=props
      this.state = {  
        userName: "",  
        userPassword: "",
        loginState:false
       

         }  
      }
     
      userNameTextChange = (inputText) => {  
        this.setState({ userName: inputText }) 

      }  
      
      userPasswordTextChange = (inputText) => {  
        this.setState({ userPassword: inputText })  
      }  
      userLogin = () => {  
        this.getLoginToken()
      }  

    getLoginToken(){
    //POST json 
   
    var dataToSend = {};
    //dataToSend.username=this.state.userName
    //dataToSend.password=this.state.userPassword

    dataToSend.username="rupin"
    dataToSend.password="#3Twinkle3#"

   
    
    //POST request 
    const that = this;
    fetch(global.commonData.getBaseURL()+'/rest-auth/login/', {
      method: "POST",//Request Type 
      body: JSON.stringify(dataToSend),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
     
    }
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        //console.log(responseJson);
        //console.log(responseJson.key)
        //console.log(this);
        if(responseJson.key)
        {
          global.commonData.setToken(responseJson.key)
          //console.log("Setting State")
          //console.log(that.state);
           this.setState({loginState: true});
            

          //navigation.navigate('Details')

        }
        
    })
    //If response is not in json then in error
    .catch((error) => {
      //alert(JSON.stringify(error));
      console.error(error);
    });
  }
      
      render() { 

         

          if(this.state.loginState)
          {
            return <WorkflowNavigator/>
          }
          
          return ( 
          
             <View style={styles.container}>  
             
            <Text style={styles.txtLogin}>Login to Workflow Manager</Text>  
            <TextInput  
              style={styles.textInputStyle}  
              onChangeText={this.userNameTextChange}  
              placeholder="Enter username"  
                
            />  
            <TextInput  
              style={styles.textInputStyle}  
              onChangeText={this.userPasswordTextChange}  
              placeholder="Enter password"  
                
              secureTextEntry={true}  
            />  
            <View style={{ margin: 25 }}>  
              <Button  
                title="Login"  
                color="green"  
                onPress={this.userLogin}  
              />  
            </View>  
          </View> 
          
          
        );  
      }  
    }  
      
    
      
  
