import SectionBecomeAnAuthor from "../../components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import LandingPageSection2 from "./LandingPageSection2";
import LandingPageSection3 from "./LandingPageSection3";
const LandingPage = () => {
  return (
    <>
      <div className="container ">
        {/* === SECTION 1 === */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        {/* === SECTION 2 === */}
        <div className="relative py-16 mt-10">
          <LandingPageSection2 />
        </div>

        {/* === SECTION 3 === */}
        <div className="relative py-16 mt-10">
          <LandingPageSection3 />
        </div>
      </div>
    </>
  );
};
export default LandingPage;
