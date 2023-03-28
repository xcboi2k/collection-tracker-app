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
    height: 180px;
    padding-left: 20px;
    padding-top: 20px;
    margin-bottom: 10px;
`;

export const DetailsHolder = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const ItemName = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 16px;
    width:50%;
    color: ${colors.primary.colorOne};
`;

export const ItemPrice = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 16px;
    width:50%;
    color: ${colors.primary.colorOne};
`;

export const Comment = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 16px;
    width:50%;
    color: ${'#1A1717'};
`;

export const CommentImg = styled.Image`
    width: 100px;
    height: 100px;
`;