import express from "express"
import cors from "cors"
import errorHandler from "./utils/errorHandler.js";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow sending cookies/authorization headers
    allowedHeaders: 'Content-Type,Authorization'
};

//use middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions))


// import routes
import userRoutes from "./routes/user.routes.js"
import userextraRoutes from "./routes/userextra.routes.js"



//use routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/user",userextraRoutes)


app.use(errorHandler)



export {app}