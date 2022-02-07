//  ######  CustomLink  ######## //
// export interface CustomLink {
//   label: string;
//   href: string;
//   targetBlank?: boolean;
// }

//  ##########  PostDataType ######## //
export const TwMainColor = "gray";


export const TaxonomyType = {
  id: String | Number,
  name: String,
  href: String,
  count: Number,
  thumbnail: String,
  desc: String,
  color: TwMainColor | String,
  taxonomy: "category" | "tag",
}



// export interface PostAuthorType {
//   id: string | number;
//   firstName: string;
//   lastName: string;
//   displayName: string;
//   avatar: string;
//   bgImage?: string;
//   email?: string;
//   count: number;
//   desc: string;
//   jobName: string;
//   href: string;
// }

// export interface PostDataType {
//   id: string | number;
//   author: PostAuthorType;
//   date: string;
//   href: string;
//   categories: TaxonomyType[];
//   title: string;
//   featuredImage: string;
//   desc?: string;
//   like: {
//     count: number;
//     isLiked: boolean;
//   };
//   bookmark: {
//     count: number;
//     isBookmarked: boolean;
//   };
//   commentCount: number;
//   viewdCount: number;
//   readingTime: number;
//   postType: "standard" | "video" | "gallery" | "audio";
//   videoUrl?: string;
//   audioUrl?: string;
//   galleryImgs?: string[];
// }



// export interface VideoType {
//   id: string;
//   title: string;
//   thumbnail: string;
// }
