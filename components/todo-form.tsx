"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createTodo } from "@/lib/actions"

export function TodoForm() {
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await createTodo({ title: title.trim() })
      setTitle("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Add todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border-gray-200 bg-white text-black placeholder:text-gray-400 focus:border-black focus:ring-0"
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        disabled={!title.trim() || isSubmitting}
        className="bg-black hover:bg-gray-800 text-white px-4"
      >
        Add
      </Button>
    </form>
  )
}
