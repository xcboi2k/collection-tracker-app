import React from "react";
import { Svg, Path } from "react-native-svg";

const DropdownIcon = ({size = 32, color = 'none' }) => {
    return(
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 245 245" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
            <Path
                d="M71.4584 102.083L122.5 153.125L173.542 102.083H71.4584Z"
                fill={color}
            />
        </Svg>
    );
};

export default DropdownIcon;