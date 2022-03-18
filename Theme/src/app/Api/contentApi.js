import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const contentApi = createApi({
    reducerPath: "contentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7777" }),
    endpoints: (builder) => ({

        // FAVOURITE FOLDER QUERIES

        // get all favourite folders
        getAllFolders: builder.query({
            query: () => ({
                url: "/api/favouritesFolder/"
            })
        }),

        // Create Folder
        createFolder: builder.mutation({
            query: (folderName) => ({
                url: `/api/favouritesFolder`,
                method: "POST",
                body: folderName
            })
        }),

        //Get All Customtopic Data

        getAllCustomTopics: builder.query({
            query: () => ({
                url: "/api/customTopicSearch/getcustomtopics"
            })
        }),

        //CreateCustomTopic

        createTopic : builder.mutation({
            query:(topicName)=>({
                url : "/api/customTopicSearch/createcustomtopic",
                method: "POST",
                body: topicName
            })
        }),


        //Update CustomTopics

        // updateCustomTopic: builder.mutation({
        //     query: (params) => ({
        //         url: `/api/customTopicSearch/updatecustomtopic/${params.userId}`,
        //         method: "PUT",
        //         body: params.user
        //     }),
        // }),

        updateCustomTopic: builder.mutation({
            query: ({id , ...rest}) => ({
                url: `/api/customTopicSearch/updatecustomtopic/${id}`,
                method: "PUT",
                body: rest
            }),
        }),

        //FAVOURITE POSTS QUERIES

        // get all favourite posts by folder id
        getAllFavouritePosts: builder.query({
            query: (folderId) => ({
                url: `/api/favouritePosts/all_posts/${folderId}`
            })
        }),

        //add a post to favouritesFolder
        addPostToFavouritesFolder: builder.mutation({
            query: (params) => ({
                url: `/api/favouritePosts/${params.folderId}`,
                method:"POST",
                body: params.selectedPost
            })
        }),


        //USER QUERIES

        // update user queries
        updateUser: builder.mutation({
            query: (params) => ({
                url: `/api/user/${params.userId}`,
                method: "PUT",
                body: params.user
            }),
        })
    }),
});


export { contentApi };
export const {
    useGetAllFoldersQuery,
    useGetAllFavouritePostsQuery,
    useCreateFolderMutation,
    useUpdateUserMutation,
    useAddPostToFavouritesFolderMutation,
    useCreateTopicMutation,
    useGetAllCustomTopicsQuery,
    useUpdateCustomTopic,
} = contentApi;