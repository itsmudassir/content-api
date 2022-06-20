import React, { useEffect, useRef, useState } from "react";
import checkInViewIntersectionObserver from "../../utils/isInViewPortIntersectionObserver";
import moment from "moment";
import dateFormat from "dateformat";
import LoadingVideo from "../LoadingVideo/LoadingVideo";

const NcImageCardSearch = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  className = "object-cover w-full h-full",
  source_domain,
  date_download,
  ...args
}) => {
  //getting source_domain and date_download from PostFeaturedMedia

  let isMounted = false;
  const _containerRef = useRef(null);
  let _imageEl = null;

  // making a function on date_download so that we can get the time  (need to import moment and dateFormat if you want to perform the function) we also used this in Card11 component

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

  //console.log(relativeTime())

  // const darkmodeState = useAppSelector(selectDarkmodeState);

  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const _initActions = async () => {
    // set__src(placeholderImage);
    _checkInViewPort();
  };

  const _checkInViewPort = () => {
    if (!_containerRef.current) return;
    checkInViewIntersectionObserver({
      target: _containerRef.current,
      distanceFromEnd: 0,
      callback: _imageOnViewPort,
    });
  };

  const _imageOnViewPort = () => {
    if (!src) {
      <LoadingVideo />;
      return true;
    }
    _imageEl = new Image();
    if (_imageEl) {
      _imageEl.src = src;
      _imageEl.addEventListener("load", _handleImageLoaded);
    }
    return true;
  };

  const _handleImageLoaded = () => {
    if (!isMounted) return;
    setImageLoaded(true);
    set__src(src);
  };

  useEffect(() => {
    isMounted = true;
    _initActions();
    return () => {
      isMounted = false;
    };
  }, [src]);

  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <LoadingVideo />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-NcImage ${containerClassName}`}
      data-nc-id="NcImage"
      ref={_containerRef}
    >
      {/* ///Rendring source_domain and time  */}
      <span
        className="text-neutral-500 dark:text-neutral-400 font-normal"
        style={{
          height: "18px",
          width: "100%",
          backgroundColor: "#4f4f4f",
          position: "absolute",
          bottom: "1px",
          opacity: "0.8",
        }}
      >
        <p style={{ fontSize: "12px", paddingLeft: "10px", color: "#d2d2d2" }}>
          {source_domain}. {relativeTime(date_download)}
        </p>
      </span>

      {__src && imageLoaded ? (
        <img src={__src} className={className} alt={alt} {...args} />
      ) : (
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default NcImageCardSearch;
