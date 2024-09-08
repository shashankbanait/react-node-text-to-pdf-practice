const cors = require('cors');
const express = require("express");
const app = express();
const PORT = 5000;

app.use(cors()); // Add this line to enable CORS
app.use(express.json());

const { swaggerUi, swaggerSpec } = require('./swagger');
const tableData = require("./data");
const hostelersData = require("./hostelersData");

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define a simple GET endpoint
/**
 * @openapi
 * /:
 *   get:
 *     summary: Returns a message
 *     responses:
 *       200:
 *         description: A message that says "This is a GET request"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This is a GET request
 */
app.get("/", (req, res) => {
    res.json({ message: "This is a GET request" });
});

app.get("/users", (req, res)=>{
    res.json(tableData);
});

app.get("/hostelersData", (req, res)=>{
    res.json(hostelersData);
})


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
