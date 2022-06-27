import SectionBecomeAnAuthor from "../../components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import LandingPageSection2 from "./LandingPageSection2";
import LandingPageSection3 from "./LandingPageSection3";
import LandingPageSection4 from "./LandingPageSection4";
import LandingPageSection5 from "./LandingPageSection5";
import Footer from "./Footer";

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

        {/* === SECTION 4 === */}
        <div className="relative py-10 mt-10">
          <LandingPageSection4 />
        </div>

        {/* === SECTION 5 === */}
        <div className="relative py-10 mt-10">
          <LandingPageSection5 />
        </div>
      </div>

      {/* === Footer === */}
      <Footer />
    </>
  );
};
export default LandingPage;
