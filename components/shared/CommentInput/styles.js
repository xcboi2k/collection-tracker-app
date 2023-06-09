import colors from '../../../assets/themes/colors'
import { FONTS } from '../../../constants/constant'

import styled from "styled-components/native";

export const InputContainer = styled.View`
    elevation: 5;
    width: 100%;
    background-color: ${'#FFFFFF'};
    border-radius: 5px;
    position: relative;
    flex-direction: row;
    align-items: center;
    height: 100px;
    margin-bottom: 20px;
`;

export const Input = styled.TextInput`
    padding: 10px;
    font-family: ${FONTS.REGULAR};
    font-size: 18px;
    flex: 1;
    height: 100%;
`;

export const CustomInputContainer = styled.View`
    width: ${({ width }) => width};
`;

export const CustomText = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 5px;
`;

export const ImgButton = styled.TouchableOpacity`
    height: 100%;
    width: 30%;
    align-items: center;
    justify-content: center;
    background-color: ${colors.primary.colorOne};
`;


export const CustomImage = styled.Image`
    width:100%;
    height:100%
`;