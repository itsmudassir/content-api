const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  MultiMatchQuery,
  SearchkitSchema,
  RefinementSelectFacet,
  DateRangeFacet
} = require('@searchkit/schema')


const dotenv = require('dotenv');

dotenv.config();

const por = process.env.DEBUG_MODE;
console.log(`Your port is ${por}`);
////////////////////////
class CustomFilter {
  excludeOwnFilters = false

  constructor() { }

  getIdentifier() {
    return "CustomFilter"
  }


  getFilters(filters) {


    console.log("#####################\n");
    // console.log(filters);
    var returnedObj = filters.map((filter) => {
      return filter.value
    })

    returnedObj = returnedObj.shift()
    // console.log( returnedObj)
    var q2 = { "bool": {} };
    try {
      var returnedObjJson = JSON.parse(returnedObj);
      console.log(returnedObjJson, "post parse")

      // XXXXXXXXXXXXXXXXXXXXXXXXXXX

      let criteria = null;
      let any_keywords_list = null;
      let bodyORtitle = null;
      let must_also_keywords_list = null;
      let must_not_contains_keywords_list = null;
      let exclude_domains_list = null;
      let limit_domains_results_list= null;
      let startDate = null;
      let endDate = null;
      let language = null;
      // let engagement = null;




      returnedObjJson.forEach((item) => {

        if (item.criteria) {
          criteria = item.criteria;
        }
        if (item.bodyORtitle) {
          bodyORtitle = item.bodyORtitle;
        }
        if (item.any_keywords_list) {
          any_keywords_list = item.any_keywords_list;
        }
        if (item.must_also_keywords_list) {
          must_also_keywords_list = item.must_also_keywords_list;
        }
        if (item.must_not_contains_keywords_list) {
          must_not_contains_keywords_list = item.must_not_contains_keywords_list;
        }
        if (item.exclude_domains_list) {
          exclude_domains_list = item.exclude_domains_list;
        }
        if (item.limit_domains_results_list) {
          limit_domains_results_list = item.limit_domains_results_list;
        }

        if (item.startDate) {
          startDate = item.startDate;
        }

        if (item.endDate) {
          endDate = item.endDate;
        }
        if (item.language) {
          language = []
          language.push(item.language)
        }

        // if (item.engagement) {
        //   engagement = item.engagement;
        // }

      });

      var must_not = [];
      if (must_not_contains_keywords_list !== null) {
      for (let mustnt  in must_not_contains_keywords_list) {

        must_not.push({
          "match": {
            "title": must_not_contains_keywords_list[mustnt]
          }
        })
      }
    }
      // exclude_domains_list
      if (exclude_domains_list !== null) {
        must_not.push({
          "terms": {
            "source_domain": exclude_domains_list
          }
        })
      }

      

      var filter = [];


      if (startDate !== null && endDate !==null) {
        filter.push( { "range":
         {

          "date_download": 
          {
            "gte":startDate,
            "lte": endDate
          }
        }
        }
        )
        }
      
            
      if (language !== null) {
        filter.push({
          "terms": {
            "language": language
          }
        })
      }



      if (must_also_keywords_list !== null) {
        filter.push({
          "terms": {
            "title": must_also_keywords_list
          }
        })
      }
      limit_domains_results_list
      if (limit_domains_results_list !== null) {
        filter.push({
          "terms": {
            "source_domain": limit_domains_results_list
          }
        })
      }

      var should = [];


      if (bodyORtitle=="title"){
        if (any_keywords_list !== null) {
          should.push({
            "terms": {
              "title": any_keywords_list
            }
          })
        }

      }


      if (bodyORtitle=="body"){
        if (any_keywords_list !== null) {
          should.push({
            "terms": {
              "title": any_keywords_list
            }
          })


          should.push({
            "terms": {
              "maintext": any_keywords_list
            }
          })
        }

      }




      // var q2 = { "bool": {} };
      if (must_not.length > 0) {
        q2["bool"]["must_not"] = must_not;
      }
      if (filter.length > 0) {
        q2["bool"]["filter"] = filter;
      }
      if (should.length > 0) {
        q2["bool"]["should"] = should;
      }



     console.log("final q2     ", q2)



      // XXXXXXXXXXXXXXXXXXXXXXXXXXX
    }
    catch (err) {
      console.log(err, "error")
    }


    return q2;
  }



  // powers the appliedFilters type for all filters added
  getSelectedFilter(filterSet) {
    return {
      type: 'ValueSelectedFilter',
      id: `${this.getIdentifier()}_${filterSet.value}`,
      identifier: this.getIdentifier(),
      label: "Custom Filter",
      value: filterSet.value,
      display: "Custom"
    }
  }
}
// -----------------------
// class MustNotContainDomainsFilter {
//   excludeOwnFilters = false

