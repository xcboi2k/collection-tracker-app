import React from "react";
import { Svg, Path } from "react-native-svg";

const GamingIcon = ({size = 32, color = 'none' }) => {
    return(
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 163 122" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_10_31)">
                    <Path
                    d="M154.529 53.2967C147.694 22.3946 137.407 5.90105 122.148 1.39578C118.94 0.454922 115.613 -0.0151212 112.27 0.000370789C107.852 0.000370789 104.004 1.07674 99.9338 2.21756C95.029 3.59363 89.457 5.15662 81.3327 5.15662C73.2083 5.15662 67.6332 3.59685 62.7186 2.22078C58.6452 1.07674 54.8005 0.000370789 50.3952 0.000370789C46.9386 -0.0116146 43.4972 0.456931 40.1697 1.39256C24.991 5.8785 14.7107 22.3656 7.77553 53.2773C0.318307 86.5416 3.98891 107.544 18.0687 112.416C19.9987 113.097 22.0294 113.447 24.0757 113.454C33.7211 113.454 41.4555 105.42 46.7407 98.8425C52.7123 91.3981 59.7022 87.6212 81.3327 87.6212C100.652 87.6212 108.648 90.2412 115.554 98.8425C119.895 104.25 123.997 108.033 128.09 110.415C133.533 113.58 138.973 114.282 144.255 112.468C152.576 109.629 157.345 102.123 158.435 90.1542C159.263 80.9761 157.987 68.9201 154.529 53.2967ZM65.8639 51.5629H55.5514V61.8754C55.5514 63.2429 55.0082 64.5544 54.0412 65.5214C53.0742 66.4884 51.7627 67.0316 50.3952 67.0316C49.0276 67.0316 47.7161 66.4884 46.7491 65.5214C45.7822 64.5544 45.2389 63.2429 45.2389 61.8754V51.5629H34.9264C33.5589 51.5629 32.2474 51.0196 31.2804 50.0526C30.3134 49.0857 29.7702 47.7741 29.7702 46.4066C29.7702 45.0391 30.3134 43.7276 31.2804 42.7606C32.2474 41.7936 33.5589 41.2504 34.9264 41.2504H45.2389V30.9379C45.2389 29.5703 45.7822 28.2588 46.7491 27.2919C47.7161 26.3249 49.0276 25.7816 50.3952 25.7816C51.7627 25.7816 53.0742 26.3249 54.0412 27.2919C55.0082 28.2588 55.5514 29.5703 55.5514 30.9379V41.2504H65.8639C67.2314 41.2504 68.5429 41.7936 69.5099 42.7606C70.4769 43.7276 71.0202 45.0391 71.0202 46.4066C71.0202 47.7741 70.4769 49.0857 69.5099 50.0526C68.5429 51.0196 67.2314 51.5629 65.8639 51.5629ZM92.9342 52.8519C91.6595 52.8519 90.4133 52.4739 89.3534 51.7657C88.2935 51.0575 87.4674 50.0509 86.9795 48.8731C86.4917 47.6954 86.3641 46.3995 86.6128 45.1492C86.8615 43.8989 87.4753 42.7505 88.3767 41.8491C89.2781 40.9477 90.4265 40.3338 91.6768 40.0852C92.9271 39.8365 94.223 39.9641 95.4007 40.4519C96.5785 40.9398 97.5851 41.7659 98.2933 42.8258C99.0015 43.8857 99.3795 45.1319 99.3795 46.4066C99.3795 48.116 98.7005 49.7554 97.4918 50.9641C96.283 52.1729 94.6436 52.8519 92.9342 52.8519ZM107.114 67.0316C105.838 67.0316 104.592 66.6532 103.531 65.9443C102.471 65.2353 101.645 64.2278 101.158 63.0491C100.67 61.8704 100.544 60.5737 100.794 59.323C101.044 58.0722 101.659 56.9238 102.562 56.0231C103.465 55.1223 104.615 54.5098 105.866 54.2629C107.118 54.016 108.414 54.146 109.592 54.6363C110.769 55.1266 111.775 55.9552 112.481 57.0172C113.187 58.0793 113.562 59.327 113.559 60.6024C113.555 62.309 112.874 63.9443 111.666 65.1495C110.457 66.3548 108.821 67.0316 107.114 67.0316ZM107.114 38.6722C105.839 38.6722 104.593 38.2942 103.533 37.586C102.473 36.8778 101.647 35.8712 101.159 34.6934C100.671 33.5157 100.544 32.2198 100.792 30.9695C101.041 29.7192 101.655 28.5708 102.556 27.6694C103.458 26.768 104.606 26.1542 105.857 25.9055C107.107 25.6568 108.403 25.7844 109.58 26.2722C110.758 26.7601 111.765 27.5862 112.473 28.6461C113.181 29.706 113.559 30.9522 113.559 32.2269C113.559 33.9363 112.88 35.5757 111.671 36.7845C110.463 37.9932 108.823 38.6722 107.114 38.6722ZM121.294 52.8519C120.019 52.8519 118.773 52.4739 117.713 51.7657C116.653 51.0575 115.827 50.0509 115.339 48.8731C114.851 47.6954 114.723 46.3995 114.972 45.1492C115.221 43.8989 115.835 42.7505 116.736 41.8491C117.637 40.9477 118.786 40.3338 120.036 40.0852C121.286 39.8365 122.582 39.9641 123.76 40.4519C124.938 40.9398 125.944 41.7659 126.653 42.8258C127.361 43.8857 127.739 45.1319 127.739 46.4066C127.739 48.116 127.06 49.7554 125.851 50.9641C124.642 52.1729 123.003 52.8519 121.294 52.8519Z"
                    fill={color}
                    />
                </g>
                <defs>
                <filter id="filter0_d_10_31" x="0" y="0" width="162.679" height="121.454" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_31"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_31" result="shape"/>
                </filter>
                </defs>
        </Svg>
    );
};

export default GamingIcon;