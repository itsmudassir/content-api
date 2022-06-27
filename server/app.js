import 'dotenv/config';
import express from "express";
import connectDatabase from "./src/config/databaseConnection.js";
import { checkConnection } from "./src/config/elasticSearchConnection.js";
import user from "./src/routes/api/userRoutes/user.Route.js";
import insights from "./src/routes/api/insights/insights.Route.js"
import favouritesFolder from "./src/routes/api/addToFavouriteRoutes/favouritesFolder.Route.js";
import favouritePosts from "./src/routes/api/addToFavouriteRoutes/favouritePost.Route.js";
import articleSearch from "./src/routes/api/articleSearchRoutes/articleSearch.Routes.js";
import customTopicSearch from "./src/routes/api/customTopicSearchRoutes/customTopicSearch.Route.js";
import followedTopics from "./src/routes/api/followedTopicsRoutes/followedTopics.Routes.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { server } from "./src/GQL_SearchKit/gqlSearchkit.js";

// cache
import { clearHash } from "./src/controllers/cachingControllers/redis.Controller.js";

const port = process.env.PORT || 7777;

const app = express();

app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// server.applyMiddleware({ app });

// database connections
connectDatabase();
// checkConnection();



// api routes
app.use(express.json());
app.use("/api/user", user);
app.use("/api/favouritesFolder", favouritesFolder);
app.use("/api/favouritePosts", favouritePosts);
app.use("/api/articleSearch", articleSearch);
app.use("/api/customTopicSearch", customTopicSearch);
app.use("/api/insights", insights);
app.use("/api/followedTopics", followedTopics);
app.get("/saad", (req, res)=>{
    res.send("SAAD")
})

// error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port# ${port}`);
  console.log(`http://localhost:${port}`);
}
);
