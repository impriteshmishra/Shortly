import express from "express"
import dotenv from "dotenv";
import connectDB from "./src/config/dbConnect.config.js";
import urlRoute from "./src/routes/urlRoute.js"
import { redirectFromShortUrl } from "./src/controllers/url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";

const app = express();

dotenv.config({});

app.use(express.json()); //Parses incoming requests with JSON payloads. This is commonly used in APIs.
app.use(express.urlencoded({ extended: true })); //Parses incoming requests with URL-encoded payloads, like the ones sent via HTML forms (application/x-www-form-urlencoded).

// creating short url api
app.use("/api/v1/create", urlRoute);

// redirection api
app.get("/:id", redirectFromShortUrl );

//Using error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server running on http://localhost:3500");
})