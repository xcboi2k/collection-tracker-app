import styled from "styled-components/native";
import { Container } from "../../common/Styles";

import { FONTS } from "../../../constants/constant";
import colors from "../../../assets/themes/colors";

export const MainMenuContainer = styled(Container)`
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
`;

export const RecentPanelContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const TitleButtonContainer = styled.View`
    width: 90%;
    flex-direction: row;
    align-items: center;
    margin-top: 7px;
`;

export const Title = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    color: ${colors.primary.black};
    width: 80%;
`;

export const RightIcon = styled.TouchableOpacity`
    margin-left: auto;
`;

export const DefaultText = styled.Text`
    text-align: center;
    font-size:20px;
    width:100%;
`;

export const HomeImg = styled.Image`
    margin-top: 50px;
    width: 200px;
    height: 200px;
`;

export const RecentList = styled.FlatList`
    width: 100%;
    margin: 5px;
    padding: 10px;
    height: 60%;
    flex-grow: 0;
`;
