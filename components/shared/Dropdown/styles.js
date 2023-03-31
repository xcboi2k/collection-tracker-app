import { FONTS } from '../../../constants/constant'

import styled from "styled-components/native";

export const DropdownContainer = styled.View`
    width: ${({ width }) => width};
`;
export const CustomText = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 5px;
`;