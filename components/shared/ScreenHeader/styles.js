
import styled from "styled-components";
import colors from "../../../assets/themes/colors";
import { FONTS } from '../../../constants/constant'

export const ScreenHeaderContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    height: 13%;
    background-color: ${colors.primary.colorOne};
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
`;

export const ScreenTitle = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    color: ${colors.primary.colorTwo};
    margin-left: 10px;
`;

export const RightIcon = styled.TouchableOpacity`
    margin-left: auto;
`;