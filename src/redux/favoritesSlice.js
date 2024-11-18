import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: 'favorite',
    initialState: {
        data: localStorage.getItem('favorites') ?  Array.from(JSON.parse(localStorage.getItem('favorites'))) : []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.data.push(action.payload)
            localStorage.setItem('favorites', JSON.stringify(state.data))
        },
        removeFavorite: (state, action) => {
            state.data = state.data.filter(photo => photo.id !== action.payload)
            localStorage.setItem('favorites', JSON.stringify(state.data))
        },
        editPhoto: (state, action) => {
            const photoIndex = state.data.findIndex(photo => photo.id === action.payload.id)
            if (photoIndex !== -1) {
                state.data[photoIndex].description = action.payload.description
                localStorage.setItem('favorites', JSON.stringify(state.data))
            }
        }
        
    }
})

export const { addFavorite, editPhoto, removeFavorite } = favoritesSlice.actions
export const favoriteList = (state) => state.favorite.data