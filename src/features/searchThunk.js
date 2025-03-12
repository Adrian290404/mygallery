import { createAsyncThunk } from "@reduxjs/toolkit"

const URLstart = 'https://api.unsplash.com/'

export const getSearchThunk = createAsyncThunk('getSearchData', async (params = "") =>{
    let realURL
    if (params === ""){
        realURL = URLstart + '/photos/random?count=15'
    }
    else{
        realURL = URLstart + '/search/photos?query=' + params + '&per_page=15'
    }

    try {
        const response = await fetch(realURL, {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${import.meta.env.VITE_API_TOKEN}`
            }
        });
        if(response.ok){
            const data = await response.json();
            return params === "" ? data : data.results;
        }
    }
    catch (error) {
        console.error('Error: ', error)
    }
})