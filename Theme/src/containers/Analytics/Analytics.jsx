import React from "react";
// import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import SectionLargeSlider from "../../components/Card1Large/SectionLargeSlider";
import Graphs from "../../components/Graphs/Graphs";
// import DonutGraph from "../../components/Graphs/DonutGraph";
import OtherGraphs from "../../components/Graphs/OtherGraphs";
import FavouriteAddFolder from "../../components/FavouriteAddFolder/FavouriteAddFolder";
const Analytics = () => {
  return (
    <>

      <FavouriteAddFolder />
      <div className="relative overflow-hidden">
        <div className="container relative ">
          {/* <BgGlassmorphism /> */}
          <SectionLargeSlider className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24 " />
        </div>

        
        <Graphs />
        
        <br />
        {/* <DonutGraph /> */}
        <br />
        <OtherGraphs />
      </div>
    </>
  );
};

export default Analytics;
