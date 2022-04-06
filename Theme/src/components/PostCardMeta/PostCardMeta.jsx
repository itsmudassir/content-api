import React, { FC } from "react";
import dateFormat from 'dateformat';
import moment from 'moment'
import { useState  , useEffect} from "react"
import AvatarEmoji from "../Avatar/AvatarEmoji";
import { faMeh, faSmile,faAngry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostCardMeta = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  size = "normal",
}) => {

  //getting meta from the card  component written on line 97

  var {category , date , date_download  , facebook , image_url  , date_publish,sentiment, title ,source_domain ,twitter ,language} = meta


  
 const res =  dateFormat(date_download, "mmm d, yyyy") 
   
 const formatedDate =  dateFormat(date_download, "mm/dd/yy") 




 function relativeTime(date_download) {
    try {
      let ddate = dateFormat(date_download, "isoDateTime");
      ddate = ddate.split("T");
      let datePart = ddate[0];
      let timePart = ddate[1].split("+")[0];

      return moment(datePart + " " + timePart).fromNow();
    } catch (err) {
      console.log(err);
    }
  }


 var [emoji , setEmoji] = useState(sentiment)


  
 
  
   
  function EmojiSetelment(){
    if(emoji == "POS"){
      setEmoji(<FontAwesomeIcon icon={faSmile} style={{color : "#b2adaa"}} />)
  }else if (emoji == "NEU"){
    setEmoji(<FontAwesomeIcon icon={faMeh} style={{color : "#7aca05"}} />)
  }else if (emoji == "NEG"){
    setEmoji( <FontAwesomeIcon icon={faAngry} style={{color : "#b80518"}} />)
  }
  }

  useEffect(() => {
    EmojiSetelment()
  }, [])
  


  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-base"
      } ${className}`}
      data-nc-id="PostCardMeta"
    >

  
       <div className="relative flex items-center space-x-2 ">
       <button 
      title={(sentiment == "POS") ? "Positve" :(sentiment == "NEG") ?  "Negative":(sentiment == "NEU")  ? "Neutral" : "Nothing"}
      data-nc-id="PostCardLikeAction">
        {!hiddenAvatar && (
          <AvatarEmoji
            radius="rounded-full"
            data={emoji}
            userName={category}
          />
        )}
        </button>
     

        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          Sentiment
        </span>

        </div>

      
      <>
      <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          · {res}
        </span>
        {/* <span className="text-neutral-500 dark:text-neutral-400 font-normal">
          {formatedDate}
        </span> */}
      </>
    </div>
  );
};

export default PostCardMeta;
