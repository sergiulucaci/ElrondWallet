import React, {type PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/AppNavigation';

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Wallet'>;

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => (
  <View style={styles.sectionContainer}>
    <Text
      style={[
        styles.sectionTitle,
        {
          color: Colors.black,
        },
      ]}>
      {title}
    </Text>
    <Text
      style={[
        styles.sectionDescription,
        {
          color: Colors.dark,
        },
      ]}>
      {children}
    </Text>
  </View>
);

const Welcome = () => {
  const {navigate} = useNavigation<homeScreenProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Section title="Welcome instructions" />
        <Button
          title="Go to Wallet"
          onPress={() => {
            navigate('Wallet');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Welcome;
