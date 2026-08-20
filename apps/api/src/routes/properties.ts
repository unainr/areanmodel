import { Hono } from "hono"
import { requireUser } from "../middleware/auth"
import { createOpenAI } from "@ai-sdk/openai"
import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { getDb } from "../db"
import { todos } from "../db/schema"

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .use("*", requireUser)
  .post(
    "/",
    requireUser,
    zValidator(
      "json",
      z.object({
        title: z.string().max(200).min(2),
      })
    ),
    async (c) => {
      const { title } = c.req.valid("json")
      const userId = c.get("userId")
      const db = getDb(c.env.DATABASE_URL)
      const result = await db
        .insert(todos)
        .values({
          title,
          userId,
        })
        .returning()
      return c.json(result)
    }
  )

export default app
