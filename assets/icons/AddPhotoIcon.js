import React from "react";
import { Svg, Path } from "react-native-svg";

const AddPhotoIcon = ({size = 32, color = 'none' }) => {
    return(
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 206 198" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <Path
                d="M163.083 57.75V82.4175C163.083 82.4175 146.003 82.5 145.917 82.4175V57.75H120.167C120.167 57.75 120.253 41.3325 120.167 41.25H145.917V16.5H163.083V41.25H188.833V57.75H163.083ZM137.333 90.75V66H111.583V41.25H42.9167C33.475 41.25 25.75 48.675 25.75 57.75V156.75C25.75 165.825 33.475 173.25 42.9167 173.25H145.917C155.358 173.25 163.083 165.825 163.083 156.75V90.75H137.333ZM42.9167 156.75L68.6667 123.75L85.8333 148.5L111.583 115.5L145.917 156.75H42.9167Z"
                fill={color}
            />
        </Svg>
    );
};

export default AddPhotoIcon;