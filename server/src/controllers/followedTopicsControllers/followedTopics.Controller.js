import followedTopicsModel from "../../models/followedTopicsModel/followedTopics.Model.js";

// route:  POST /api/followedTopics
// desc:   create a topic by authenticated user id
// access: PROTECTED
const createFollowedTopic = async (req, res) => {
    try {
        const { topicName } = req.body;
        if(topicName == undefined){
            return res.status(400).json({ errorMsg: `Bad Request` })
        }

        // checking if topic name already exist in DB
        if (await followedTopicsModel.findOne({ topic: topicName })) {
            return res.status(400).json({ errorMsg: `Already following ${topicName}` }) // 400 for bad request
        }

        const userId = "62399ee49884a61281edd8e3";
        // const userId = req.user.id;

        // creating topic document
        const topic = new followedTopicsModel({
            userId: userId,
            topic: topicName,
        });
        await topic.save();
        return res.status(201).json({ successMsg: `Started following ${topicName}` }); //201 for created

    } catch (err) {
        console.log("ERROR OCCOURED WHILE CREATING TOPIC", err);
        res.status(500).json({ errorMsg: "Server Error" });
    }
};


// route:  GET /api/followedTopics/
// desc:   read all topics by authenticated user id
// access: PROTECTED
const readAllFollowedTopic = async (req, res) => {
    try {
        const userId = "62399ee49884a61281edd8e3";
        // const userId = req.user.id;
        const topics = await followedTopicsModel.find({ userId: userId });
        return res.status(200).send(topics);

    } catch (err) {
        console.log("ERROR OCCOURED WHILE READING TOPICS", err);
        res.status(500).json({ errorMsg: "Server Error" });
    }

};


// route:  DELETE /api/followedTopics/
// desc:   delete topic by topic id
// access: PROTECTED
const deleteFollowedTopic = async (req, res) => {
    try {

        const { topicName } = req.body;
        if(topicName == undefined){
            return res.status(400).json({ errorMsg: `Bad Request` })
        }

        const response = await followedTopicsModel.findOneAndDelete({topic: topicName})
        if (!response) {
            return res.status(400).json({ errorMsg: "Cannot Unfollow" });
        }

        return res.status(200).json({ successMsg: `${response.topic} unfollowed` });
        
    } catch (err) {
        console.log("ERROR OCCOURED WHILE DELETING TOPIC", err);
        res.status(500).json({ errorMsg: "Server Error" });
    }

};

export {
    createFollowedTopic,
    readAllFollowedTopic,
    deleteFollowedTopic
}