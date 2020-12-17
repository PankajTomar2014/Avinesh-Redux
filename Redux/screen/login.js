import React, { Component, useState, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import actions from '../../redux/actions'

import ImagePath from '../../constants/ImagePath';
import strings from '../../constants/LocalizedStrings';
import { colors } from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import { fontNames } from '../../styles/fontFamily';
import { moderateScale, textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { CommonButton } from '../../components/CommonButton';
import SelectLangDropDown from '../../components/SelectLangDropDown';
import { SelectLangButton } from '../../components/SelectLangButton';
import CommonHeader from '../../components/CommonHeader';
import { TextInputWithLabel } from '../../components/TextInputWithLabel';
import { BaseUrl } from '../../config/urls'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const LoginScreen = props => {
    const navigation = useNavigation();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const focusEmail = useRef("");
    const focusPassword = useRef("");

    const showHidePassword = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const onSubmit = () => {
        // debugger
        let {login} = props.actions
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('role', 'vendor');
        console.log("data_in_from_data_of_sign_up", data)
        login(data)
        .then(res => {
        //   debugger
          console.log('loginData : ',res)
          if (res.status == 200) {
            navigation.navigate('homeScreen')
          } else {

          }
        })
        .catch(err => {
        //   debugger
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
            <CommonHeader
                leftIcon={ImagePath.ic_back_dark}
                onPressLeft={() => navigation.goBack()}
                centerIcon={ImagePath.logo_small}
                rightTextStyle={{ color: colors.COMMON_THEME_COLOR }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1, }}
            >

                <ScrollView style={{ paddingBottom: moderateScale(40) }}
                    keyboardShouldPersistTaps="always"
                >

                    <View style={{ flex: 1, marginHorizontal: moderateScale(24) }}>
                        <Text style={{ ...commonStyles.fontSize_24_BOLD, }}>{strings.LOGIN}</Text>

                        <TextInputWithLabel
                            ref={focusEmail}
                            autoFocus={true}
                            mainViewStyle={{ marginVertical: moderateScale(24) }}
                            textInputStyle={{ height: moderateScale(48) }}
                            label={strings.USERNAME}
                            placeholder={strings.ENTER_YOUR_USERNAME}
                            onChangeText={(val) => setUsername(val)}
                            returnKeyType="next"
                            onSubmitEditing={() => focusPassword.current.focus()}
                        />

                        <TextInputWithLabel
                            ref={focusPassword}
                            label={strings.PASSWORD}
                            placeholder={strings.ENTER_YOUR_PASSWORD}
                            textInputStyle={{ height: moderateScale(48) }}
                            onChangeText={(val) => setPassword(val)}
                            secureTextEntry={secureTextEntry}
                            maxLength={14}
                            returnKeyType="done"
                            rightText={secureTextEntry ? strings.SHOW : strings.HIDE}
                            onPressRight={showHidePassword}
                        />
                    </View>

                    <TouchableOpacity style={{ ...commonStyles.margin_16_24, marginBottom: moderateScale(100) }}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("forgotPassword")}>
                        <Text style={{ ...commonStyles.fontSize_14_MEDIUM, color: colors.BLUE_185_1 }}>{strings.FORGOT_PASSWORD}</Text>
                    </TouchableOpacity>

                </ScrollView>
                <CommonButton
                    buttonText={strings.SUBMIT}
                    buttonStyle={{
                        marginBottom: moderateScale(24)
                    }}
                    onPress={onSubmit}
                />

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(actions, dispatch),
    };
  };
  const mapStateToProps =({language}) => ({
    // language: language.language
  });
  export default connect(mapStateToProps,mapDispatchToProps) (LoginScreen)