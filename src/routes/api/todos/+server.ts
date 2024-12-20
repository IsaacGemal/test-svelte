import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const todos = await db.select().from(todo).orderBy(todo.createdAt);
	return json(todos);
};

export const POST: RequestHandler = async ({ request }) => {
	const { content, priority } = await request.json();
	const [newTodo] = await db.insert(todo).values({ content, priority }).returning();
	return json(newTodo);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { id, completed } = await request.json();
	const [updatedTodo] = await db.update(todo).set({ completed }).where(eq(todo.id, id)).returning();
	return json(updatedTodo);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = await request.json();
	await db.delete(todo).where(eq(todo.id, id));
	return json({ success: true });
};
