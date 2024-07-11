import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import colors from '../../assets/themes/colors'

const commonStyles = StyleSheet.create({
    defaultPage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#F2E9EA',
    },
});

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${'#F2E9EA'};
`;

export const Panel = styled.View`
    width: 100%;
    height: 250px;
    background-color: ${'#FFFFFF'};
    border-radius: 10px;
    padding: 10px;
`;

export const ColorPickerContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    z-index: 999;
`;
export const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 10%;
    right: 10%;
    width: 50px;
    height: 50px;
    border-radius: 10000px;
    background: ${colors.primary.colorOne};
    z-index: 9999;
    align-items: center;
    justify-content: center;
`;

export default commonStyles;