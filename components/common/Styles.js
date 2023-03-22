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

export default commonStyles;