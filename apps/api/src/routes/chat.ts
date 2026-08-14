import { Hono } from "hono"
import {  requireUser } from "../middleware/auth"
import { createOpenAI } from "@ai-sdk/openai"
import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .use("*", requireUser)
  .post(
    "/",
    zValidator("json", z.object({ messages: z.array(z.any()) })),
    async (c) => {
      const { messages } = c.req.valid("json") as { messages: UIMessage[] }

      const openrouter = createOpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: c.env.OPEN_ROUTER_API_KEY,
      })

      const result = streamText({
        model: openrouter("cohere/north-mini-code:free"),
        system: "You are a helpful assistant.",
        messages: await convertToModelMessages(messages),
      })

      return result.toUIMessageStreamResponse()
    }
  )

export default app