
    import React, { Component } from "react";  
    import { View} from "react-native";  
    import { useNavigation } from '@react-navigation/native';
    import {styles} from "../styles/styles.js"
    import { AsyncStorage } from 'react-native';
   import CommonDataManager from "../utilities/CommonDataManager.js"   
   import { Container, Header, Spinner, Content, Title, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
   import { DrawerActions } from '@react-navigation/drawer';


    export default class ViewFlowDetail extends Component {          
      constructor(props) 
      {
      
      super(props);
      this.props=props;
      this.state={
        pendingFlowData:null,
        fetched:false 
      }
           
      }
      componentDidMount()
      {
        //console.log("Component Mounted");
        this.fetchPendingFlows()
        
        
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
          productList.push(<Spinner />)
          //console.log(this.state.fetched)
          if (this.state.fetched)
          {
            //console.log("Here")
            while (productList.length) { productList.pop(); }
            this.state.pendingFlowData.forEach(function (pendingFlow) {

              //productList=[];
            productList.push(

                       
                        
                          <Card>
                          <CardItem header bordered>
                              <Text>{pendingFlow.flow_name}</Text>
                         </CardItem>

                        
                            <CardItem>
                              <Body>
                                <Text>
                                   {pendingFlow.stage.label}
                                </Text>
                              </Body>
                            </CardItem>

                             


                            <CardItem>
                              
                              <Right>
                                <Text note>{pendingFlow.created_at}</Text>
                              </Right>

                            </CardItem>

                          </Card>
                        
                        
                           
               
            );

          })
        }
        
        

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
               {productList} 
             </Content>   
            </Container>         
          
        );  
      }  
    }  
      
    
      
  
