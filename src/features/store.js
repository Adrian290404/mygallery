import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./searchSlice";
import { favoritesSlice } from "./favoritesSlice";

export const store = configureStore({
    reducer:{
        search: searchSlice.reducer,
        favorite: favoritesSlice.reducer
    }
})