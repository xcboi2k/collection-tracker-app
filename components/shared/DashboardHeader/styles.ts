import styled from "styled-components";
import colors from "../../../assets/themes/colors";
import { FONTS } from '../../../constants/constant'

export const DashboardHeaderContainer = styled.View`
    width: 100%;
    align-items: center;
    padding: 5px;
    height: 17%;
    background-color: ${colors.primary.colorOne};
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
`;

export const DashboardHeaderItemsHolderContainer = styled.View`
    width: 92%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
`;

export const DashboardHeaderTitle = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    color: ${colors.primary.colorTwo};
    margin-left: 10px;
`;

export const DashboardUserImg = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-left: auto;
`;