import {View, StyleSheet, Text} from 'react-native';
import Svg, {Circle, RadialGradient, Stop} from 'react-native-svg';

export default function RadialGradientComp() {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <RadialGradient
          id="grad"
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fx="50%"
          fy="50%"
          gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
          <Stop offset="100%" stopColor="#00ff00" stopOpacity="1" />
        </RadialGradient>
        <Circle cx="150" cy="86" r="80" fill="url(#grad)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
