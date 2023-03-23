import React from "react";
import PropTypes from "prop-types";
import { ICON_NAMES } from "../../constants/constant";

import AboutIcon from '../../assets/icons/AboutIcon';
import AddIcon from '../../assets/icons/AddIcon';
import AddPhotoIcon from '../../assets/icons/AddPhotoIcon';
import BackIcon from '../../assets/icons/BackIcon';
import BrickIcon from '../../assets/icons/BrickIcon';
import CarIcon from '../../assets/icons/CarIcon';
import CategoriesIcon from '../../assets/icons/CategoriesIcon';
import CollectionIcon from '../../assets/icons/CollectionIcon';
import DropdownIcon from '../../assets/icons/DropdownIcon';
import FigureIcon from '../../assets/icons/FigureIcon';
import GamingIcon from '../../assets/icons/GamingIcon';
import HomeIcon from '../../assets/icons/HomeIcon';
import LightsaberIcon from '../../assets/icons/LightsaberIcon';
import RobotIcon from '../../assets/icons/RobotIcon';
import StatueIcon from '../../assets/icons/StatueIcon';
import WishListIcon from '../../assets/icons/WishListIcon';

const Icon = ({ name, size = 40, color }) => {
    if (name === ICON_NAMES.SYSTEM_ICONS.ABOUT) return <AboutIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.ADD) return <AddIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.ADD_PHOTO) return <AddPhotoIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.BACK) return <BackIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.CATEGORIES) return <CategoriesIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.COLLECTION) return <CollectionIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.DROPDOWN) return <DropdownIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.HOME) return <HomeIcon color={color} size={size} />;
    if (name === ICON_NAMES.SYSTEM_ICONS.WISHLIST) return <WishListIcon color={color} size={size} />;

    if (name === ICON_NAMES.CATEGORIES_ICONS.CAR) return <CarIcon color={color} size={size} />;
    if (name === ICON_NAMES.CATEGORIES_ICONS.FIGURE) return <FigureIcon color={color} size={size} />;
    if (name === ICON_NAMES.CATEGORIES_ICONS.GAMING) return <GamingIcon color={color} size={size} />;
    if (name === ICON_NAMES.CATEGORIES_ICONS.LIGHTSABER) return <LightsaberIcon color={color} size={size} />;
    if (name === ICON_NAMES.CATEGORIES_ICONS.ROBOT) return <RobotIcon color={color} size={size} />;
    if (name === ICON_NAMES.CATEGORIES_ICONS.STATUE) return <StatueIcon color={color} size={size} />;
    if (name === ICON_NAMES.CATEGORIES_ICONS.TOY_BRICK) return <BrickIcon color={color} size={size} />;

    return null;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.number,
};

export default Icon;