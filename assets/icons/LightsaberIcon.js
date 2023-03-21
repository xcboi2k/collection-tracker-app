import React from "react";
import { Svg, Path } from "react-native-svg";

const LightsaberIcon = ({size = 32, color = 'none' }) => {
    return(
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
            <Path
                d="M145.912 6.65499C143.951 6.62056 141.327 7.7604 138.526 10.5617L100.215 48.8719C100.215 48.8697 100.216 48.8673 100.217 48.8649L81.8659 67.2156L81.869 67.2186L77.9912 71.0964L77.9882 71.0934L71.0849 77.997L71.0879 78L67.2976 81.7903L67.2946 81.7873L57.8846 91.1972C57.8846 91.1988 57.8852 91.2003 57.8858 91.2015L40.9281 108.159L47.8223 115.053L145.42 17.4559C151.156 11.7201 149.926 6.72568 145.912 6.6553L145.912 6.65499ZM10.07 6.67327C6.05541 6.74396 4.82539 11.7381 10.5617 17.4744L67.2068 74.1195L74.1104 67.2153L60.6542 53.7603C60.6542 53.7664 60.6542 53.7719 60.6536 53.778L17.4556 10.5803C14.6549 7.77868 12.0303 6.63915 10.07 6.67327ZM81.5308 17.7609C78.6947 30.6004 77.6844 41.9268 73.0233 54.7664C66.4311 49.6202 63.6928 42.131 59.667 35.4449C59.8456 38.7599 60.1728 42.226 60.4043 45.7549L77.9879 63.3384L101.901 39.425C102.306 37.2664 102.72 35.1095 103.144 32.9544C96.6631 41.7282 90.2092 46.5678 81.3903 55.3413C79.3331 41.503 81.475 31.5991 81.5305 17.7612L81.5308 17.7609ZM26.7739 51.9867C26.758 51.9876 26.7495 51.9919 26.7489 52.0001C26.6703 53.5997 58.5665 75.8745 56.0665 77.4653C51.9639 80.0704 38.4023 86.9441 30.6227 91.15C36.6311 90.1308 46.935 88.7329 52.615 88.7119L63.4171 77.9098L44.0222 58.5159C35.7874 55.4032 27.2903 51.9443 26.7739 51.9864V51.9867ZM101.466 69.0931L92.6037 77.9552L109.719 95.0695C113.024 95.2935 116.329 95.501 119.622 95.4406C112.151 90.5961 97.6871 82.1154 97.7938 80.0332C97.9013 77.9348 117.125 73.5689 126.897 70.4032C118.431 69.7521 109.843 71.5751 101.466 69.0931ZM88.726 81.8327L81.823 88.7357L108.159 115.072L115.053 108.178L101.503 94.6271H101.521L88.7263 81.8327H88.726ZM78.032 92.5266L60.4507 110.108C60.575 114.437 60.5146 118.778 60.2922 122.411C63.7419 114.233 65.7297 106.61 74.2551 99.7203C78.656 103.372 81.8163 111.989 85.5968 118.123C85.3196 112.322 83.5027 102.279 84.0643 98.5582L78.0314 92.5263L78.032 92.5266ZM34.0336 108.159L30.1562 112.037L43.9451 125.826L47.8223 121.947L34.0346 108.159H34.0336ZM121.948 108.177L108.159 121.966V121.966L112.037 125.844L125.826 112.055L121.948 108.178V108.177ZM28.6477 117.424L25.6313 120.44L35.5419 130.35L38.5583 127.334L28.6477 117.423V117.424ZM127.334 117.442L117.423 127.352L120.44 130.369L130.35 120.458L127.334 117.442ZM21.7535 124.318L6.67271 139.398L16.5836 149.309L19.8142 146.078L23.0835 149.346L28.5212 143.908L25.2526 140.64L31.6638 134.228L28.6474 131.212L16.7981 143.061L12.92 139.183L24.7693 127.334L21.7529 124.317L21.7535 124.318ZM134.229 124.336L131.213 127.353L143.062 139.202L139.183 143.08L127.334 131.231L124.318 134.247L139.398 149.327L149.309 139.416L146.078 136.186L149.346 132.917L143.908 127.479L140.64 130.748L134.228 124.336H134.229Z"
                fill={color}
            />
        </Svg>
    );
};

export default LightsaberIcon;