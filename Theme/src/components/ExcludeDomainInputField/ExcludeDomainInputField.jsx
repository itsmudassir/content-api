import React, { useState } from "react";
import "./excludeDomains.css";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";

const ExcludeDomainInputField = ({ getSelectedvalve }) => {
  const [input, Setinput] = useState("");

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
          // iconPosition="le"
          //   filterLabel="search"
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
            width: "100%",
          }}
          showIcon={false}
          placeholder="Enter domains that you think are giving irrelevant, e.g job, course..."
          onValueSelected={function (value, cause, source) {
            getSelectedvalve(value);
          }}
          value={input}
          onChange={(value, triggerQuery, event) => {
            Setinput(value, () => triggerQuery());
          }}
        />
      </ReactiveBase>
    </div>
  );
};

export default ExcludeDomainInputField;
