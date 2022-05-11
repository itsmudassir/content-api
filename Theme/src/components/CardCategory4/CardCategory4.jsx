import React, {useState, useRef } from "react";
import NcImage from "../../components/NcImage/NcImage";
import Badge from "../../components/Badge/Badge";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import {useCreateFollowedTopicMutation,useDeleteFollowedTopicMutation} from "../../app/Api/contentApi";
import cogoToast from "cogo-toast";
const CardCategory4 = ({
  className = "",
  label,
  count,
  index,
  categoryimage,
  isFollowing
}) => {
  // const [isFollowing, setisFollowing] = useState(false);
  const [createFollowedTopic, createFollowedTopic_Obj]= useCreateFollowedTopicMutation();
  const [deleteFollowedTopic, deleteFollowedTopic_Obj]= useDeleteFollowedTopicMutation();
  const followingBtn =  useRef();
  const unfollowBtn =  useRef();
  const search = useLocation();
  const queryParams = queryString.parse(search);
  const newQueryParams = {
    ...queryParams,
    customCateogry: label,
  };
  const categories = "Follow";
  const getColorClass = () => {
    return "bg-blue-500";
  };

  // EVENTS/HANDLERS
  const displayUnfollowBtn =  ()=>{
    unfollowBtn.current.style.display = "block"
    followingBtn.current.style.display = "none"
  }

  const hideUnfollowBtn =  ()=>{
    unfollowBtn.current.style.display = "none"
    followingBtn.current.style.display = "block"
  }

  const followTopicHandler = async ()=>{
    try{
      const res = await createFollowedTopic({topicName: label});
      if(res.data){
        cogoToast.success(res.data?.successMsg);
      }
      if(res.error){
        cogoToast.success(res.error?.data?.errorMsg);
      }
      console.log(res)
    }catch(err){
      console.log("Error occoured while creating topic", err);
    }
  }

  const unFollowTopicHandler = async ()=>{
    try{
      const res = await deleteFollowedTopic({topicName: label});
      if(res.data){
        cogoToast.success(res.data?.successMsg);
      }
      if(res.error){
        cogoToast.success(res.error?.data?.errorMsg);
      }
      console.log(res)
    }catch(err){
      console.log("Error occoured while creating topic", err);
    }
  }


  return (
    <>
      <div className="relative">
        {!isFollowing ? (
          <button
            onClick={() => followTopicHandler()}
            className="shadow-xl border border-white text-white text-sm px-3  rounded-full absolute top-[27%] left-[28%] sm:top-[30%] sm:left-[35%] z-50 hover:bg-white hover:text-black"
          >
            FOLLOW
          </button>
        ) : (
          <>
            <button
            ref={followingBtn}
              onMouseOver={displayUnfollowBtn}
              className=" border border-white bg-white text-black text-sm px-3  rounded-full absolute top-[25%] left-[25%] sm:top-[30%] sm:left-[27%] z-50"
            >
              <FontAwesomeIcon className="mr-1" icon={faCheck} />
              FOLLOWING
            </button>

            <button
              onMouseLeave={hideUnfollowBtn}
              ref={unfollowBtn}
              onClick={() => unFollowTopicHandler()}
              style={{display:"none"}}
              className="border text-sm px-3 rounded-full absolute top-[25%] left-[25%] sm:top-[30%] sm:left-[27%] z-50 bg-rose-600 text-white border-rose-600"
            >
              <FontAwesomeIcon className="mr-1" icon={faXmark} />
              UNFOLLOW
            </button>
          </>
        )}

        <Link
          to={{
            pathname: "/discover/discover_content",
            // state: { topic: label },
            search: queryString.stringify(newQueryParams),
          }}
          // to={`/discover/discover_content?category=${label}`}
          className={`nc-CardCategory4 flex flex-col ${className}`}
          // className={`nc-CardAuthorBox2 flex flex-col overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
          data-nc-id="CardCategory4"
        >
          <div
            className={`flex-shrink-0 relative w-full aspect-w-7 aspect-h-5 h-0 rounded-3xl overflow-hidden group`}
          >
            <NcImage
              src={categoryimage}
              className="object-cover w-full h-full rounded-2xl brightness-50 "
              // containerClassName="flex aspect-w-7 aspect-h-5 sm:aspect-h-6 w-full h-0"
            />

            {/* <div> */}
            {/* {/ <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> /}
            {/ <Badge name={categories} href="/" className="absolute top-0 left-0" /> /}
            {/ </button> /}
            {/ {index && ( /} */}
            {/* </div> */}
            <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
            {/* <span
          className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
        ></span> */}
          </div>

          {/* <Button>
          <Badge name={categories} className="absolute bottom-[100px] left-1 z-20" />
        </Button> */}
          <div className="flex items-center mt-4">
            <div className={`w-10 h-10 ${getColorClass()} rounded-full`}></div>
            <div className="ml-3 truncate">
              <h2
                className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </h2>
              <span
                className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400`}
              >
                {count} Articles
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CardCategory4;
