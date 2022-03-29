import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { accountService } from '../../authentication/_services/account.Service';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:7777',
    prepareHeaders: (headers, { getState }) => {
        const user = accountService.userValue;
        const token = user.jwtToken;
        // const token = getState().auth.token

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
})


const contentApi = createApi({
    reducerPath: "contentApi",
    baseQuery: baseQuery,
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7777" }),
    tagTypes: ["FavouritesFolder", "GetCustomTopics"],

    endpoints: (builder) => ({

        // FAVOURITE FOLDER QUERIES

        // get all favourite folders

        getAllFolders: builder.query({
            query: () => ({
                url: "/api/favouritesFolder/",
            }),
            providesTags: ["FavouritesFolder"],
        }),

        // edit the single folder
        updateFolder: builder.mutation({
            query: ({ id, ...folder }) => ({
                url: `/api/favouritesFolder/${id}`,
                method: "PATCH",
                body: folder,
            }),
            invalidatesTags: ["FavouritesFolder"],
        }),

        //delete folder by id

        deleteFolder: builder.mutation({
            query: ({ id }) => ({
                url: `/api/favouritesFolder/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FavouritesFolder"],
        }),

        // Create Folder
        createFolder: builder.mutation({
            query: (folderName) => ({
                url: `/api/favouritesFolder`,
                method: "POST",
                body: folderName,
            }),
        }),

        //Get All Customtopic

        getAllCustomTopics: builder.query({
            query: () => ({
                url: "/api/customTopicSearch/getcustomtopics",
            }),
            providesTags: ["GetCustomTopics"],
        }),

        //deleteCustomTopic
        deleteCustomTopic: builder.mutation({
            query: ({ id }) => ({
                url: `api/customTopicSearch/deletecustomtopic/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags: ["GetCustomTopics"],
        }),
        //Update CustomTopics

        updateCustomTopic: builder.mutation({
            query: ({ _id, ...rest }) => ({
                url: `/api/customTopicSearch/updatecustomtopic/${_id}`,
                method: "PATCH",
                body: rest,
            }),
            // invalidatesTags: ["GetCustomTopics"],
        }),
        createTopic: builder.mutation({
            query: (topicFields) => ({
                url: "/api/customTopicSearch/createcustomtopic",
                method: "POST",
                body: topicFields,
            }),
            // invalidatesTags: ["GetCustomTopics"],
        }),

        //FAVOURITE POSTS QUERIES

        // get all favourite posts by folder id
        getAllFavouritePosts: builder.query({
            query: (folderId) => ({
                url: `/api/favouritePosts/all_posts/${folderId}`,
            }),
        }),
        getAllFavouritePostsbyUser: builder.query({
            query: () => ({
                url: `/api/favouritePosts/all_posts`,
            }),
        }),

        //add a post to favouritesFolder
        addPostToFavouritesFolder: builder.mutation({
            query: (params) => ({
                url: `/api/favouritePosts/${params.folderId}`,
                method: "POST",
                body: params.selectedPost,
            }),
        }),

        //USER QUERIES

        // update user queries
        updateUser: builder.mutation({
            query: (params) => ({
                url: `/api/user/${params.userId}`,
                method: "PUT",
                body: params.user,
            }),
        }),
    }),
});

export { contentApi };
export const {
    useGetAllFoldersQuery,
    useGetAllFavouritePostsQuery,
    useGetAllFavouritePostsbyUserQuery,
    useCreateFolderMutation,
    useUpdateUserMutation,
    useAddPostToFavouritesFolderMutation,
    useGetAllCustomTopicsQuery,
    useDeleteCustomTopicMutation,
    useUpdateCustomTopicMutation,
    useDeleteFolderMutation,
    useUpdateFolderMutation,
    useCreateTopicMutation,
} = contentApi;
