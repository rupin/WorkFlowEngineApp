
    import React, { Component } from "react";  
    
    import { useNavigation } from '@react-navigation/native';
    
   
    
    import CommonDataManager from "../utilities/CommonDataManager.js"

    import WorkflowNavigator from "../flowScreens/WorkflowNavigator.js"
    import { Container,Header, Form, Picker , Subtitle, Item, Label, Spinner, Content, Title, Input, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
   

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
          
                    <Container style={{justifyContent: 'center',}} >
                       <Header>
               <Left>
               </Left>
                <Body>
                  <Title>Login</Title>
                  
                </Body>
               
          </Header>
                      <Content >
                        <Form>
                        <Card bordered>
                          
                          <CardItem >
                            <Left>
                          <Text>Username</Text>
                          </Left>
                          </CardItem>
                          <CardItem>
                            <Input onChangeText={this.userNameTextChange} />  
                          
                          </CardItem>



                          <CardItem>
                          <Left>
                          <Text>Password</Text>
                          </Left>
                          </CardItem>
                          <CardItem >  
                            <Input  onChangeText={this.userPasswordTextChange} secureTextEntry={true} />
                                                
                       
                        </CardItem>

                        <CardItem >
                           <Button full rounded primary onPress={this.userLogin}><Text>&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;</Text></Button>                      
                       
                        </CardItem>

                    </Card>
                     </Form>
                        

                      </Content>
                    </Container>
          
        );  
      }  
    }  
      
    
      
  
