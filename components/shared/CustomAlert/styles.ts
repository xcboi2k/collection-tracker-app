import styled from 'styled-components/native';
import colors from '../../../assets/themes/colors';
import { FONTS } from '../../../constants/constant';

export const AlertContainer = styled.View`
    background-color: #fff;
    width: 80%;
    border-radius: 10px;
    padding: 20px;
    elevation: 5;
    align-items: center;
`;

export const Overlay = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5); /* 50% opacity black */
    justify-content: center;
    align-items: center;
`;

export const AlertTitle = styled.Text`
    font-family: ${FONTS.BOLD}
    font-size: 20px;
    color: ${colors.primary.colorOne};
    margin-bottom: 10px;
    text-align: center;
`;

export const AlertMessage = styled.Text`
    font-family: ${FONTS.REGULAR}
    font-size: 16px;
    color: ${colors.primary.black};
    margin-bottom: 20px;
    text-align: center;
`;

export const CloseButton = styled.TouchableOpacity`
    padding: 10px 20px;
    border-radius: 10px;
`;

export const ButtonText = styled.Text`
    font-family: ${FONTS.BOLD}
    font-size: 16px;
    color: ${colors.primary.colorOne};
    text-align: center;
`;