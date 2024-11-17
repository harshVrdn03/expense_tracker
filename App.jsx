// import React, { useEffect } from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import RouteNavigation from './Navigation/RouteNavigation';
// import SplashScreen from 'react-native-splash-screen'

// useEffect(() => {
//   SplashScreen.hide();
// }, [])
// const App = () => {
//   return (
//     <NavigationContainer>
//       <RouteNavigation />
//     </NavigationContainer>
//   );
// };

// export default App;


import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RouteNavigation from './Navigation/RouteNavigation';
class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <NavigationContainer>
        <RouteNavigation />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({})

export default App;
