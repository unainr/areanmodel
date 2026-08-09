import { Hono } from "hono"
import { cors } from "hono/cors"
import { clerkMiddleware } from "@clerk/hono"
import test from "./modules/test"


const app = new Hono<{ Bindings: CloudflareBindings }>()
 .use("*", (c, next) =>
    cors({
      origin: c.env.WEB_URL,
      credentials: true,
    })(c, next)
  )
  .use("*", (c, next) =>
    clerkMiddleware({
      publishableKey: c.env.CLERK_PUBLISHABLE_KEY,
      secretKey: c.env.CLERK_SECRET_KEY,
    })(c, next)
  )

const routes = app.route("/test",test)
export type AppType = typeof routes
export default app
