import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import colors from '../styles/colors';
import {Icon} from 'react-native-vector-icons/dist/FontAwesome';
import RoundedButton from '../components/buttons/RoundedButton';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
export default class LoggedOut extends Component {
  onFacebookPress() {
    alert('Facebook button pressed');
  }
  onCreateAccountPress() {
    alert('Create Account button pressed');;
  }

  async FacebookLogin() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',,
    ]);
    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    await firebase.auth().signInWithCredential(credential);
    return this.props.navigation.navigate('Home');
  }

  async googleLogin() {
    try {
      // add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.log(firebaseUserCredential.user.toJSON());
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image
            style={styles.logo}
            source={require('../img/airbnb-logo.png')}
          />
          <Text style={styles.welcomeText}>
            Welcome to Airbnb Clone with React Native
          </Text>
          <RoundedButton
            text="Connect to Facebook"
            textColor={colors.green01}
            background={colors.white}
            icon={
              <Icon name="facebook" size={20} style={styles.facebookIcon} />
            }
            onPress={() => this.FacebookLogin()}
          />

          <RoundedButton
            text="Connect to Google"
            textColor={colors.green01}
            background={colors.white}
            icon={<Icon name="google" size={20} style={styles.facebookIcon} />}
            onPress={() => this.googleLogin()}
          />

          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={this.onCreateAccountPress}
          />

          <TouchableHighlight
            style={styles.moreOptionsButton}
            onPress={this.onMoreOptionsPress}>
            <Text style={styles.moreOptionsButtonText}>More options</Text>
          </TouchableHighlight>

          <View style={styles.termsAndConditions}>
            <Text style={styles.termsText}>
              By tapping Continue, Create Account or More
            </Text>
            <Text style={styles.termsText}>{' options,'}</Text>
            <Text style={styles.termsText}>{"I agree to Airbnb's "}</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Terms of Service</Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>,</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Payments Terms of Service</Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>,</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Privacy Policy</Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>, and</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Nondiscrimination Policy</Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>.</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.green01,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  facebookIcon: {
    color: colors.green01,
    position: 'relative',
    left: 20,
    zIndex: 8,
  },
  moreOptionsButton: {
    marginTop: 10,
  },
  moreOptionsButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  termsAndConditions: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 30,
  },
  termsText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
});
