import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { accountService } from '../../authentication/_services/account.Service';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:7777',
    prepareHeaders: (headers, { getState }) => {
        const user = accountService.userValue;
        const token = user.jwtToken;

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
    tagTypes: ["FavouritesFolder", "GetCustomTopics", "FavouritePosts", "FollowedTopics"],

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
            invalidatesTags: ["FavouritesFolder"],
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
            providesTags: ["FavouritePosts"]
        }),
        
        // get all favourite posts by authenticated user
        getAllFavouritePostsbyUser: builder.query({
            query: () => ({
                url: `/api/favouritePosts/all_posts`,
            }),
            providesTags: ["FavouritePosts"]
        }),

        //add a post to favouritesFolder
        addPostToFavouritesFolder: builder.mutation({
            query: (params) => ({
                url: `/api/favouritePosts/${params.folderId}`,
                method: "POST",
                body: params.selectedPost,
            }),
            invalidatesTags: ["FavouritePosts"]
        }),
        
        // delete single post by post id
        deletePostByElasticId: builder.mutation({
            query: (id) => ({
                url: `/api/favouritePosts/post/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["FavouritePosts"]
        }),
        
        
        // INSIGHTS QUERIES
        
        // get insights
        getInsights: builder.mutation({
            query: (params)=>({
                url: `/api/insights/getInsights`,
                method: "POST",
                body: params
            })
        }),
        
        
        // FOLLOWED-TOPICS QUERIES
        
        // get all Followed topics by authenticated user_id
        getAllFollowedTopics : builder.query({
            query: ()=>({
                url: "/api/followedTopics/",
                method: "GET"
            }),
            providesTags: ["FollowedTopics"],
        }),
        
        // Create/follow Followed-topics by topic-name with authenticated user_id
        createFollowedTopic : builder.mutation({
            query: (obj)=>({
                url: "/api/followedTopics/",
                method: "POST",
                body: obj
            }),
            invalidatesTags: ["FollowedTopics"]
        }),

        // delete/unfollow Followed-topics by topic-name with authenticated user_id
        deleteFollowedTopic : builder.mutation({
            query: (obj)=>({
                url: "/api/followedTopics/",
                method: "DELETE",
                body: obj
            }),
            invalidatesTags: ["FollowedTopics"]
        }),
        
        
        
    }),
});

export { contentApi };
export const {
    useGetAllFoldersQuery,
    useGetAllFavouritePostsQuery,
    useGetAllFavouritePostsbyUserQuery,
    useCreateFolderMutation,
    useAddPostToFavouritesFolderMutation,
    useGetAllCustomTopicsQuery,
    useDeleteCustomTopicMutation,
    useUpdateCustomTopicMutation,
    useDeleteFolderMutation,
    useUpdateFolderMutation,
    useCreateTopicMutation,
    useDeletePostByElasticIdMutation,
    useGetInsightsMutation,
    useGetAllFollowedTopicsQuery,
    useCreateFollowedTopicMutation,
    useDeleteFollowedTopicMutation

} = contentApi;
