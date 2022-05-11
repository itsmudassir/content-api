import express from "express"
import {
    createFollowedTopic,
    readAllFollowedTopic,
    deleteFollowedTopic
} from "../../../controllers/followedTopicsControllers/followedTopics.Controller.js"

const router =  express.Router();

// route:  POST /api/followedTopics/
// desc:   create a topic by authenticated user id
// access: PROTECTED
router.post("/", createFollowedTopic);


// route:  GET /api/followedTopics/
// desc:   read all topics by authenticated user id
// access: PROTECTED
router.get("/", readAllFollowedTopic);


// route:  DELETE /api/followedTopics/
// desc:   delete topic by topic id
// access: PROTECTED
router.delete("/", deleteFollowedTopic);

export default router;
