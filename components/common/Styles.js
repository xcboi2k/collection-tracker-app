import { StyleSheet } from "react-native";
import styled from "styled-components/native";

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
    elevation: 10;
    width: 100%;
    height: 250px;
    background-color: ${'#FFFFFF'};
    border-radius: 10px;
    padding: 10px;
`;

export default commonStyles;