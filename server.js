const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerdocument = require("./swagger-output.json")

// Route files
const authRoutes = require("./routes/authRoutes");
const advertRoutes = require("./routes/advertRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/adverts", advertRoutes);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerdocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});