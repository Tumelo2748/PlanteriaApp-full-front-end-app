import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../customs/CustomInput/CustomInput';
import CustomButton from '../customs/CustomButton/CustomButton';

import { useNavigation } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  const onSendPressed = () => {
    //navigation.navigate('NewPassword');
    Alert.alert("send button is clicked");
  };

  const onSignInPress = () => {
    navigation.navigate('signInScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

        <CustomButton text="Send" onPress={onSendPressed} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    marginTop:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ForgotPasswordScreen;
