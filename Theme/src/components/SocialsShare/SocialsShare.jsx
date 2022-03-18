import React, { FC } from "react";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

// export interface SocialsShareProps {
//   className?: string;
//   itemClass?: string;
// }

// export interface SocialType {
//   id: string;
//   name: string;
//   icon: string;
//   href: string;
// }

const socials = [
  { id: "Facebook", name: "Facebook", icon: "lab la-facebook-f", href: "#" },
  { id: "Twitter", name: "Twitter", icon: "lab la-twitter", href: "#" },
  { id: "Linkedin", name: "Linkedin", icon: "lab la-linkedin-in", href: "#" },
  { id: "Instagram", name: "Instagram", icon: "lab la-instagram", href: "#" },
];

export const SOCIALS_DATA = socials;


const SocialsShare = ({
  cardData,
  className = "grid gap-[6px]",
  itemClass = "w-7 h-7 text-base hover:bg-neutral-100",
}) => {

let socialurl = cardData.fields.url

//   const renderItem = () => {
//     return (
//       <>
//         <FacebookShareButton
//           url={socialurl}
//           className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 ${itemClass}`}
//           style={{ backgroundColor: "lightgrey", color: "#4a4ace" }}
//           title={`Share on Facebook`}
//         >
//           <i className="lab la-facebook-f"></i>
//         </FacebookShareButton>
//         <TwitterShareButton
//           url={socialurl}
//           className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 ${itemClass}`}
//           style={{ backgroundColor: "lightgrey", color: "#4a4ace" }}
//           title={`Share on Twitter`}
//         >
//           <i className="lab la-twitter"></i>
//         </TwitterShareButton>
//         <LinkedinShareButton
//           url={socialurl}
//           className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 ${itemClass}`}
//           style={{ backgroundColor: "lightgrey", color: "#4a4ace" }}
//           title={`Share on Linkedin`}
//         >
//           <i className="lab la-linkedin-in"></i>
//         </LinkedinShareButton>
//       </>
//     );
//   };

  return (
    <></>
    // <div className={`nc-SocialsShare ${className}`} data-nc-id="SocialsShare">
    //   {renderItem()}
    // </div>
  );
};

export default SocialsShare;
