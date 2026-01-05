const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Gym Platform API",
    version: "1.0.0",
    description: "API documentation for Gym Management Platform",
  },
  servers: [
    {
      url: "http://localhost:5001",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // where Swagger will read comments
};

module.exports = swaggerJSDoc(options);