//   constructor() {}

//   getIdentifier() {
//     return "MustNotContainDomainsFilter"
//   }


//   getFilters(filters) {
//     var returnedObj=filters.map((filter) => {
//       return filter.value 
//     })

//     returnedObj=returnedObj.shift() 
//     console.log( returnedObj)

//     try {
//       var returnedObjJson = JSON.parse(returnedObj);
//       console.log(returnedObjJson,"post parse")
//        }
//     catch(err) {
//       console.log(err,"error")
//     }
//     return {
//       "bool": {
//         "must_not": [
//           {
//             "terms": {
//               "source_domain": returnedObjJson.domains


//             }
//           }

//         ]

//       }
//     }
//   }



//   // powers the appliedFilters type for all filters added
//   getSelectedFilter(filterSet) {
//     return {
//       type: 'ValueSelectedFilter',
//       id: `${this.getIdentifier()}_${filterSet.value}`,
//       identifier: this.getIdentifier(),
//       label: "Must Not Contain Domains Filter",
//       value: filterSet.value,
//       display: "MustNotContainDomains"
//     }
//   }
// }
/////////////////////////////////
const searchkitConfig = {


  host: 'http://43.251.253.107:2500',
  // host: 'https://s0oskhnou6:l7y6497d4v@contentgizmo-9661164665.us-east-1.bonsaisearch.net:443',
  index: 'content_system_v3',
  hits: {
    fields: ['article_html', 'article_length', 'authors', 'category', 'date_download', 'facebook_shares', 'twitter_shares', 'date_modify', 'date_publish', 'image_url', 'language', 'maintext', 'readtime', 'source_domain', 'title', 'url']
  },
  filters: [
    // new MustNotContainDomainsFilter()
    new CustomFilter()
  ],

  sortOptions: [
    { id: 'relevance', label: "Relevance", field: [{ "_score": "desc" }], defaultOption: true },

    { id: 'facebook_shares', label: 'Facebook Shares', field: { facebook_shares: 'desc' } },
    { id: 'twitter_shares', label: 'Twitter Shares', field: { twitter_shares: 'desc' } },

    { id: 'date_download', label: 'Date Download', field: { date_download: 'desc' } },
    { id: 'total_engagement', label: 'Total Engagement', field: { total_engagement: 'desc' } }
    // { id: 'multiple_sort', label: 'Multiple sort', field: [
    //   { "post_date" : {"order" : "asc"}},
    //   "user",
    //   { "name" : "desc" },
    //   { "age" : "desc" },
    //   "_score"
    // ]},
  ],

  query: new MultiMatchQuery({ fields: ['authors', 'category', 'language', 'maintext', 'title'] }),
  facets: [

    new RefinementSelectFacet({
      field: 'authors',
      identifier: 'authors',
      label: 'authors'
    }),

    new RefinementSelectFacet({
      field: 'category',
      identifier: 'category',
      label: 'category',
      size: 200
    }),

    new DateRangeFacet({
      field: 'date_download',
      identifier: 'date_download',
      label: 'date_download'
    }),


    new RefinementSelectFacet({
      field: 'language',
      identifier: 'language',
      label: 'language',
      size: 50
    }),

  ]




}

const { typeDefs, withSearchkitResolvers, context } = SearchkitSchema({
  config: searchkitConfig, // searchkit configuration
  typeName: 'ResultSet', // base typename
  hitTypeName: 'ResultHit',
  addToQueryType: true // When true, adds a field called results to Query type
})

const combinedTypeDefs = [
  gql`
    type Query {
      root: String
    }

    type Mutation {
      root: String
    }

   
type ResultHit implements SKHit {
  id: ID!
  fields: HitFields
}

type HitFields {
  article_html: String
  article_length: String
  authors: [String]
  category: String
  date_download: String
  facebook_shares: String
  twitter_shares: String
  date_modify: String
  date_publish: String
  image_url: String
  language: String
  maintext: String
  readtime: String
  source_domain: String
  title: String
  url: String
  sentiment: String

  
}
  `,
  ...typeDefs
]

const server = new ApolloServer({
  typeDefs: combinedTypeDefs,
  resolvers: withSearchkitResolvers({}),
  context: {
    ...context
  },
  playground: true,
  introspection: true,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 5001 }, () =>
  console.log(`🚀 Server ready at http://localhost:5001${server.graphqlPath}`)
);