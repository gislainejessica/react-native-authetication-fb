/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const getUserCallback = (error, result) =>{
    console.log('Erro getUserCallback:', result);
    if (error){
      console.log('getUserCallback:', error);
    } else {
      setUser(result);
      setLoading(false);
    }
  };
  const getUserInfo = (token) => {
      const infoRequest = new GraphRequest('/me', {
        accessToken: token,
        parameters:{
          field:{
            string: ['email', 'name'],
          },
        }}, getUserCallback
      );
      new GraphRequestManager().addRequest(infoRequest).start();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          { loading && <ActivityIndicator/> }
          { user && (
            <>
              <Text style={styles.userName}>
                {user.name}
              </Text>
              <Text style={styles.userEmail}>
                {user.emmail}
              </Text>
            </>
          )}
        </View>
        <LoginButton
          permissions={['public_profile', 'email']}
          onLoginFinished={ async (error, result) => {
            if (error) {
              console.log('Deu ruim', error);
            } else if (result.isCancelled) {
              console.log('Cancelado');
            } else {
              const accessData = await AccessToken.getCurrentAccessToken();
              console.log('resultado', accessData);
              setLoading(true);
              getUserInfo(accessData.accessToken);
              }
            }}
            onLogoutFinished={()=>{setUser(null);}}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  userName:{
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
  },
  userEmail:{
    fontSize: 14,
    color:'#888',
  },
});

export default App;
