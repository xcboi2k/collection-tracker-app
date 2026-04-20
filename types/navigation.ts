export type RootStackParamList = {
    //auth
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    //main menu
    HomeMain: undefined
    CollectionAdd: undefined

    //collection
    CollectionMain: undefined
    CollectionEdit: { collectionItemID?: number }

    //categories
    CategoriesMain: undefined
    CategoriesAdd: undefined
    CategoriesEdit: { categoryID?: number }

    //wishilist
    WishlistMain: undefined
    WishlistAdd: undefined
    WishlistEdit: { wishlistItemID?: number }

    //tabs
    Home: undefined
    Collections: undefined
    Categories: undefined
    Wishlists: undefined
}
