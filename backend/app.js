import express from "express"
import dotenv from "dotenv";
import connectDB from "./src/config/dbConnect.config.js";
import urlRoute from "./src/routes/url.Route.js"
import qrRoute from "./src/routes/qr.Route.js"
import authRoute from "./src/routes/auth.Route.js"
import userRoute from "./src/routes/user.Route.js"
import webhookRoute from "./src/routes/webhook.route.js"
import {redirectFromShortUrl } from "./src/controllers/url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

dotenv.config({});

const __dirname = path.resolve();

const corsOptions = {
    origin: process.env.URL_FRONTEND,
    credentials: true
}
app.use(cors(corsOptions));

// stripe webhook above the express.json because webhook require raw
app.use("/webhook", webhookRoute );

app.use(express.json()); //Parses incoming requests with JSON payloads. This is commonly used in APIs.
app.use(express.urlencoded({ extended: true })); //Parses incoming requests with URL-encoded payloads, like the ones sent via HTML forms (application/x-www-form-urlencoded).
app.use(cookieParser());

app.use(attachUser);


// app.get("/", (req, res) => {
//     res.send({
//         message : "Server is ruuning.",
//         success:true
//     });
// });



//APIs
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/url", urlRoute); 
app.use("/api/v1/qr", qrRoute);
app.use("/api/v1/user", userRoute)

app.get("/s/:id", redirectFromShortUrl ); // redirection api



//! For deployement
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.use((req,res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))  //path to get frontend
})


//Using error handler
app.use(errorHandler); //! We have to setup this more efficiently

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server running on ${process.env.APP_URL}`);
})


//! One more thing is that i am going to use WrapAsync to make easy to implement the async