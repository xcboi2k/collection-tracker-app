import styled from "styled-components/native";
import { Container } from "../../common/Styles";

export const CategoriesEditContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const CategoriesFormHolder = styled.View`
    padding-top: 10px;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: ${({ mode }) =>
        mode === "edit" ? "space-between" : "flex-end"};
    width: 90%;
    margin-top: 20px;
`;
