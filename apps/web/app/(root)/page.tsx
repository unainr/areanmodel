import { TodosCreate } from "@/components/todo"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <TodosCreate />
    </div>
  )
}
