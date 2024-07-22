import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
dotenv.config();

const { PORT, NODE_ENV, PROD_URL } = process.env;

const servers = [
  {
    url: NODE_ENV === 'production' ? PROD_URL : `http://localhost:${PORT}`,
    description: NODE_ENV === 'production' ? "Production Server" : "Development Server",
  },
];


const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Worklance API",
    version: "1.0.0",
    description: "API documentation for Our Amazing Gigs"
  },
  servers,
  components: {
    schemas: {
      RegistrationData: {
        type: "object",
        properties: {
          username: {
            required: true,
            type: 'string',
          },
          password: {
            type: "string"
          }
        }
      },
      SuccessData: {
        type: 'object',
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string"
          },
          data: {
            type: "object",
            properties: {
              username: {
                type: "string",
              },
              password: {
                type: "string"
              }
            },
          },
        }
      },
      FailureData: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
            required: true,
          },
          data: {
            type: null,
          },

        }
      }
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      }
    }
  },
  security: [
    {
      "BearerAuth": []
    }
  ],
  paths: {
    "/api/v1/users": {
      post: {
        summary: 'Create a user',
        tags: ["Users"],
        requestBody: {
          required: true,
          description: "User data",
          content: {
            "application/json": {
              schema: {
                $ref: "config/pet.schema.json#/definitions/Pet"
              },
            }
          }
        },
        responses: {
          200: {
            description: "Registration successful",
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/schemas/SuccessData'
                }
              }
            }
          },
          403: {
            description: "Registration failed",
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/schemas/FailureData'
                }
              }
            },
          }
        }
      }
    },
  },

};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/**/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;