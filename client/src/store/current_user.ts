
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/react";
import { client } from "@/components/providers/apollo";
import { getCurrentUserQuery } from "@/graphql/queries/User";
import { currentUserType } from "@/types/user";


let initialState:currentUserType = {
    loading: true,
    error: {
        message: '',
        statusCode: null
    },
    user: {
        _id: null,
        name: null,
        image: null
    },
    status: ""
}

export let getCurrentUser = createAsyncThunk('currentuser/getCurrentUser', async () => {
    let user = await client.query({
        query: getCurrentUserQuery,
    })
    return user.data
})

let CurrentUser = createSlice({
    name: "currentuser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true
            state.status = 'loading';
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action?.payload?.me
            state.status = 'succeeded';
        })
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false
            state.status = 'failed';
           
            state.error.message = action.error.message || ''
        })
    }
})


export default CurrentUser.reducer