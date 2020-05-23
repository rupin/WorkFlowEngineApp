
    import React, { Component } from "react";  

   import { createDrawerNavigator } from '@react-navigation/drawer';
   import { NavigationContainer } from '@react-navigation/native';
   

    import CreateFlow from "../flowScreens/CreateFlow.js"
    import PendingFlowStack from "../flowScreens/PendingFlowStack.js"


    const Drawer = createDrawerNavigator();


    export default class WorkflowNavigator extends Component {          
      constructor(props) {
       super(props)
      }
     
      
      
      render() { 

        return (  
              <NavigationContainer independent={true}>
                <Drawer.Navigator initialRouteName="PendingFlowStack">
                  <Drawer.Screen name="View Pending" component={PendingFlowStack} />
                  <Drawer.Screen name="Create Flow" component={CreateFlow} />      
                </Drawer.Navigator>
            </NavigationContainer>
        );  
      }  
    }  
      
    
      
  
