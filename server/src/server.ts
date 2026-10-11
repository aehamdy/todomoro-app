import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/database.js";

const PORT = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ✅`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start server 💥:", error);
  process.exit(1);
});
