"use client"

import { useCreateTodo } from "@/hooks/useget-todo"
import { useState } from "react"


export const TodosCreate = () => {
  const [title, setTitle] = useState("")
  const { mutate, isPending, error } = useCreateTodo()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim().length < 2) return

    mutate(
      { title },
      {
        onSuccess: () => setTitle(""), // reset only on success
      }
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a todo..."
        minLength={2}
        maxLength={200}
        disabled={isPending}
        className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isPending || title.trim().length < 2}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add"}
      </button>
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </form>
  )
}