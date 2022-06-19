import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "react-scroll-to-top";

const ScrollToTopButton = () => {
  return (
    <ScrollToTop
      smooth
      component={<FontAwesomeIcon icon={faChevronUp} className="text-white" />}
      style={{
        background: "#761cca",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "40px",
      }}
    />
  );
};
export default ScrollToTopButton;
