import styled from "styled-components/native";
import colors from "../../../assets/themes/colors";
import { FONTS } from '../../../constants/constant';

export const ButtonContainer = styled.TouchableOpacity`
    width: ${({ width }) => width};
    padding: 10px;
    background-color: ${colors.primary.colorOne};
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const ButtonLabel = styled.Text`
    font-size: ${({ textSize }) => textSize}px;
    text-align: center;
    font-family: ${FONTS.BOLD};
    text-transform: uppercase;
    color: ${colors.primary.colorTwo};
`;