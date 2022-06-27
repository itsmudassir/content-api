import Heading from "../../components/Heading/Heading";
import image from "../../images/discover-main.png" 

const LandingPageSection2 = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center">
        <p className="font-semibold text-2xl md:text-3xl text-center  md:w-[85%]">
          A discovery engine to help you with content curation and influencer
          outreach
        </p>
        <p className="text-neutral-500 text-sm  text-center  md:w-[80%] lg:w-[60%] mt-5">
          Create a steady stream of high-performing content with our curated
          topics library. Search or add your favorite RSS feeds and never run
          out of stuff to publish.
        </p>
        <img className="mt-5 lg:w-[80%]" src={image} alt="discover image" />
      </div>
    </>
  );
};

export default LandingPageSection2;
