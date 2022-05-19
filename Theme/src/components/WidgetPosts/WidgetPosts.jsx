
import Card3Small from "../Card3Small/Card3Small";
import WidgetHeading1 from "../WidgetHeading1/WidgetHeading1";
import { PostDataType } from "../../data/types";
import React, { FC } from "react";

export const WidgetPostsProps = {
  className: String,
  posts: PostDataType,
}

const WidgetPosts= ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  posts,
}) => {

  //console.log(posts.results?.hits.items[0].fields, "in widgetposts")
  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        // viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {posts? (posts.results?.hits.items?.slice(0, 7).map((post) => {
          return(
            <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post.id}
            post={post.fields}
          />
          )
        })) : "There occured an error"}
      </div>
    </div>
  );
};

export default WidgetPosts;
