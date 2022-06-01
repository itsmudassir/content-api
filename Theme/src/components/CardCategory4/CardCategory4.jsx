import React, { useRef } from "react";
import NcImage from "../../components/NcImage/NcImage";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  useCreateFollowedTopicMutation,
  useDeleteFollowedTopicMutation,
} from "../../app/Api/contentApi";
import cogoToast from "cogo-toast";
import "./cardCategory4.css";

const CardCategory4 = ({
  className = "",
  label,
  count,
  index,
  categoryimage,
  isFollowing,
}) => {
  const [createFollowedTopic, createFollowedTopic_Obj] =
    useCreateFollowedTopicMutation();
  const [deleteFollowedTopic, deleteFollowedTopic_Obj] =
    useDeleteFollowedTopicMutation();
  const followingBtn = useRef();
  const unfollowBtn = useRef();
  const search = useLocation();
  const queryParams = queryString.parse(search);
  const newQueryParams = {
    ...queryParams,
    customCategory: label,
  };

  // EVENTS/HANDLERS
  const displayUnfollowBtn = () => {
    unfollowBtn.current.style.display = "block";
    followingBtn.current.style.display = "none";
  };

  const hideUnfollowBtn = () => {
    unfollowBtn.current.style.display = "none";
    followingBtn.current.style.display = "block";
  };

  const followTopicHandler = async () => {
    try {
      const res = await createFollowedTopic({ topicName: label });
      if (res.data) {
        cogoToast.success(res.data?.successMsg);
      }
      if (res.error) {
        cogoToast.success(res.error?.data?.errorMsg);
      }
      console.log(res);
    } catch (err) {
      console.log("Error occoured while creating topic", err);
    }
  };

  const unFollowTopicHandler = async () => {
    try {
      const res = await deleteFollowedTopic({ topicName: label });
      if (res.data) {
        cogoToast.success(res.data?.successMsg);
      }
      if (res.error) {
        cogoToast.success(res.error?.data?.errorMsg);
      }
      console.log(res);
    } catch (err) {
      console.log("Error occoured while creating topic", err);
    }
  };

  return (
    <>
      <div className="relative">
        {!isFollowing ? (
          <button onClick={() => followTopicHandler()} className="follow_btn">
            FOLLOW
          </button>
        ) : (
          <>
            <button
              ref={followingBtn}
              onMouseOver={displayUnfollowBtn}
              className="following_btn"
            >
              <FontAwesomeIcon className="mr-1" icon={faCheck} />
              FOLLOWING
            </button>

            <button
              onMouseLeave={hideUnfollowBtn}
              ref={unfollowBtn}
              onClick={() => unFollowTopicHandler()}
              style={{ display: "none" }}
              className="unfollow_btn"
            >
              <FontAwesomeIcon className="mr-1" icon={faXmark} />
              UNFOLLOW
            </button>
          </>
        )}

        <Link
          to={{
            pathname: "/discover/discover_search",
            search: queryString.stringify(newQueryParams),
          }}
          className={`nc-CardCategory4 flex flex-col ${className}`}
          data-nc-id="CardCategory4"
        >
          <div className="label_div">
            <div className="truncate">
              <h2
                className={`text-base sm:text-lg text-white font-semibold truncate z-50`}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </h2>
            </div>
          </div>
          <div>
            <NcImage
              src={categoryimage}
              className="object-cover w-full h-28 rounded brightness-50 "
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default CardCategory4;
