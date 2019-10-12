/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <LoginButton
          permissions={['public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('Deu ruim', error);
            } else if (result.isCancelled) {
              console.log('Cancelado');
            } else {
              console.log('resultado', result);
              }
            }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
