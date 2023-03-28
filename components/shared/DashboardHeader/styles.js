import styled from "styled-components";
import colors from "../../../assets/themes/colors";
import { FONTS } from '../../../constants/constant'

export const DashboardHeaderContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    height: 13%;
    background-color: ${colors.primary.colorOne};
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
`;

export const DashboardHeaderTitle = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    color: ${colors.primary.colorTwo};
    margin-left: 10px;
`;

export const DashboardUserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    margin-left: auto;
`;