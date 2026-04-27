import React from 'react'
import { View } from 'react-native'

import ButtonText from '@/components/shared/ButtonText'
import CustomTextInput from '@/components/shared/CustomTextInput'
import SettingsHeader from '@/components/shared/SettingsHeader'

export default function ChangePasswordScreen({ navigation }) {
    return (
        <View className="flex-1 relative items-center pb-5">
            <SettingsHeader
                title="Change Password"
                onPressLeftIcon={() => navigation.navigate('SettingsMain')}
            />
            <View className="pt-2.5 w-[90%] items-center">
                <CustomTextInput
                    inputProps={{
                        placeholder: '***************',
                        keyboardType: 'email-address',
                        // onChangeText: formik.handleChange("email"),
                        // value: formik.values.email,
                        autoCapitalize: 'none',
                    }}
                    customLabel="New Password"
                    isPassword={true}
                    padding="25px"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: '***************',
                        keyboardType: 'email-address',
                        // onChangeText: formik.handleChange("email"),
                        // value: formik.values.email,
                        autoCapitalize: 'none',
                    }}
                    customLabel="Confirm New Password"
                    isPassword={true}
                    padding="25px"
                />
                <View className="w-full items-center justify-center mb-[15px]">
                    <ButtonText
                        width="80%"
                        title="Submit"
                        type="filled"
                        onPress={() => {}}
                        // onPress={() => formik.handleSubmit()}
                    />
                </View>
            </View>
        </View>
    )
}
