import { validationResult } from "express-validator";
import customTopicSearchModel from "../../models/customTopicSearchModel/customTopicSearch.Model.js"
import { getByCustomTopics } from "../../services/customTopicSearchServices/customTopicSearch.Service.js"

// EXPORTS >>
export {
    updateCustomTopic,
    deleteCustomTopic,
    getCustomTopics,
    getCustomTopic,
    createCustomTopic,
    getContentByCustomTopic,
    getContentByCustomTopic2
};
import { client, index } from "../../config/elasticSearchConnection.js";



// ROUTES >>

//route: POST api/customTopicSearch/createcustomtopic
//desc:  creating a custom topic by user id.
// access: PROTECTED 
const createCustomTopic = async (req, res) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).json(validationErrors.array()[0]);
        }

        const topicsFields = {};
        topicsFields.selection = {};
        topicsFields.filters = {};

        // topicsFields.userId = req.user.id;
        topicsFields.userId = "622a0c7b24abda1ef66718c7";

        if (req.body.name != undefined) {
            topicsFields.name = req.body.name;
        }

        if (req.body.match_type != undefined) {
            topicsFields.selection.match_type = req.body.match_type;
        }


        if (req.body.sources != undefined) {
            topicsFields.selection.sources = req.body.sources; // ignore for now
        }

        if (req.body.any_keywords != undefined) {
            topicsFields.selection.any_keywords = req.body.any_keywords;
        }


        if (req.body.must_also_keywords != undefined) {
            topicsFields.selection.must_also_keywords = req.body.must_also_keywords;
        }


        if (req.body.must_not_contains_keywords != undefined) {
            topicsFields.selection.must_not_contains_keywords =
                req.body.must_not_contains_keywords;
        }

        if (req.body.include_domains != undefined) {
            topicsFields.selection.include_domains = req.body.include_domains;
        }

        if (req.body.exclude_domains != undefined) {
            topicsFields.selection.exclude_domains = req.body.exclude_domains;
        }

        if (req.body.limit_domains_results != undefined) {
            topicsFields.selection.limit_domains_results =
                req.body.limit_domains_results;
        }

        if (req.body.type != undefined) topicsFields.filters.type = req.body.type; // ignore for now
        if (req.body.sort != undefined) topicsFields.filters.sort = req.body.sort; // ignore for now
        if (req.body.enddate != undefined) topicsFields.filters.enddate = req.body.enddate;
        if (req.body.startdate != undefined) topicsFields.filters.startdate = req.body.startdate;
        if (req.body.language != undefined) topicsFields.filters.language = req.body.language;
        if (req.body.engagement != undefined) topicsFields.filters.engagement = req.body.engagement; // ignore for now


        try {
            const newCustomTopic = new customTopicSearchModel(topicsFields);
            const result = await newCustomTopic.save();
            console.log(result)
            res.status(201).json({ successMsg: "Topic created successfully" });

        } catch (err) {
            res.status(500).json({ errorMsg: "Server Error" });
            console.log("ERROR OCCOURED WHILE CREATING A CUSTOM TOPIC", err);
        }

    } catch (err) {
        return res.status(500).json({ errorMsg: err.message });
        console.log("ERROR OCCOURED WHILE CREATING A CUSTOM TOPIC", err);
    }

};


// route:  GET api/customTopicSearch/getcustomtopic/:id
// desc:   reading a custom topic by topic id.
// access: PROTECTED
const getCustomTopic = async (req, res) => {
    try {
        const customTopic = await customTopicSearchModel.findById(req.params.id);

        if (!customTopic) {
            return res.status(404).json({ errorMsg: "topic not found" });
        }

        return res.status(200).json(customTopic)


    } catch (err) {
        return res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE READING A CUSTOM TOPIC", err);
    }
};








//route:  GET api/customTopicSearch/getcustomtopics
//desc:   reading all custom topics by user id.
//access: PROTECTED
const getCustomTopics = async (req, res) => {

    try {
        // const userId = req.user.id;
        const userId = "622a0c7b24abda1ef66718c7";

        const customTopics = await customTopicSearchModel.find({ userId: userId }).cache({
            key: userId
        });

        if (customTopics.length == 0) {
            return res.status(404).json({ errorMsg: "topics not found" });
        }

        return res.status(200).json(customTopics);

    } catch (err) {
        res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE READING CUSTOM TOPICs", err);
    }

};



//route: DELETE api/customTopicSearch/deletecustomtopic/:id
//desc:  deleting a custom topic by topic id.
//access: PROTECTED
const deleteCustomTopic = async (req, res) => {
    try {
        await customTopicSearchModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({ successMsg: "Topic deleted successfully." });
    } catch (err) {
        return res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE DELETING CUSTOM TOPIC", err);
    }
};



