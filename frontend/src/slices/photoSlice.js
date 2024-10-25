import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}


// publish user photo
export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.publishPhoto(photo, token);

        // check for errors
        if (data.errors) return thunkAPI.rejectWithValue(data.errors[0]);

        return data;
    }
)

//  get user photos
export const getUserPhotos = createAsyncThunk(
    "photo/userphotos",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token);

        return data;

    }
)

//delete a photo
export const deletePhoto = createAsyncThunk(
    "photo/delete",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.deletePhoto(id, token);

        // check for errors
        if (data.errors) return thunkAPI.rejectWithValue(data.errors[0]);

        return data;

    }
)

//update photo
export const updatePhoto = createAsyncThunk(
    "photo/update",
    async (photoData, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhoto({ title: photoData.title }, photoData.id, token);

        // check for errors
        if (data.errors) return thunkAPI.rejectWithValue(data.errors[0]);

        return data;

    }
)

// get photo by id
export const getPhotoById = createAsyncThunk(
    "photo/getPhoto",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.getPhotoById(id,token);
        return data;
    }
)


export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
            .addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
                state.photos.unshift(state.photo);
                state.message = "Foto publicada com sucesso!"
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            })
            .addCase(getUserPhotos.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getUserPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = state.photos.filter(photo => photo._id !== action.payload.id);
                state.message = action.payload.message;
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            })
            .addCase(updatePhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos.map(photo => {
                    if (photo.id === action.payload.photo.id) {
                        return photo.title = action.payload.photo.title;
                    }
                    return photo;
                });
                state.message = action.payload.message;
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(getPhotoById.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getPhotoById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
            })
    }
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;



