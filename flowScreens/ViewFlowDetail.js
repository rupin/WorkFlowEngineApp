
    import React, { Component } from "react";  
    import { View} from "react-native";  
    import { useNavigation } from '@react-navigation/native';
    import {styles} from "../styles/styles.js"
    import { AsyncStorage } from 'react-native';
   import CommonDataManager from "../utilities/CommonDataManager.js"   
   import { Container, Header, Form, Picker , Subtitle, Item, Label, Spinner, Content, Title, Input, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
   import { DrawerActions } from '@react-navigation/drawer';
    

    export default class ViewFlowDetail extends Component {          
      constructor(props) 
      {
      
      super(props);
      this.props=props;
      this.flow_id=props.route.params.id
      this.flow_name=props.route.params.flow_name
      this.transitionID="";
      this.state={
        stageFields:null,
        fetched:false
        
      }
           
      }
      componentDidMount()
      {
        //console.log("Component Mounted");
        this.fetchNextTransition()
        
        
      }

    fetchStageFields=()=>{

        //POST json 
    //console.log(global.commonData.getHeaders())
    var dataToSend = {};
    //dataToSend.username=this.state.userName
    //dataToSend.password=this.state.userPassword

    
    
    //POST request 

    fetch(global.commonData.getBaseURL()+'/FormFieldsByStage/'+this.transitionID, {
      method: "GET",//Request Type       
      headers: global.commonData.getHeaders(),
     
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        this.setState({stageFields:responseJson, fetched:true})
       // console.log(this.state)
        
        
        
        
    })
    //If response is not in json then in error
    .catch((error) => {
      //alert(JSON.stringify(error));
      console.error(error);
    });

      }
     
       
      
     
     

    fetchNextTransition=()=>{
    //POST json 
    //console.log(global.commonData.getHeaders())
    var dataToSend = {};
    //dataToSend.username=this.state.userName
    //dataToSend.password=this.state.userPassword

    
    
    //POST request 

    fetch(global.commonData.getBaseURL()+'/getTransition/'+this.flow_id, {
      method: "GET",//Request Type       
      headers: global.commonData.getHeaders(),
     
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        this.transitionID=responseJson[0].transition.source_state.id
        //alert(this.transitionID)
        this.fetchStageFields()
       
        
        
        
        
    })
    //If response is not in json then in error
    .catch((error) => {
      //alert(JSON.stringify(error));
      console.error(error);
    });
  }
      
      render() { 
        
         var fieldList = [];
          fieldList.push(<Spinner />)
          console.log(this.state.fetched)
          if (this.state.fetched)
          {
            //console.log("Here")
            while (fieldList.length) { fieldList.pop(); }
            this.state.stageFields.forEach(function (fieldDetail) {
              //console.log(fieldDetail.field.field_type)
              if(fieldDetail.field.field_type=='TEXT')
              {
                fieldList.push(

                                  
                                  <Item stackedLabel>
                                     <Label>{fieldDetail.field.label}</Label>
                                      <Input />
                                  </Item>
           
                              )
              }

              if(fieldDetail.field.field_type=='MULTICHOICE')
              {
                var dropdownOptions=fieldDetail.field.multichoice_options.split(",")

                var optionChoicesList=[]

                for (var index=0;index<dropdownOptions.length;index++)
                {
                  optionChoicesList.push(<Picker.Item label={dropdownOptions[index]} value={dropdownOptions[index]} />)
                }

                fieldList.push(

                                
                                  <Item picker>
                                  <Label>{fieldDetail.field.label}</Label>
                                    <Picker mode="dropdown">

                                     
                                      {optionChoicesList}
                                    </Picker>
                                </Item>
           
                              )
              }

              

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
                  <Title>{this.flow_name}</Title>
                  <Subtitle>Subtitle</Subtitle>
                </Body>
               
          </Header>
             <Content>
             <Form>
               {fieldList} 
             </Form>   
             </Content>   
            </Container>         
          
        );  
      }  
    }  
      
    
      
  
