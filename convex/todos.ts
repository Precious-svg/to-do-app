import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getTodos = query({
    handler: async (ctx) => {
     return await ctx.db.query("todos").order("desc").collect()
    }
})

export const addTodo = mutation({
    args: {text: v.string()},
    handler: async(ctx, args) => {
        await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false,
            createdAt: Date.now()
        });
        console.log("to be added:", args)
    },
    
});

export const toggleTodo = mutation({
  args: {id: v.id("todos")},
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id)
    if(todo){
        await ctx.db.patch(args.id, {isCompleted: !todo.isCompleted})
    }
  }
})

export const deleteTodo = mutation({
    args: {id: v.id("todos")},
    handler: async(ctx, args) => {
        await ctx.db.delete(args.id)
    }
})