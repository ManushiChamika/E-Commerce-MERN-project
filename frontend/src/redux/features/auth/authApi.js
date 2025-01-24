//This is to create an auth api
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../../utils/baseUtil'

const authAPi = createApi({
    reducerPath: 'authApi',

    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/auth`,
        credentials: 'include',
    }),
    
    endpoints : (builder) => ({
        //register functionality
        registerUser : builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        //login functionality
        loginUser : builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    })
    
})

export const { useRegisterUserMutation, useLoginUserMutation } = authAPi;
export default authAPi;