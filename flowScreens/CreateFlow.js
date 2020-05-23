
    import React, { Component } from "react";  
   
    import { useNavigation } from '@react-navigation/native';
    import {styles} from "../styles/styles.js"
    import { AsyncStorage } from 'react-native';
    import CommonDataManager from "../utilities/CommonDataManager.js"  
    import { Container, Header, Input, Spinner, Content, Title, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
    import { DrawerActions } from '@react-navigation/drawer'; 

    export default class CreateFlow extends Component {          
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
        this.props.navigation.navigate()
        
        
    })
    //If response is not in json then in error
    .catch((error) => {
      //alert(JSON.stringify(error));
      console.error(error);
    });
  }
      
      render() { 

        return (  
           

          <Container>
           <Header>
                <Left>
            <Button transparent
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
                <Body>
                  <Title>Pending Flows</Title>
                </Body>
               
          </Header>
             <Content>

             <Text >Create a New Flow</Text> 
             <Input  
             
              onChangeText={this.flowNameTextChange}  
              placeholder="Project Name"  
                
            />  
            <Button  
                title="Create"  
                color="green"  
                onPress={this.createNewFlow}  
              />  
              
             </Content>   
            </Container>     
        );  
      }  
    }  
      
    
      
  
