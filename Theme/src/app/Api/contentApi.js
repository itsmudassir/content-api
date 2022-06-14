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
        return headers;
    },
})


const contentApi = createApi({
    reducerPath: "contentApi",
    baseQuery: baseQuery,
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7777" }),
    tagTypes: ["FavouritesFolder", "CustomTopics", "FavouritePosts", "FollowedTopics"],
    
    endpoints: (builder) => ({
        
        //=========== FAVOURITE FOLDER QUERIES =============
        
        // get all favourite folders
        getAllFolders: builder.query({
            query: () => ({
                url: "/api/favouritesFolder/",
            }),
            providesTags: ["FavouritesFolder"], // for auto-fetching
            keepUnusedDataFor: 0,   // makes caching time 0 (zero) || no caching
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


        // ============== Custom Topics ===============

        //Get All Customtopic
        getAllCustomTopics: builder.query({
            query: () => ({
                url: "/api/customTopicSearch/getcustomtopics/",
                method: "GET"
            }),
            providesTags: ["CustomTopics"],
            keepUnusedDataFor: 0,   // makes caching time 0 (zero) || no caching
        }),

        // Get Single CustomTopic
        getSingleCustomTopic : builder.query({
            query: (id)=>({
                url: `/api/customTopicSearch/getcustomtopic/${id}`,
                method: "GET"
            }),
            providesTags: ["CustomTopics"],
            keepUnusedDataFor: 0,   // makes caching time 0 (zero) seconds || no caching
        }),
        
        //deleteCustomTopic
        deleteCustomTopic: builder.mutation({
            query: ({ id }) => ({
                url: `/api/customTopicSearch/deletecustomtopic/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CustomTopics"],
        }),
        
        //Update CustomTopics
        updateCustomTopic: builder.mutation({
            query: (params) => ({
                url: `/api/customTopicSearch/updatecustomtopic/${params.id}`,
                method: "PATCH",
                body: params.customTopic,
            }),
            invalidatesTags: ["CustomTopics"],
        }),

        // create customTopic 
        createTopic: builder.mutation({
            query: (topicFields) => ({
                url: "/api/customTopicSearch/createcustomtopic",
                method: "POST",
                body: topicFields,
            }),
            invalidatesTags: ["CustomTopics"],
        }),
        
        // editCreateCustsomtopic
        editCreateCustsomtopic: builder.mutation({
            query: (obj)=>({
                url: "/api/customTopicSearch/editCreateCustsomtopic",
                method: "POST",
                body: obj 
            }),
            invalidatesTags: ["CustomTopics"],
        }),
        


        //============== FAVOURITE POSTS QUERIES ============
        
        // get all favourite posts by folder id
        getAllFavouritePosts: builder.query({
            query: (folderId) => ({
                url: `/api/favouritePosts/all_posts/${folderId}`,
                method: "GET"
            }),
            providesTags: ["FavouritePosts"]
        }),

        
        // get all favourite posts by authenticated user
        getAllFavouritePostsbyUser: builder.query({
            query: () => ({
                url: `/api/favouritePosts/all_posts`,
                method: "GET"
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
        
        
        //============== INSIGHTS QUERIES ===============
        
        // get insights
        getInsights: builder.mutation({
            query: (params)=>({
                url: `/api/insights/getInsights`,
                method: "POST",
                body: params
            }),
        }),

        //get custom topic insights.
        getCustomTopicInsights : builder.mutation({
            query: (obj)=>({
                url: "/api/insights/getCustomTopicInsights",
                method: "POST",
                body: obj
            }),

        }),
        
        
        //========== FOLLOWED-TOPICS QUERIES ============
        
        // get all Followed topics by authenticated user_id
        getAllFollowedTopics : builder.query({
            query: ()=>({
                url: "/api/followedTopics/",
                method: "GET"
            }),
            providesTags: ["FollowedTopics"],
            keepUnusedDataFor: 0,   // makes caching time 0 (zero) || no caching
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

        // check if the topic-name exist in DB
        isFollowingTopic: builder.mutation({
            query: (obj)=>({
                url: "/api/followedTopics/isFollowingTopic",
                method: "POST",
                body: obj
            }),
            invalidatesTags:["FollowedTopics"]
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
    useEditCreateCustsomtopicMutation,
    useGetSingleCustomTopicQuery,
    useUpdateCustomTopicMutation,
    useDeleteFolderMutation,
    useUpdateFolderMutation,
    useCreateTopicMutation,
    useDeletePostByElasticIdMutation,
    useGetInsightsMutation,
    useGetCustomTopicInsightsMutation,
    useGetAllFollowedTopicsQuery,
    useCreateFollowedTopicMutation,
    useDeleteFollowedTopicMutation,
    useIsFollowingTopicMutation,
    usePrefetch

} = contentApi;
