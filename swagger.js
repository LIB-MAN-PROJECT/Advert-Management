const swaggerAutogen = require("swagger-autogen");

const doc={
    info: {title: "Advertisement Management API",
    description:"A API to manage advertisements"
},
host:"http://localhost:3000",
schemes:["http"],
}

const outputFile= "./swagger-output.json";
const routes = ["./server.js"];

swaggerAutogen (outputFile,routes,doc);