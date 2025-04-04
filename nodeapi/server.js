const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");

const mongooseURI = require("./config/keys").mongoURI;
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(process.cwd(), "/client/dist/client/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/client/dist/client/index.html"));
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/shop", shopRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Internal Server Error:".red, err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

// MongoDB Connection
mongoose
  .connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => {
      console.log("✅ Server running on port".magenta, colors.yellow(port));
      console.log("\n🔗 Connected to".magenta, "E-MART".cyan, "database".magenta);
    });

    // Handle process termination properly
    process.on("SIGINT", () => {
      console.log("\n🛑 Server shutting down...".red);
      server.close(() => {
        console.log("🛑 Server stopped".red);
        process.exit(0);
      });
    });

    process.on("unhandledRejection", (err) => {
      console.error("🚨 Unhandled Rejection:".red, err.message);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to database:".red, err);
  });
