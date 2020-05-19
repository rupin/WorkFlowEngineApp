
    import React, { Component } from "react";  
    import { StyleSheet, View, TextInput, Text, Button } from "react-native";  
      
    class LoginPage extends Component {  
      state = {  
        userName: "",  
        userPassword: ""  
      }  
      userNameTextChange = (inputText) => {  
        this.setState({ userName: inputText })  
      }  
      
      userPasswordTextChange = (inputText) => {  
        this.setState({ userPassword: inputText })  
      }  
      userLogin = () => {  
        this.getDataUsingPost()
      }  

    getDataUsingPost(){
    //POST json 
    var dataToSend = {};
    dataToSend.username=this.state.userName
    dataToSend.password=this.state.userPassword

    //making data to send on server
    
    //console.log(dataToSend)
    
    //POST request 
    fetch('https://flowengine.herokuapp.com/rest-auth/login/', {
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
        console.log(responseJson);
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
      
    const styles = StyleSheet.create({  
      container: {  
        flex: 1,  
        justifyContent: "center",  
        alignContent: "center",  
        margin: 10  
      },  
      textInputStyle: {  
        borderColor: '#9a73ef',  
        borderWidth: 1,  
        height: 40,  
        marginLeft: 20,  
        marginRight: 20,  
        padding: 10,  
        marginTop: 8  
      },  
      txtLogin: {  
        padding: 20,  
        fontWeight: "bold",  
        fontSize: 20  
      }  
    })  
      
    export default App;  
