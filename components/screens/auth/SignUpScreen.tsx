import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import * as Yup from 'yup'

import CollectorPlusIcon from '@/assets/collector-plus_icon.png'
import ButtonText from '@/components/shared/ButtonText'
import CustomLoader from '@/components/shared/CustomLoader'
import CustomTextInput from '@/components/shared/CustomTextInput'
import { INITIAL_VALUES } from '@/constants/formvalues'
import useSignUpUser from '@/hooks/auth/useSignUpUser'
import LoaderStore from '@/stores/LoaderStore'

export default function SignUpScreen({ navigation }) {
    const isLoading = LoaderStore((state) => state.isLoading)

    const submitRef = useRef(null)

    // Handles signing up
    const { signUpUser } = useSignUpUser()

    // Assigns sign up function to formik upon initialization
    useEffect(() => {
        submitRef.current = signUpUser
    }, [signUpUser])

    const formik = useFormik({
        initialValues: INITIAL_VALUES.CREATE_ACCOUNT,
        // Pattern to resolve circular dependency
        onSubmit: (values, actions) => {
            if (submitRef.current) {
                submitRef.current(values, actions)
            }
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('User name is required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
            password: Yup.string().required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Please confirm your password'),
        }),
    })

    return (
        <View className="flex-1 items-center pb-5 mt-10">
            <ScrollView className="flex-1 w-[90%]">
                <View className="w-full flex-row items-center justify-between mt-10">
                    <View className="w-[60%]">
                        <Text className="text-5xl font-bold text-primary-100 leading-tight">
                            Create an{'\n'}Account
                        </Text>
                    </View>

                    <View className="w-[40%] items-end">
                        <Image
                            source={CollectorPlusIcon}
                            className="w-36 h-36"
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View className="w-full flex flex-col items-center mb-[15px] mt-[30px]">
                    <CustomTextInput
                        inputProps={{
                            placeholder: 'Enter Username',
                            keyboardType: 'email-address',
                            onChangeText: formik.handleChange('userName'),
                            value: formik.values.userName,
                        }}
                        customLabel="Username"
                        padding="25px"
                    />
                    <CustomTextInput
                        inputProps={{
                            placeholder: 'Enter Email Address',
                            keyboardType: 'email-address',
                            onChangeText: formik.handleChange('email'),
                            value: formik.values.email,
                        }}
                        customLabel="Email Address"
                        padding="25px"
                    />
                    <CustomTextInput
                        inputProps={{
                            placeholder: 'Enter Password',
                            keyboardType: 'email-address',
                            onChangeText: formik.handleChange('password'),
                            value: formik.values.password,
                        }}
                        customLabel="Password"
                        padding="25px"
                        isPassword={true}
                    />
                    <CustomTextInput
                        inputProps={{
                            placeholder: 'Enter Confirm Password',
                            keyboardType: 'email-address',
                            onChangeText:
                                formik.handleChange('confirmPassword'),
                            value: formik.values.confirmPassword,
                        }}
                        customLabel="Confirm Password"
                        padding="25px"
                        isPassword={true}
                    />
                    <View className="w-full flex flex-row mb-[15px]">
                        <TouchableOpacity
                        // onPress={() =>
                        //     navigation.navigate('ForgotPassword')
                        // }
                        >
                            <Text className="text-[12px] text-primary-100 italic">
                                Forgot your password
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="w-full items-center justify-center mb-[15px]">
                        <ButtonText
                            width="80%"
                            title="Submit"
                            type="filled"
                            onPress={() => formik.handleSubmit()}
                        />
                    </View>

                    <View className="w-full flex flex-row justify-center">
                        <Text className="text-[12px] text mr-[5px]">
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text className="text-[12px] text-primary-100 italic">
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <CustomLoader visible={isLoading} />
        </View>
    )
}