//route: PATCH api/customTopicSearch/updatecustomtopic/:id
//desc:  updating a custom topic by topic id.
//access: PROTECTED
const updateCustomTopic = async (req, res) => {
    try {

        const topicsFields = {};
        topicsFields.selection = {};
        topicsFields.filters = {};

        if (req.body.name != undefined) {
            topicsFields.name = req.body.name;
        }

        if (req.body.match_type)
            topicsFields.selection.match_type = req.body.match_type;
        if (req.body.sources) topicsFields.selection.sources = req.body.sources;

        if (req.body.any_keywords != undefined) {
            topicsFields.selection.any_keywords = req.body.any_keywords;
        }

        if (req.body.must_also_keywords != undefined) {
            topicsFields.selection.must_also_keywords = req.body.must_also_keywords;
        }

        if (req.body.must_not_contains_keywords != undefined) {
            topicsFields.selection.must_not_contains_keywords =
                req.body.must_not_contains_keywords;
        }

        if (req.body.include_domains != undefined) {
            topicsFields.selection.include_domains = req.body.include_domains;
        }

        if (req.body.exclude_domains != undefined) {
            topicsFields.selection.exclude_domains = req.body.exclude_domains;
        }

        if (req.body.limit_domains_results != undefined) {
            topicsFields.selection.limit_domains_results =
                req.body.limit_domains_results;
        }

        if (req.body.type != undefined) topicsFields.filters.type = req.body.type;
        if (req.body.sort != undefined) topicsFields.filters.sort = req.body.sort;
        if (req.body.enddate != undefined) topicsFields.filters.enddate = req.body.enddate;
        if (req.body.startdate != undefined) topicsFields.filters.startdate = req.body.startdate;
        if (req.body.language != undefined) topicsFields.filters.language = req.body.language;
        if (req.body.engagement != undefined) topicsFields.filters.engagement = req.body.engagement;

        try {
            await customTopicSearchModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: topicsFields }
            );
            res.status(200).json({ successMsg: "Edited successfully" });

        } catch (err) {
            res.status(500).json({ errorMsg: "Server Error" });
            console.log("ERROR OCCOURED WHILE UPDATING CUSTOM TOPIC", err);
        }
    } catch (err) {
        return res.status(500).json({ errorMsg: "Server Error" });
        console.log("ERROR OCCOURED WHILE UPDATING CUSTOM TOPIC", err);
    }
};


// route:  /api/customTopicSearch/:id/:offset 
// desc:   reading data from elastic_search by getting query from customTopicsSearch.model by topic id
//access: PROTECTED  
const getContentByCustomTopic = async (req, res) => {
    try {
        const topic = await customTopicSearchModel.findById(req.params.id)
        if (!topic) {
            return res.status(404).json({ errorMsg: "Topic Not Found" });
        }
        const data = await getByCustomTopics(topic, req.params.offset); // elastic search query function
        return res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ errorMsg: "Server Error" });
        console.log(err.message);
        console.log("ERROR OCCOURED WHILE FETCHING DATA FROM ELASTIC SEARCH", err);
    }
};


// route:  POST /api/getContentByCustomTopic2/ 
// desc:   reading data from elastic_search by getting query from customTopicsSearch.model by topic id
//access: PROTECTED  
const getContentByCustomTopic2 = async (req, res) => {
    try {
        const { startDate, endDate, category, customQuery } = req.body;
        if (startDate && endDate) {
            var mainQuery = {}
            mainQuery['size'] = 0;
            var aggsQuery =
            {
                "range": {
                    "date_range": {
                        "field": "date_download",
                        "format": "yyyy-MM-dd",
                        "ranges": [{ "from": String(startDate), "to": String(endDate) }]
                    },
                    "aggs": {



                        "top_keywords": {
                            "terms": {
                                "field": "article_keywords",
                                "size": 50
                            }
                        },


                        "top_authors_by_most_articles_published": {
                            "terms": {
                                "field": "authors",
                                "size": 50,
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
                        },


                        "Popular Days": {
                            "terms": {
                                "field": "day_published",
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



                        "Popular Reading Levels": {
                            "terms": {
                                "field": "reading_level",
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
                                    { "from": 50000 }
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

            mainQuery['aggs'] = aggsQuery






            var categoryAndQuery = ""
            var justQuery = ""
            var justCategory = ""

            if (category && customQuery) {
                categoryAndQuery = {
                    "bool": {
                        "must": [
                            {
                                "multi_match":
                                {
                                    "query": String(customQuery),
                                    "fields": ["title", "maintext"]

                                }
                            },
                            {
                                "term": {
                                    "category": {
                                        "value": String(category)
                                    }
                                }

                            }
                        ]
                    }


                }

                mainQuery['query'] = categoryAndQuery

            }


            if (category && customQuery == undefined) {
                justCategory = {
                    "bool": {
                        "must": [

                            {
                                "term": {
                                    "category": {
                                        "value": String(category)
                                    }
                                }

                            }
                        ]
                    }


                }

                mainQuery['query'] = justCategory

            }



            if (category == undefined && customQuery) {
                justQuery =
                {

                    "bool": {
                        "must": [

                            {
                                "multi_match":
                                {
                                    "query": String(customQuery),
                                    "fields": ["title", "maintext"]

                                }
                            }
                        ]
                    }


                }
                mainQuery['query'] = justQuery


            }





            //    var returnedArticles=await client.search({
            //     index: index,
            //     body: {
            //         "query": {
            //           "match_all": {}
            //         }

            //       },
            //   });

            var returnedArticles = await client.search({
                index: index,
                body: mainQuery
            });




            //   console.log("elasticQuery ",mainQuery)

            res.status(200).json(returnedArticles)
        }
        else {
            res.status(500).json({ "errorMsg": "Please provide startData and endDate" })

        }
    } catch (err) {
        console.log("GET INSIGHTS ERROR", err);
        res.status(500).json({ errorMsg: "Server error" }) //500 for server error
    }
};



