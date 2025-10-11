"use server"

import { db, isDatabaseConfigured } from "@/db"
import { todos, type NewTodo } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getTodos() {
  // Return empty array if database is not configured
  if (!isDatabaseConfigured || !db) {
    return []
  }

  return await db.select().from(todos).orderBy(todos.createdAt).all()
}

export async function createTodo(data: { title: string; description?: string }) {
  // Skip if database is not configured
  if (!isDatabaseConfigured || !db) {
    return
  }

  const newTodo: NewTodo = {
    title: data.title,
    description: data.description || null,
  }

  await db.insert(todos).values(newTodo)
  revalidatePath("/")
}

export async function toggleTodo(id: number) {
  // Skip if database is not configured
  if (!isDatabaseConfigured || !db) {
    return
  }

  const todo = await db.select().from(todos).where(eq(todos.id, id)).get()

  if (todo) {
    await db
      .update(todos)
      .set({
        completed: !todo.completed,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(todos.id, id))
  }

  revalidatePath("/")
}

export async function deleteTodo(id: number) {
  // Skip if database is not configured
  if (!isDatabaseConfigured || !db) {
    return
  }

  await db.delete(todos).where(eq(todos.id, id))
  revalidatePath("/")
}

export async function updateTodo(id: number, data: { title: string; description?: string }) {
  // Skip if database is not configured
  if (!isDatabaseConfigured || !db) {
    return
  }

  await db
    .update(todos)
    .set({
      title: data.title,
      description: data.description || null,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(todos.id, id))

  revalidatePath("/")
}
