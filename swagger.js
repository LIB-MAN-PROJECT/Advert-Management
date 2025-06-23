const swaggerAutogen = require("swagger-autogen");

const doc={
    info: {title: "Advertisement Management API",
    description:"A API to manage advertisements"
},
host:"https://advert-management.onrender.com",
schemes:["https"],
components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
//   security: [{ bearerAuth: [] }],
}

const outputFile= "./swagger-output.json";
const routes = ["./server.js"];

swaggerAutogen (outputFile,routes,doc);