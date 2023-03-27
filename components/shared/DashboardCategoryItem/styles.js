import colors from "../../../assets/themes/colors";
import { FONTS } from "../../../constants/constant";
import styled from "styled-components/native";

export const Category = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const CategoryName = styled.Text`
    font-size: 12px;
    font-family: ${FONTS.BOLD}; 
    text-align: left;
`;

export const CategoryTotal = styled.Text`
    font-size: 10px;
    font-family: ${FONTS.REGULAR};
    color: '1a1717';
    text-align: left;
`;

export const TextHolder = styled.View`
    margin-left: 10px;
    width: 100%;
`;