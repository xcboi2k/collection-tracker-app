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

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    width: 90%;
`;

export const HolderContainer = styled.View`
    margin-top: 10px;
    justify-content:center;
    align-items: center;
    width: 100%;
`;

export const RowHolderContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

export const StatsPanelContainer = styled.View`
    justify-content:center;
    align-items: center;
    width: ${({ width }) => width};
    height: 120px;
    background-color: white;
    padding: 12px;
    border-radius: 15px;
`;

export const StatsTitleText = styled.Text`
    font-family: ${FONTS.MEDIUM};
    font-size: 10px;
    color: ${colors.primary.black};
    text-align: center;
`;

export const StatsBodyText = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: ${({ size }) => size ? size : '20px'};
    color: ${colors.primary.colorOne};
    text-align: center;
`;

export const RecentPanelContainer = styled.View`
    width: 100%;
    height: 500px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 16px;
`;

export const TitleButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
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
    margin: 5px;
    padding: 10px;
    /* background-color: ${colors.primary.black}; */
`;
