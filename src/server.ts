import app from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

connectDatabase().then(() => {
  app.listen(env.PORT, () =>
    console.log(`Server running on port ${env.PORT}`)
  );
});
