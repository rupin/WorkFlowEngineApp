
    import React, { Component } from "react";  
    import { View} from "react-native";  
    import { useNavigation } from '@react-navigation/native';
    
   import CommonDataManager from "../utilities/CommonDataManager.js"   
   import { Container,  ListItem, Header, Spinner, Content, Title, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
   

   import {ViewFlowDetail} from "../flowScreens/ViewFlowDetail.js"
  

   export default class ViewPendingFlowsList extends Component {          
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

      viewFlowDetail=(flow_id)=>{
        //console.log (flow_id)
        this.props.navigation.navigate('Flow Information');
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
          productList.push(<Spinner/>)
          //console.log(this.state.fetched)
          if (this.state.fetched)
          {
            //console.log("Here")
            while (productList.length) { productList.pop(); }
            const that=this;
            this.state.pendingFlowData.forEach(function (pendingFlow) {

              
            productList.push(

                       
                        
              <ListItem key={pendingFlow.id} avatar button 

               onPress={()=>that.props.navigation.navigate('Flow Information',{id:pendingFlow.id, flow_name: pendingFlow.flow_name})} >
              
             
              <Body>
                <Text>{pendingFlow.flow_name}</Text>
                <Text note>{pendingFlow.stage.label}</Text>
              </Body>
              <Right>
              <Button transparent onPress={()=>that.props.navigation.navigate('Flow Information', {id:pendingFlow.id})} >
                   <Icon name="arrow-forward" />
              </Button>
              </Right>
            </ListItem>
                        
                        
                           
               
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
                  <Title>Pending Flows List</Title>
                </Body>
               
          </Header>
             <Content>
             
               {productList} 
             </Content>   
          </Container>         
          
        );  
      }  
    }  
      
    
      
  
