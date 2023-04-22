import styled from "styled-components/native";
import colors from "../../../assets/themes/colors";
import { FONTS } from '../../../constants/constant';

export const Container = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
    padding: 10px;
    background-color: ${colors.primary.colorOne};
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    font-family: ${FONTS.MEDIUM};
    font-size: 15px;
    color: ${colors.primary.colorTwo};
    padding: 2px;
    width: 65%;
`;

export const Amount = styled.Text`
    font-family: ${FONTS.MEDIUM};
    font-size: 15px;
    text-align: right;
    color: ${colors.primary.colorTwo};
    padding: 2px;
    margin-left: auto;
    width: 35%;
`;