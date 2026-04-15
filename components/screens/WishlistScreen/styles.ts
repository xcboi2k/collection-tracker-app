import styled from "styled-components/native";
import { Container } from "../../common/Styles";

export const WishlistContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    width: 90%;
    margin-top: 20px;
`;

export const DefaultText = styled.Text`
    text-align: center;
    font-size:20px;
    width:100%;
`;