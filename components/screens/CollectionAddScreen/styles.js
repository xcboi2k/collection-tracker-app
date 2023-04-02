import styled from "styled-components/native";
import { Container } from "../../common/Styles";
// import colors from "../../../assets/themes/colors";

export const CollectionAddContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const CollectionFormHolder = styled.View`
    padding-top: 40px;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
`;

export const CollectionCategoryHolder = styled.View`
    margin-bottom: 30px;
    width: 100%;
    height: 120px;
    justify-content: flex-start;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-top: 20px;
`;
