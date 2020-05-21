
    import React, { Component } from "react";  
    import { StyleSheet, View, TextInput, Text, Button } from "react-native";  
    import { useNavigation } from '@react-navigation/native';
    import {styles} from "../styles/styles.js"
    import { AsyncStorage } from 'react-native';
   import CommonDataManager from "../utilities/CommonDataManager.js"   

    export default class ViewPendingFlows extends React.Component {          
      constructor(props) 
      {
      
      super(props);
      
      this.state={
        pendingFlowData:null,
        fetched:false 
      }
           
      }
      componentDidMount()
      {
        console.log("Component Mounted");
        this.fetchPendingFlows()
        this.setState()
        
      }
     
       
      
     
     

    fetchPendingFlows=()=>{
    //POST json 
    //console.log(global.commonData.getHeaders())
    var dataToSend = {};
    //dataToSend.username=this.state.userName
    //dataToSend.password=this.state.userPassword

    
    
    //POST request 
    fetch(global.commonData.getBaseURL()+'/getPendingFlows/', {
      method: "GET",//Request Type       
      headers: global.commonData.getHeaders(),
     
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        //console.log(responseJson);
        this.setState((state) => {
             return {pendingFlowData: responseJson, fetched:true};
        });
        
        
        
        
    })
    //If response is not in json then in error
    .catch((error) => {
      //alert(JSON.stringify(error));
      console.error(error);
    });
  }
      
      render() { 
        
         var productList = [];
         //productList.push()
          //console.log(this.state.fetched)
          if (this.state.fetched)
          {
            //console.log("Here")
            this.state.pendingFlowData.forEach(function (pendingFlow) {
            productList.push(

                     <Text>{pendingFlow.flow_name}</Text>   
                           
               
            );

          })
        }
        
        

        return (  
          <View style={styles.listcontainer}> 
          <Text style={styles.txtLogin}>View Pending Flows</Text>              
               {productList}          
          </View>  
        );  
      }  
    }  
      
    
      
  
