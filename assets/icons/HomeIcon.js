import React from "react";
import { Svg, Path } from "react-native-svg";

const HomeIcon = ({size = 32, color = 'none' }) => {
    return(
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
            <Path
                d="M0 136V45.3333L68 0L136 45.3333V136H85V83.1111H51V136H0Z"
                fill={color}
            />
        </Svg>
    );
};

export default HomeIcon;