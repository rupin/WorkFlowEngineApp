import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Login from  "./authscreens/Login.js" 
import CommonDataManager from "./utilities/CommonDataManager.js"
import WorkflowNavigator from "./flowScreens/WorkflowNavigator.js"
global.commonData = new CommonDataManager();


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
    //console.log(props)
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if (global.commonData.getToken())
    {
      return <WorkflowNavigator/>
    }

    return (
      <Login/>
    );
  }
}