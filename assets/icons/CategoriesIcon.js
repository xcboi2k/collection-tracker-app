import React from "react";
import { Svg, Path } from "react-native-svg";

const CategoriesIcon = ({size = 32, color = 'none' }) => {
    return(
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 179 179" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
            <Path d="M83.1605 25.3583L55.4155 70.705C52.3575 75.6275 55.9375 82.0417 61.755 82.0417H117.17C122.988 82.0417 126.568 75.6275 123.51 70.705L95.8396 25.3583C95.1803 24.2667 94.2503 23.3638 93.1397 22.7371C92.029 22.1104 90.7753 21.7811 89.5 21.7811C88.2248 21.7811 86.9711 22.1104 85.8604 22.7371C84.7498 23.3638 83.8198 24.2667 83.1605 25.3583Z" fill={color}/>
            <Path d="M130.521 164.083C149.057 164.083 164.083 149.057 164.083 130.521C164.083 111.985 149.057 96.9583 130.521 96.9583C111.985 96.9583 96.9584 111.985 96.9584 130.521C96.9584 149.057 111.985 164.083 130.521 164.083Z" fill={color}/>
            <Path d="M29.8333 160.354H74.5833C78.6854 160.354 82.0417 156.998 82.0417 152.896V108.146C82.0417 104.044 78.6854 100.688 74.5833 100.688H29.8333C25.7312 100.688 22.375 104.044 22.375 108.146V152.896C22.375 156.998 25.7312 160.354 29.8333 160.354Z" fill={color}/>
        </Svg>
    );
};

export default CategoriesIcon;