"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toggleTodo, deleteTodo, updateTodo } from "@/lib/actions"
import type { Todo } from "@/db/schema"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggle = async () => {
    setIsSubmitting(true)
    try {
      await toggleTodo(todo.id)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await deleteTodo(todo.id)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSave = async () => {
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await updateTodo(todo.id, { title: title.trim() })
      setIsEditing(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle(todo.title)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-3 py-2 group">
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        disabled={isSubmitting}
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
          todo.completed ? "bg-black border-black" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        {todo.completed && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border-gray-200 bg-white text-black text-sm h-8"
              disabled={isSubmitting}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave()
                if (e.key === "Escape") handleCancel()
              }}
              autoFocus
            />
            <Button
              onClick={handleSave}
              disabled={!title.trim() || isSubmitting}
              size="sm"
              className="bg-black hover:bg-gray-800 text-white h-8 px-3 text-xs"
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              disabled={isSubmitting}
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-black h-8 px-3 text-xs"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <span
            className={`text-sm cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-black"}`}
            onClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleDelete}
            disabled={isSubmitting}
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-red-500 h-8 w-8 p-0"
          >
            ×
          </Button>
        </div>
      )}
    </div>
  )
}
