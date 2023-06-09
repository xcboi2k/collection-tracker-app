import React from "react";
import { Svg, Path } from "react-native-svg";

const BrickIcon = ({size = 32, color = 'none' }) => {
    return(
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 165 165" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            >
            <Path
                d="M130.625 41.25V34.375C130.625 30.7283 129.176 27.2309 126.598 24.6523C124.019 22.0737 120.522 20.625 116.875 20.625H103.125C99.4783 20.625 95.9809 22.0737 93.4023 24.6523C90.8237 27.2309 89.375 30.7283 89.375 34.375V41.25H75.625V34.375C75.625 30.7283 74.1763 27.2309 71.5977 24.6523C69.0191 22.0737 65.5217 20.625 61.875 20.625H48.125C44.4783 20.625 40.9809 22.0737 38.4023 24.6523C35.8237 27.2309 34.375 30.7283 34.375 34.375V41.25H20.625V137.5H144.375V41.25H130.625Z"
                fill={color}
            />
        </Svg>
    );
};

export default BrickIcon;