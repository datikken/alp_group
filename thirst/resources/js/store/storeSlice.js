import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const initialState = {
    geodata: false,
    regions: false,
    waterbases: false,
    order: false
}

export const geodata_fetch = createAsyncThunk('user/fetchGeoObjects', async ({latitude, longitude}) => {
    return await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=9a0606fc-a475-4fdb-8c57-1e8a12fbe2ae&results=1&geocode=${longitude},${latitude}`)
        .then(data => data.json())
});

export const regions_fetch = createAsyncThunk('user/fetchRegions', async () => {
    return await fetch(`/regions_get`)
        .then(data => data.json())
});

export const waterbases_fetch = createAsyncThunk('user/fetchWaterbases', async () => {
    return await fetch(`/waterbases_get`)
        .then(data => data.json())
})

export const storeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        order_set: (state,action) => {
            state.order = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(geodata_fetch.fulfilled, (state, action) => {
                state.geodata = action.payload.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(',')[0];
            })
            .addCase(regions_fetch.fulfilled, (state, action) => {
                state.regions = action.payload;
            })
            .addCase(waterbases_fetch.fulfilled, (state, action) => {
                state.waterbases = action.payload.data;
            })
    }
});

export const {order_set} = storeSlice.actions;

export const geodata_get = (state) => state.user.geodata;
export const regions_get = (state) => state.user.regions;
export const waterbases_get = (state) => state.user.waterbases;

export default storeSlice.reducer;
