
import { client, index } from "../../config/elasticSearchConnection.js";


// route:  POST /api/insights/getInsights
// desc:   getting insights with startDate, endDate, category and customQuery
// access: PROTECTED
const getInsights = async (req, res) => {
    try {
       const {startDate, endDate, category, customQuery}=  req.body;
       if (startDate && endDate){
        var mainQuery={}
        mainQuery['size']=0;
        var aggsQuery= 
            {
            "range": {
                "date_range": {
                "field": "date_download",
                "format": "yyyy-MM-dd",
                "ranges":[ { "from": String(startDate), "to" : String(endDate) }]
                },
                "aggs": {
                    
                    
                    
                "top_keywords" : {
                        "terms" : { 
                            "field" : "article_keywords",
                            "size": 50
                        }
                    },
                    
                    
                "top_domians_by_most_articles_published": {
                        "terms": {
                        "field": "source_domain",
                        "size": 20,
                        "order": {
                            "_count": "desc"
                        }
                        },
                        
                        "aggs": {
                            "avg engagment": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            },
                            "total engagment": {
                            "sum": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    }  ,
                    
        
                "Popular Days" : {
                    "terms" : { 
                        "field" : "day_published",
                        "size": 7
                    },
                                    "aggs": {
                            "avg engagment per day": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    
                    
                },
            
                    
                    
                    "Popular Reading Levels" : {
                        "terms" : { 
                            "field" : "reading_level",
                            "size": 10
                        },
                                            "aggs": {
                            "avg engagment per Reading level": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    }
            
                        
                    ,
                    
                    
                    "popular_word_count": {
                    "range": {
                        "field": "article_length",
                        "ranges": [
                        {
                            "from": 1,
        
                            "to": 10000
                        },
                        {
                            "from": 10000,
                            "to": 20000
                        }
                        ,
                                    {
                            "from": 20000,
                            "to": 30000
                        },
                                    {
                            "from": 30000,
                            "to": 40000
                        }
                        ,
                        {"from":50000}
                        ]
                        
                    },
                        "aggs": {
                            "avg engagment per word count": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    },
                    
                    "avg_facebook_shares": {
                    "avg": {
                        "field": "facebook_shares"
                    }
                    },
                    
                    "avg_twitter_shares": {
                    "avg": {
                        "field": "twitter_shares"
                    }
                    },
                    "sum_facebook_shares": {
                    "sum": {
                        "field": "facebook_shares"
                    }
                    },
                    
                    "sum_twitter_shares": {
                    "sum": {
                        "field": "twitter_shares"
                    }
                    },
                
                    "total_engagement": {
                        "sum": {
                          "field": "total_engagement"
                        }
                      },
                      
                                          
                      "avg_engagement": {
                        "avg": {
                          "field": "total_engagement"
                        }
                      },

                    "article_per_date":
                    {
                    "date_histogram": {
                        "field": "date_download",
                        "calendar_interval": "day"
                    },
                        "aggs": {
                        "total_engagement_per_day": {
                            "avg": 
                                { 
                        "field": "total_engagement"
                                
                                }
                            
                        }
                        
                        }
                    }
                }
            }
            }

        mainQuery['aggs']=aggsQuery
        





        var categoryAndQuery=""
        var justQuery=""
        var justCategory=""
        
        if(category && customQuery){
            categoryAndQuery=       { 
            "bool": {
            "must": [
                {
                "multi_match":
                    {
                    "query": String(customQuery),
                    "fields": ["title","maintext"]
                    
                    }
                },
                { "term": {
                    "category": {
                        "value": String(category)
                    }
                }
                
                }
                ]
            }
            
            
        }

        mainQuery['query']=categoryAndQuery
        
        } 


        if(category && customQuery==undefined){
            justCategory=       { 
            "bool": {
            "must": [

                { "term": {
                    "category": {
                        "value": String(category)
                    }
                }
                
                }
                ]
            }
            
            
        }

        mainQuery['query']=justCategory

        } 



        if(category==undefined && customQuery){
            justQuery=
        {
            
            "bool": {
            "must": [

                {
                    "multi_match":
                    {
                        "query": String(customQuery),
                        "fields": ["title","maintext"]
                    
                    }
                    }
                ]
            }
            
            
        }
        mainQuery['query']=justQuery


        } 
        

    


        //    var returnedArticles=await client.search({
        //     index: index,
        //     body: {
        //         "query": {
        //           "match_all": {}
        //         }
                
        //       },
        //   });

        var returnedArticles=await client.search({
            index: index,
            body: mainQuery
        });




        //   console.log("elasticQuery ",mainQuery)

        res.status(200).json(returnedArticles)
    }   
    else{
        res.status(500).json({"errorMsg":"Please provide startData and endDate"})
 
    }
    } catch (err) {
        console.log("GET INSIGHTS ERROR", err);
        res.status(500).json({ errorMsg: "Server error" }) //500 for server error
    }

};


export {
    getInsights
};