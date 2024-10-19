import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}


export const userSlice = createSlice({

    name: 'user',

    initialState,

    reducers: {
        setUserDetail: (state, action) => {
            console.log("userDetail", action.payload)

            state.user = action.payload
        }
    }
})

export const { setUserDetail } = userSlice.actions

export default userSlice.reducer