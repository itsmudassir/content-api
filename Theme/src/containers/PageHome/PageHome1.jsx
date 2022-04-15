import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SectionSliderNewCategories from "../../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import PageSearch from "../../containers/PageSearch/PageSearch";
import { Tab } from "@headlessui/react";
import { useRouteMatch, Route, useHistory, Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PageHome1 = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();

//   useEffect(()=>history.push(`${url}/discover_search`),[]);

  // const [searchQuery, setsearchQuery]=  usesstate("");
  //

  // range: () => ({
  //     startDate: moment().endOf("day").toDate(),
  //     endDate: moment().subtract(3,'months').endOf("day").toDate()
  //   })
  // use moment js library to get today Date and 3 months date
  // the format should look like year-month-day
  //  take date fromat help from search kit react small project
  //-----------------
  // create a useEffect
  // dependendy: [searchQuery]
  // with searchkit api set the date filter
  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>Home || Blog Magazine React Template</title>
      </Helmet>
      {/* {/ Call the  Auto Complete Search Box /} */}

      {/* // just pass loading prop no ternary here */}
      {/* use not loading ternary to show search box */}
      {/* pass state var setsearchQuery as a prop */}
      <SearchBoxMain pageType="categorypage" />
      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

      <div className=" w-full px-2 py-5 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex justify-center items-center p-1 space-x-1  rounded-xl">
            <Link to={`${url}/discover_search`}>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-40 py-2.5 text-sm leading-5 font-medium  rounded-xl",
                    "",
                    selected
                      ? "bg-slate-700 text-white"
                      : "text-black bg-gray-200 hover:text-black"
                  )
                }
                // onClick={()=> history.push(`${url}/discover_search`)}
                // onClick={() => console.log("XXXXXXXXXX")}
              >
                Content Feed
              </Tab>
            </Link>

            <Link to={`${url}/discover_insights`}>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-40 py-2.5 text-sm leading-5 font-medium  rounded-xl",
                    "",
                    selected
                      ? "bg-slate-700 text-white"
                      : "text-black bg-gray-200 hover:text-black"
                  )
                }
              >
                Insights
              </Tab>
            </Link>

            <Link to={`${url}/discover_category`}>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-40 py-2.5 text-sm leading-5 font-medium  rounded-xl",
                    "",
                    selected
                      ? "bg-slate-700 text-white"
                      : "text-black bg-gray-200 hover:text-black"
                  )
                }
              >
                Topics
              </Tab>
            </Link>
          </Tab.List>

          <div className="flex justify-center">
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                {/* <PageSearch searchkitObj={data ,Loading, error}/>  */}
                <Route  path={`${path}/discover_search`}>
                  <PageSearch />
                </Route>
              </Tab.Panel>

              <Tab.Panel>
                <Route  path={`${path}/discover_insights`}>
                  <h1>Tab 2</h1>
                </Route>
              </Tab.Panel>

              <Tab.Panel>
                <Route  path={`${path}/discover_category`}>
                  <h1>Tab 3</h1>
                </Route>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>

      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
    </div>
  );
};

export default PageHome1;
