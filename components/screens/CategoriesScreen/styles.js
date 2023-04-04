import styled from "styled-components/native";
import { Container } from "../../common/Styles";

export const CategoriesContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const CategoryList = styled.FlatList`
    width: 90%;
    margin-top: 30px;
    padding: 10px;
    height: 60%;
    flex-grow: 0;
`;
