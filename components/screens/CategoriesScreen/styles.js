import styled from "styled-components/native";
import { Container } from "../../common/Styles";

export const CategoriesContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    width: 90%;
`;

export const CategoryListContainer = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 16px;
    margin-top: 10px;
`;

export const CategoryList = styled.FlatList`
    width: 90%;
    margin-top: 20px;
    padding: 10px;
    height: 60%;
    flex-grow: 0;
`;
