import { Hono } from "hono"
import { requireAuth } from "../middleware/auth"


const app = new Hono<{ Bindings: CloudflareBindings }>()
  .use("*", requireAuth)
  .get("/", async (c) => {
    return c.json({ message: "Hello from the test API!" })
  })
  

export default app