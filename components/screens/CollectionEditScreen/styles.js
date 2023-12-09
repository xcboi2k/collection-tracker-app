import styled from "styled-components/native";
import { Container } from "../../common/Styles";

export const CollectionEditContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const CollectionFormHolder = styled.View`
    padding-top: 10px;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
`;

export const ScrollContainer = styled.ScrollView`
    width: 90%;
    flex: 1;
`

export const CollectionCategoryHolder = styled.View`
    margin-bottom: 30px;
    width: 100%;
    height: 120px;
    justify-content: flex-start;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: ${({ mode }) =>
        mode === "edit" ? "space-between" : "flex-end"};
    width: 100%;
    margin-top: 20px;
`;
