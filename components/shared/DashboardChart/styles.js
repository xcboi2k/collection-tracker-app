import styled from "styled-components/native";

import colors from "../../../assets/themes/colors";
import { FONTS } from "../../../constants/constant";

export const Title = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
`;

export const Chart = styled.View`
    flex: 1;
`;

export const FigureContainer = styled.View`
    width: 100%;
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

export const CategoryListContainer = styled.ScrollView`
    flex: 1;
`;

export const CategoryList = styled.FlatList``;

export const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    padding-left: 5px;
    margin-bottom: 10px;
`;

export const DefaultText = styled.Text`
    text-align: center;
    font-size:20px;
    width:100%;
`;