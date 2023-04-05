import { ICON_NAMES } from "../constants/constant";
import colors from "../assets/themes/colors";

const preMadeCategories = [
    {
        user_id: "1",
        category_name: "Action Figures",
        category_icon: ICON_NAMES.CATEGORIES_ICONS.FIGURE,
        category_color: colors.secondary.colorOne,
        created_at: "",
        updatedAt: "",
        id: "1",
    },
    {
        user_id: "2",
        category_name: "Robots",
        category_icon: ICON_NAMES.CATEGORIES_ICONS.ROBOT,
        category_color: colors.secondary.colorTwo,
        created_at: "",
        updatedAt: "",
        id: "2",
    },
    {
        user_id: "3",
        category_name: "Robots",
        category_icon: ICON_NAMES.CATEGORIES_ICONS.CAR,
        category_color: colors.secondary.colorThree,
        created_at: "",
        updatedAt: "",
        id: "3",
    },
]

export default preMadeCategories;