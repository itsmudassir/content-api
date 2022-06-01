import React, { useState } from "react";
import "./searchbox.css";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { useSearchkit } from "@searchkit/client";

const SBox = ({ pageType, category }) => {
  const [input, Setinput] = useState("");
  const history = useHistory();
  const api = useSearchkit();

  return (
    <div>
      <ReactiveBase
        app="content_system_v3"
        //   url="http://localhost:7777"
        url="http://localhost:5001/graphql"
      >
        <DataSearch
          className="datasearch"
          dataField={["title"]}
          autosuggest={true}
          defaultSuggestions={[
            { label: "Songwriting", value: "Songwriting" },
            { label: "Musicians", value: "Musicians" },
          ]}
          highlight={true}
          showClear={true}
          componentId="searchbox"
          URLParams={false}
          enableRecentSearches={true}
          recentSuggestionsConfig={{
            size: 3,
            minHits: 2,
            index: "good-books-ds",
          }}
          enablePopularSuggestions={true}
          popularSuggestionsConfig={{
            size: 3,
            minChars: 2,
            index: "good-books-ds",
          }}
          iconPosition="left"
          filterLabel="search"
          loading={true}
          innerClass={{
            input: "searchbox",
            list: "suggestionlist",
          }}
          clearIcon={
            <img
              src="https://img.icons8.com/material-two-tone/24/000000/delete-sign.png"
              height="15px"
              width="15px"
            />
          }
          size={5}
          style={{
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingBottom: "6px",
            width: "45%",
            marginLeft: "28%",
          }}
          onValueSelected={function (value, cause, source) {
            console.log("current value: ", value);
            
            const currentQueryParams = queryString.parse(window.location.search);
            const newQueryParams = {
              ...currentQueryParams,
              customQuery: value
            }
            history.push({
              pathname: "/discover/discover_search",
              search: queryString.stringify(newQueryParams),
            });
           }}
          value={input}
          onChange={(value, triggerQuery, event) => {
            Setinput(
              value,
              () => triggerQuery()
            );
          }}
        />
      </ReactiveBase>
    </div>
  );
};

export default SBox;
