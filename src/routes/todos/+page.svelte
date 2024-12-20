<script lang="ts">
  import type { Todo } from '$lib/server/db/schema';

  let { data } = $props();
  let todos = $state(data.todos as Todo[]);
  let newTodoContent = $state('');
  let newTodoPriority = $state('medium');
  let searchQuery = $state('');

  // Filtered todos based on search query
  let filteredTodos = $derived(
    todos.filter(todo => 
      todo.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  async function addTodo() {
    if (!newTodoContent.trim()) return;
    
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        content: newTodoContent,
        priority: newTodoPriority 
      })
    });
    
    const newTodo = await response.json();
    todos = [...todos, newTodo];
    newTodoContent = '';
  }

  async function toggleTodo(todo: Todo) {
    const response = await fetch('/api/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: todo.id, completed: !todo.completed })
    });
    
    const updatedTodo = await response.json();
    todos = todos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
  }

  async function deleteTodo(id: number) {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    
    todos = todos.filter(t => t.id !== id);
  }

  type Priority = 'low' | 'medium' | 'high';

  const priorityColors: Record<Priority, string> = {
    low: 'bg-blue-100',
    medium: 'bg-yellow-100',
    high: 'bg-red-100'
  };
</script>

<div class="max-w-2xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-6">Todo List</h1>
  
  <div class="flex gap-2 mb-6">
    <input
      type="text"
      bind:value={newTodoContent}
      placeholder="Add a new todo..."
      class="flex-1 px-4 py-2 border rounded"
      onkeydown={(e) => e.key === 'Enter' && addTodo()}
    />
    <select
      bind:value={newTodoPriority}
      class="px-4 py-2 border rounded"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button
      onclick={addTodo}
      class="px-4 py-2 bg-[var(--color-theme-1)] text-white rounded hover:bg-[var(--color-theme-2)] transition-colors"
    >
      Add
    </button>
  </div>

  <div class="mb-6">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search todos..."
      class="w-full px-4 py-2 border rounded"
    />
  </div>

  <ul class="space-y-2">
    {#each filteredTodos as todo (todo.id)}
      <li class="flex items-center gap-2 p-4 rounded shadow-sm {priorityColors[todo.priority as Priority]}">
        <input
          type="checkbox"
          checked={todo.completed}
          onchange={() => toggleTodo(todo)}
          class="w-5 h-5"
        />
        <span class:line-through={todo.completed} class="flex-1">
          {todo.content}
        </span>
        <span class="text-sm capitalize text-gray-600">
          {todo.priority}
        </span>
        <button
          onclick={() => deleteTodo(todo.id)}
          class="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </li>
    {/each}
  </ul>
</div> 