import React, { useRef } from "react";
import NcImageCardSearch from "../NcImage/NcImageCardSearch";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

let PREV_RATIO = 0.0;

const PostFeaturedMedia = ({
  className = " w-full h-full ",
  post,
}) => {
  var {
    source_domain,
    date_download,
    date,
    date_publish,
    image_url,
  } = post;

  const videoRef = useRef(null);

  let IS_MOBILE = false;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    IS_MOBILE = true;
  }
  const cardIntersectionObserver = useIntersectionObserver(videoRef, {
    freezeOnceVisible: false,
    threshold: 0.999,
    rootMargin: "20px",
  });
  const IN_VIEW =
    (cardIntersectionObserver?.intersectionRatio || -1) > PREV_RATIO;
  PREV_RATIO = cardIntersectionObserver?.intersectionRatio || 0;

  return (
    <div
      className={`nc-PostFeaturedMedia relative ${className}`}
      data-nc-id="PostFeaturedMedia"
    >
      <NcImageCardSearch
        containerClassName="absolute inset-0"
        src={image_url}
        source_domain={source_domain}
        date_download={date_download}
      />
    </div>
  );
};

export default PostFeaturedMedia;
