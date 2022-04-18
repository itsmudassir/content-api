import React, { useState } from "react";
import {
  SearchBox,
  SearchComponent,
  SearchBase,
} from "@appbaseio/react-searchbox";

import "./SearchBoxMain.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { useSearchkit } from "@searchkit/client";

// export class SearchBoxMain extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: "",
//     };
//   }
const SearchBoxMain = ({ pageType , category}) => {
  // const [query, setQuery] = useSearchkitQueryValue()
  const [name, setName] = useState("");
  const history = useHistory();

  const handleNameInput = (e) => {
    setName(e.target);
    // setQuery(e.target);
  };

  const api = useSearchkit();

  return (
    <div>
      <SearchBase
        index="good-books-ds"
        credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
        url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
        appbaseConfig={{
          recordAnalytics: true,
          enableQueryRules: false,
          userId: "jon@appbase.io",
          customEvents: {
            platform: "ios",
            device: "iphoneX",
          },
        }}
      >
        <SearchBox
          highlight={true}
          defaultSuggestions={[
            {
              label: "Songwriting",
              value: "Songwriting",
            },
            {
              label: "Musicians",
            },
          ]}
          enablePopularSuggestions={true}
          popularSuggestionsConfig={{
            size: 3,
            minChars: 2,
            index: "good-books-ds",
          }}
          enableRecentSuggestions={true}
          recentSuggestionsConfig={{
            size: 3,
            minHits: 2,
            index: "good-books-ds",
          }}
          distinctField="original_title.keyword"
          placeholder="Search for Books"
          expandSuggestionsContainer={false}
          showClear={true}
          addonBefore={false}
          showIcon={true}
          icon={
            <img
              src="https://img.icons8.com/ios/50/000000/search--v1.png"
              height="20px"
              width="20px"
              fill="#0000ff"
              color="blue"
            />
          }
          // addonBefore={
          //   <img
          //     src="https://img.icons8.com/ios/50/000000/search--v1.png"
          //     height="10px"
          //     width="10px"
          //   />
          // }
          clearIcon={
            <img
              src="https://img.icons8.com/material-two-tone/24/000000/delete-sign.png"
              height="15px"
              width="15px"
            />
          }
          iconPosition={"left"}
          innerClass={{
            input: "InputBox",
            list: "ListDropDown",
          }}
          // className="css-41txtf-IconWrapper"
          loading={true}
          id="search-component"
          dataField={[
            {
              field: "original_title",
              weight: 1,
            },
            {
              field: "original_title.search",
              weight: 3,
            },
          ]}
          onChange={handleNameInput}
          value={name}
          // value={query}
          // value={this.state.text}
          // onChange={(value, searchComponent, e) => {
          //   // Perform actions after updating the value
          //   this.setState(
          //     {
          //       text: value,
          //     },
          //     () => {
          //       // to fetch the suggestions
          //       // searchComponent.triggerDefaultQuery();
          //       // To update results
          //       // searchComponent.triggerCustomQuery();
          //     }
          //   );
          // }}
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            width: "45%",
            marginLeft: "28%",
          }}
          // beforeValueChange={
          //     function(value) {
          //     // called before the value is set
          //     // returns a promise
          //     return new Promise((resolve, reject) => {
          //         // update state or component props
          //         resolve()
          //         // or reject()
          //     })
          //     }
          // }
          // onValueChange={
          //     function(value) {
          //     console.log("current value: ", value)
          //     // set the state
          //     // use the value with other js code
          //     }
          // }
          onValueSelected={function (value, cause, source) {
            if (pageType == "searchpage") {
              // setQuery(value)
              const customState = {
                query: value,
                sortBy: "",
                filters: [
                  {
                    //make dateMin, dateMax with moment js of last 3 months. 
                    identifier: "date_download",
                    dateMin: "2022-01-16",
                    dateMax: "2022-09-18",
                  },
                  { identifier: "category", value: category },
                ],
                page: {
                  size: 20,
                  from: 0,
                },
              };

              api.setSearchState(customState);
              api.search();
            }

            if (pageType == "categorypage") {
              const queryParams = queryString.parse(window.location.search);
              console.log("XXXXXXXXXX", queryParams);
              const newQueryParams = {
                ...queryParams,
                query: value,
              };

              history.push({
                pathname: "/discover/discover_content",
                // state: { query: value },
                search: queryString.stringify(newQueryParams),
              });
            }

            // history.push(`/discover/discover_content?query=${value}`);

            // console.log("current value: ", value);
          }}
          // onQueryChange={
          //     function(prevQuery, nextQuery) {
          //     // use the query with other js code
          //     console.log('prevQuery', prevQuery);
          //     console.log('nextQuery', nextQuery);
          //     }
          // }
        />
        <SearchComponent
          id="result-component"
          highlight
          dataField="original_title"
          size={10}
          react={{
            and: ["search-component"],
          }}
        >
          {({ results, loading, size, setValue, setFrom }) => {
            // console.log(this.state.text)
            return (
              <div className="result-list-container">
                {loading ? (
                  <div>Loading Results ...</div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!results.data.length ? (
                      <div>No results found {name}</div>
                    ) : (
                      <p>
                        {results.numberOfResults} results found in{" "}
                        {results.time}
                        ms
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          }}
        </SearchComponent>
      </SearchBase>
    </div>
  );
};

export default SearchBoxMain;
