import styled from "styled-components/native";
import { Container } from "../../common/Styles";

export const WishlistContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const HolderContainer = styled.View`
    margin-top: 20px;
    margin-bottom: 5px;
    align-items: center;
    width: 90%;
    height: 85%;
`;

export const DefaultText = styled.Text`
    text-align: center;
    font-size:20px;
    width:100%;
`;