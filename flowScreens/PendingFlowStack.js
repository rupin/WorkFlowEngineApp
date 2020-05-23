
    import React, { Component } from "react";  

   import { createStackNavigator } from '@react-navigation/stack';
   import { NavigationContainer } from '@react-navigation/native';
   

    import pendingFlow from "../flowScreens/ViewPendingFlowsList.js"
    import ViewFlowDetail from "../flowScreens/ViewFlowDetail.js"


    const Stack = createStackNavigator();


    export default class WorkflowNavigator extends Component {          
      constructor(props) {
       super(props)
      }
     
      
      
      render() { 

        return (  
              <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="pendingFlow">
                  <Stack.Screen options={{headerShown: false}} name="Pending Flows" component={pendingFlow} />
                  <Stack.Screen options={{headerShown: false}} name="Flow Information" component={ViewFlowDetail} />
                </Stack.Navigator>
            </NavigationContainer>
        );  
      }  
    }  
      
    