import { Hono } from "hono"
import {  requireUser } from "../middleware/auth"
import { createOpenAI } from "@ai-sdk/openai"
import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .use("*", requireUser)
  .get("/",async (c)=>{
    return c.json({message:"Hello from the chat route!"})
  })

export default app