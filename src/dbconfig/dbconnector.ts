import { Pool } from "pg";

export default new Pool({
  max: 20,
  connectionString: "postgres://postgres:xxxx@192.168.0.100:5432/cookies",
  idleTimeoutMillis: 30000,
});
