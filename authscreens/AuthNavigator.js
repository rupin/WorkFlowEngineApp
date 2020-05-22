
    import React, { Component } from "react";  

    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
   

    import SignUp from "../authscreens/SignUp.js"
    import Login from "../authscreens/Login.js"


    const Stack = createStackNavigator();


    export default class AuthNavigator extends React.Component {          
      constructor(props) {
      super(props)
      }
     
      
      
      render() { 

        return (  
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SignUp" component={SignUp} />      
                </Stack.Navigator>
            </NavigationContainer>
        );  
      }  
    }  
      
    
      
  
