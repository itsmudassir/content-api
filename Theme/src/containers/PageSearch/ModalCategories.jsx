import React from "react";
import { TaxonomyType } from "../../data/types";
import CardCategory1 from "../../components/CardCategory1/CardCategory1";
import NcModal from "../../components/NcModal/NcModal";
import { gql  ,  useQuery } from '@apollo/client';
import { useSearchkitVariables, useSearchkit, withSearchkit, withSearchkitRouting } from '@searchkit/client'


export const ModalCategoriesProps = {
  categories: TaxonomyType
}

const query = gql`
query resultSet($query: String, $filters: [SKFiltersSet], $page: SKPageInput, $sortBy: String) {
  results(query: $query, filters: $filters) {
    summary {
      total
      appliedFilters {
        id
        identifier
        display
        label
        ... on DateRangeSelectedFilter {
          dateMin
          dateMax
          __typename
        }

        ... on ValueSelectedFilter {
          value
          __typename
        }
        __typename
      }
      sortOptions {
        id
        label
        __typename
      }
      query
      __typename
    }
    hits(page: $page, sortBy: $sortBy) {
      page {
        total
        totalPages
        pageNumber
        from
        size
        __typename
      }
      sortedBy

      items {
        ... on ResultHit {
          id
          fields {
  article_length
  category
  authors
  date_download
  language
  facebook_shares
  sentiment
  url 
  image_url
  twitter_shares
  maintext
  source_domain
  title
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    facets {
      identifier
      type
      label
      display
      entries {
        label
        count
        __typename
      }
      __typename
    }
    __typename
  }
}
`

const ModalCategories= () => {

  // getting guery from index file 

  const variables = useSearchkitVariables()
  const { data, error ,loading } = useQuery(query, { variables })

  
     
  if(loading ){console.log("Data is loading")}

  if(!loading){console.log(data?.results)}

  if(error){console.log("An error Occured" + error)}
  

  
 

  const renderModalContent = () => {
    //passing Data to CardCategory1 throught map
    return (
      <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
        {data ?  data?.results.facets[0].entries.map((cat) => (
          <CardCategory1 key={cat.id} taxonomy={cat}  size="normal" />
          
        )) :"Result not found" }
     
      </div>
    );
  };

  return (
    <div className="nc-ModalCategories">
    
      <NcModal
        triggerText={
          <span>
            <span className="hidden sm:inline">Actors</span> Categories
          </span>
        }
        modalTitle="List of Actors"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default withSearchkit(withSearchkitRouting(ModalCategories))
