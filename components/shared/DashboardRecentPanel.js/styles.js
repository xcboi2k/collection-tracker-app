import styled from "styled-components";
import colors from "../../../assets/themes/colors";
import { FONTS } from '../../../constants/constant'

export const RecentPanel = styled.ScrollView`
    elevation: 10;
    width: 100%;
    height: 250px;
    background-color: ${'#FFFFFF'};
    border-radius: 10px;
    padding: 10px;
    height: 110px;
    padding-left: 20px;
    padding-top: 5px;
    margin-bottom: 10px;
    
`;

export const DetailsContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ItemContainer = styled.Text`
    width: 20%;
    flex-wrap: wrap;
    align-items: center;
`;

export const ItemName = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 16px;
    color: ${colors.primary.colorOne};
`;

export const ItemPrice = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 14px;
    color: ${colors.primary.colorOne};
`;

export const CommentImg = styled.Image`
    width: 100px;
    height: 100px;
    margin-left: auto;
`;