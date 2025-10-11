import { getTodos } from "@/lib/actions"
import { TodoForm } from "@/components/todo-form"
import { TodoItem } from "@/components/todo-item"
import { isDatabaseConfigured } from "@/db"

export default async function HomePage() {
  const todos = await getTodos()
  const completed = todos.filter((todo) => todo.completed).length

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Minimal header */}
        <div className="mb-12">
          <h1 className="text-2xl font-medium text-black mb-2">Todo</h1>
          <p className="text-sm text-gray-500">
            {completed}/{todos.length} completed
          </p>
        </div>

        {/* Show setup message if database is not configured */}
        {!isDatabaseConfigured ? (
          <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-medium text-black mb-3">Setup Required</h2>
            <p className="text-sm text-gray-600 mb-4">Complete these steps to start using your todo app:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0" />
                <span className="text-gray-600">Add TURSO_DATABASE_URL environment variable</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0" />
                <span className="text-gray-600">Add TURSO_AUTH_TOKEN environment variable</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0" />
                <span className="text-gray-600">Run the database initialization script</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Add todo form - only show when database is configured */}
            <div className="mb-8">
              <TodoForm />
            </div>

            {/* Todo list */}
            <div className="space-y-1">
              {todos.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-gray-400 text-sm">No todos</p>
                </div>
              ) : (
                todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
              )}
            </div>
          </>
        )}

        {/* Added minimal footer credit */}
        <footer className="mt-16 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Built by{" "}
            <a
              href="https://x.com/jacobmparis"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              x.com/jacobmparis
            </a>{" "}
            on{" "}
            <a
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              v0.dev
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
