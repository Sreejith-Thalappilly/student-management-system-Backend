import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management System API",
      version: "1.0.0",
      description: "API documentation for Student Management System",
    },
 servers: [
  {
    url: "https://student-management-system-backend-code-tp4p.onrender.com",
    description: "Production server"
  },
  {
    url: "http://localhost:5000",
    description: "Local server"
  }
],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["src/modules/**/*.ts"], // where we write Swagger comments
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
