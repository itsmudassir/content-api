


// route:  POST /api/insights/getInsights
// desc:   getting insights with startDate, endDate, category and customQuery
// access: PROTECTED
const getInsights = async (req, res) => {

    try {
       const {startDate, endDate, category, customQuery}=  req.body;

       res.status(200).json({startDate, endDate, category, customQuery})
    } catch (err) {
        console.log("GET INSIGHTS ERROR", err);
        res.status(500).json({ errorMsg: "Server error" }) //500 for server error
    }

};


export {
    getInsights
};