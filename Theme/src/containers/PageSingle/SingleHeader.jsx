import React from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./PageSingleTemp3Sidebar";
import PostMeta2 from "../../components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";
import CategoryBadgeList from "../../components/CategoryBadgeList/CategoryBadgeList";

export const SingleHeaderProps = {
  pageData: SinglePageType,
  hiddenDesc: Boolean,
  metaActionStyle: "style1" | "style2",
  titleMainClass: String,
  className: String,
};

const SingleHeader = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  const { title, category } = pageData.fields || pageData;
  return (
    <>
      <Helmet>
        <title>Contentgizmo</title>
      </Helmet>

      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          {/* <CategoryBadgeList itemClass="!px-3" categories={category} /> */}
          <SingleTitle mainClass={titleMainClass} title={title} />

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
              <PostMeta2
                size="large"
                className="leading-none flex-shrink-0"
                meta={pageData}
                hiddenCategories
                avatarRounded="rounded-full shadow-inner"
              />
            {/* <SingleMetaAction meta={pageData} /> */}
            <SingleMetaAction2 meta={pageData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
