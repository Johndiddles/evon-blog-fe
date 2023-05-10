// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_BASE_URL } from "../utils/constants";

// const initialState = {
//     isLoggedIn: false,
//     checkAuthStatus: "idle",
//     user: {
//         user_id: null,
//         username: "",
//         token: ""
//     }
// }

// export const loginUser = createAsyncThunk("auth/userLogin", async(data)=> {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/login` , data)
//         console.log({response})

//         return response
//     } catch (error: any) {
//         console.log({error})
//         return error.response
//     }
// })

// export const AuthSlice = createSlice({
//     name:"auth",
//     initialState,
//     reducers: {
//         // login: {
//         //     reducer(state, action){

//         //     },
//         //     prepare(){
//         //         return {
//         //             payload: {}
//         //         }
//         //     }
//         // }
//     },
//     extraReducers(builder){
//         builder.addCase(loginUser.pending)
//     }
// })
