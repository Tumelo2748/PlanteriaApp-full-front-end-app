import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
  

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  

  return (
    <>
      
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      
    </>
  );
};

export default SocialSignInButtons;
