/* eslint-disable no-console */
import { Server } from "http";
import app from "./app.js";
import mongoose from "mongoose";
import { envVars } from "./app/config/env.js";

let server: Server;
const PORT = 5000;

const startServer = async () => {
    try {
   await mongoose.connect(envVars.DB_URL) 
  
    console.log("Connect with Database..!");

   server = app.listen(PORT, () => {
      console.log(`Server is running at port:${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer()


//Unhandle error rejection:
//Uncaught error:
//Signal termination or sigterm:

process.on("SIGTERM", ()=>{
    console.log("Sigterm signal receive..!! Server shutting down");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("SIGINT", ()=>{
    console.log("Sigint signal receive..!! Server shutting down");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("unhandledRejection", ()=>{
    console.log("Unhandle Rejection Detection..!! Server shutting down");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("uncaughtException", (error)=>{
    console.log("Unhandle Exception Detection..!! Server shutting down", error);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

// throw new Error("I fotgot to handle this local error")
// Promise.reject(new Error("I forgot to something"))

