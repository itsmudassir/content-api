import React from "react";

import PostCardLikeAction from "../../components/PostCardLikeAction/PostCardLikeAction";

const PostCardLikeContainer = ({ twitter_shares, topic_twitter }) => {
  return (
      <PostCardLikeAction
        twitter_shares={twitter_shares}
        topic_twitter={topic_twitter}
      />
  );
};

export default PostCardLikeContainer;
