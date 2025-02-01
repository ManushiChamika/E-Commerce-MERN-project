import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseUtil';

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/reviews`,
        credentials: 'include',
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        //mutation to post reviews
        postReviews: builder.mutation({
            query: (reviewData) => ({
                url: '/post-review',
                method: 'POST',
                body: reviewData,
            }),
            //invalidates the cache for the reviews
            invalidatesTags: (result, error, {postId}) => [{type: "Reviews", postId}],
        }),
        //query to get reviews count
        getReviewsCount: builder.query({
            query: () => ({
                url: '/total-reviews',
            })
        }),
        getReviewsByUserId: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`
            }),
            providedTags: (result) => result ? [{type: "Reviews", id:result[0]?.email}] : []
        })        
    }),
})

//export the hooks
export const {usePostReviewsMutation, useGetReviewsCountQuery, useGetReviewsByUserIdQuery} = reviewApi;
export default reviewApi;