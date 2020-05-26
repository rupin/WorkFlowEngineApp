
    import React, { Component } from "react";  
    import { View} from "react-native";  
    import { useNavigation } from '@react-navigation/native';
    import {styles} from "../styles/styles.js"
    import { AsyncStorage } from 'react-native';
   import CommonDataManager from "../utilities/CommonDataManager.js"   
   import { Container, List, Radio, Header, Form, Picker , Subtitle, Item, ListItem, Label, Spinner, Content, Title, Input, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
   import { DrawerActions } from '@react-navigation/drawer';
    

    export default class ViewFlowDetail extends Component {          
      constructor(props) 
      {
      
      super(props);
      this.props=props;
      this.flow_id=props.route.params.id
      this.flow_name=props.route.params.flow_name
      this.transitionID="";
      this.stageName=""
      this.state={
        stageFields:null,
        transitions:null,
        fetched:false,
        //stageName:""
        
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
       //Todo manage multiple transitions
        this.transitionID=responseJson[0].transition.source_state.id
        this.stageName=responseJson[0].transition.source_state.label
        //alert(this.transitionID)
        this.setState({transitions:responseJson, fetched:false})
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
         var actionList=[]
          fieldList.push(<Spinner />)
         // console.log(this.state.fetched)
          if (this.state.fetched)
          {
            //console.log("Here")
            while (fieldList.length) { fieldList.pop(); }
            this.state.stageFields.forEach(function (fieldDetail) {
              //console.log(fieldDetail.field.field_type)
              if(fieldDetail.field.field_type=='TEXT')
              {
              

                    fieldList.push(
                      <Card>
                        <CardItem header>
                            <Text>{fieldDetail.field.label}</ Text>
                        </ CardItem>
                        <CardItem>

                            <Item>                                 
                                      <Input ></ Input>
                                  </ Item>
                        </ CardItem>
                    </ Card>)
              }

              if(fieldDetail.field.field_type=='MULTICHOICE')
              {
                var dropdownOptions=fieldDetail.field.multichoice_options.split(",")

                var optionChoicesList=[]

                for (var index=0;index<dropdownOptions.length;index++)
                {
                  
                   optionChoicesList.push(<Picker.Item label={dropdownOptions[index]} value={dropdownOptions[index]} />)
                }
                 //console.log(optionChoicesList) 
                           fieldList.push(

                                
                                 <Card>
                                  <CardItem header>
                                      <Text>{fieldDetail.field.label}</ Text>
                                  </ CardItem>
                                  <CardItem>
                                    
                                     <Item>                                 
                                        <Picker mode="dropdown">
                
                                          {optionChoicesList}
                                        </ Picker>
                                    </ Item>
                        </ CardItem>
                    </ Card>
           
                              )
              }

              

          })
          var stageNames=[]
          while (actionList.length) { actionList.pop(); }
          this.state.transitions.forEach(function (transitionObject) {

            //console.log(transitionObject.transition.destination_state)             

                  destinationStageName=transitionObject.transition.destination_state.label
                  destinationStageID=transitionObject.transition.destination_state.id
                  
                   stageNames.push(<Picker.Item label={destinationStageName} value={destinationStageID} />)
                                 
                  })
                            


                            actionList.push(

                                
                                    <Card>
                                        <CardItem header>
                                        <Text>Select Action</ Text>
                                        </ CardItem>

                                        <CardItem>

                                        <Item>                                 
                                          <Picker mode="dropdown">

                                          {stageNames}
                                          </ Picker>
                                        </ Item>
                                        </ CardItem>

                                        <CardItem footer>
                                        <Button><Text>Send to {} step</ Text></ Button>
                                        </ CardItem>


                                    </ Card>
           
                              )

           /*Translitions Loops*/
        }
        
        

        return (  
          
            <Container style={{flex:1}}>
           <Header>
                <Left>
            <Button transparent
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
                <Body>
                  <Title>{this.flow_name}</Title>
                  <Subtitle>{this.stageName}</Subtitle>
                </Body>
               
          </Header>
             <Content>
             <Form style={{flex:1}}>
               {fieldList} 
               {actionList}
             </Form>   
             </Content>   
            </Container>         
          
        );  
      }  
    }  
      
    
      
  
