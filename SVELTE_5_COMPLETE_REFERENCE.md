# Svelte 5 Complete Reference

*Your always-available Svelte 5 documentation and examples*

## 🎯 Key Changes in Svelte 5

### Runes System
- `$state()` - Reactive state
- `$derived()` - Computed values
- `$effect()` - Side effects
- `$props()` - Component props
- `$bindable()` - Bindable props
- `$inspect()` - Debug reactive state

### No More `export let` - Use `$props()`
```svelte
<!-- Svelte 4 -->
<script>
  export let name = 'world';
  export let required;
</script>

<!-- Svelte 5 -->
<script>
  let { name = 'world', required } = $props();
</script>
```

## 🔄 State Management

### Basic Reactive State
```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<button onclick={() => count++}>
  Count: {count}, Doubled: {doubled}
</button>
```

### Complex State Objects
```svelte
<script>
  let user = $state({
    name: 'Alice',
    age: 30,
    preferences: {
      theme: 'dark'
    }
  });
</script>

<input bind:value={user.name} />
<button onclick={() => user.age++}>Age: {user.age}</button>
```

### Arrays and Deep Reactivity
```svelte
<script>
  let todos = $state([
    { id: 1, text: 'Learn Svelte 5', done: false }
  ]);

  function addTodo() {
    todos.push({
      id: Date.now(),
      text: 'New todo',
      done: false
    });
  }

  function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.done = !todo.done;
  }
</script>

{#each todos as todo}
  <label>
    <input
      type="checkbox"
      bind:checked={todo.done}
      onchange={() => toggleTodo(todo.id)}
    />
    {todo.text}
  </label>
{/each}

<button onclick={addTodo}>Add Todo</button>
```

## 📡 Effects and Side Effects

### Basic Effects
```svelte
<script>
  let count = $state(0);

  $effect(() => {
    console.log('Count changed:', count);
  });

  // Effect with cleanup
  $effect(() => {
    const interval = setInterval(() => {
      count++;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>
```

### Pre-effects (Run Before DOM Updates)
```svelte
<script>
  let messages = $state([]);
  let viewport;

  $effect.pre(() => {
    // Run before DOM updates for scroll position calculations
    const autoscroll = viewport &&
      viewport.offsetHeight + viewport.scrollTop >
      viewport.scrollHeight - 50;

    if (autoscroll) {
      tick().then(() => {
        viewport.scrollTo(0, viewport.scrollHeight);
      });
    }
  });
</script>
```

## 🎨 Components and Props

### Component Props
```svelte
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';

  let message = $state('Hello');
</script>

<Child {message} count={42} />

<!-- Child.svelte -->
<script>
  let { message, count } = $props();
  // Props with defaults
  let { optional = 'default value' } = $props();
  // Rest props
  let { specificProp, ...rest } = $props();
</script>

<p>{message} - Count: {count}</p>
<div {...rest}>Content with spread props</div>
```

### Bindable Props
```svelte
<!-- Input.svelte -->
<script>
  let { value = $bindable(), ...props } = $props();
</script>

<input bind:value {value} {...props} />

<!-- Parent.svelte -->
<script>
  import Input from './Input.svelte';
  let text = $state('');
</script>

<Input bind:value={text} />
<p>Text: {text}</p>
```

## 🎭 Event Handling

### Event Handlers (New Syntax)
```svelte
<script>
  let count = $state(0);

  function handleClick() {
    count++;
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      count++;
    }
  }
</script>

<!-- New Svelte 5 syntax -->
<button onclick={handleClick}>Count: {count}</button>
<input onkeydown={handleKeydown} />

<!-- Inline handlers -->
<button onclick={() => count++}>Increment</button>

<!-- Multiple handlers -->
<button onclick={(e) => {
  handleClick();
  console.log('Clicked!');
}}>
  Multi-handler
</button>

<!-- Capture phase -->
<button onclickcapture={handleClick}>Capture</button>
```

### Component Events (Using Callbacks)
```svelte
<!-- Button.svelte -->
<script>
  let { onclick, children } = $props();
</script>

<button {onclick}>
  {@render children?.()}
</button>

<!-- Parent.svelte -->
<script>
  import Button from './Button.svelte';

  function handleClick() {
    console.log('Button clicked!');
  }
</script>

<Button onclick={handleClick}>
  {#snippet children()}
    Click me!
  {/snippet}
</Button>
```

## 🧩 Snippets (New Content Projection)

### Basic Snippets
```svelte
<!-- List.svelte -->
<script>
  let { items, item, empty } = $props();
</script>

{#if items.length}
  <ul>
    {#each items as entry}
      <li>{@render item(entry)}</li>
    {/each}
  </ul>
{:else}
  {@render empty?.()}
{/if}

<!-- Parent.svelte -->
<script>
  import List from './List.svelte';

  let items = $state([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' }
  ]);
</script>

<List {items}>
  {#snippet item(item)}
    <strong>{item.name}</strong>
  {/snippet}

  {#snippet empty()}
    <p>No items found</p>
  {/snippet}
</List>
```

### Advanced Snippets with Multiple Parameters
```svelte
<!-- Table.svelte -->
<script>
  let { data, header, row } = $props();
</script>

<table>
  <thead>
    {@render header()}
  </thead>
  <tbody>
    {#each data as item, index}
      <tr>{@render row(item, index)}</tr>
    {/each}
  </tbody>
</table>

<!-- Usage -->
<Table {data}>
  {#snippet header()}
    <th>Name</th>
    <th>Age</th>
    <th>Actions</th>
  {/snippet}

  {#snippet row(person, index)}
    <td>{person.name}</td>
    <td>{person.age}</td>
    <td>
      <button onclick={() => edit(person)}>Edit</button>
    </td>
  {/snippet}
</Table>
```

## 🌍 Shared State

### Global State Management
```js
// state.svelte.js
export const userState = $state({
  name: '',
  email: '',
  preferences: {
    theme: 'light'
  }
});

export function updateUser(updates) {
  Object.assign(userState, updates);
}

export function toggleTheme() {
  userState.preferences.theme =
    userState.preferences.theme === 'light' ? 'dark' : 'light';
}
```

```svelte
<!-- Any component -->
<script>
  import { userState, updateUser, toggleTheme } from './state.svelte.js';
</script>

<p>Hello, {userState.name}!</p>
<p>Theme: {userState.preferences.theme}</p>

<button onclick={() => updateUser({ name: 'New Name' })}>
  Update Name
</button>
<button onclick={toggleTheme}>Toggle Theme</button>
```

## 🔍 Debugging

### Using $inspect
```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);

  // Basic inspection
  $inspect(count, doubled);

  // With label
  $inspect('Counter values:', count, doubled);

  // Conditional inspection
  $inspect(count > 5 && { count, doubled });
</script>
```

### Effect Tracking
```svelte
<script>
  $effect(() => {
    // Check if we're in tracking context
    console.log('In effect:', $effect.tracking()); // true
  });

  console.log('In setup:', $effect.tracking()); // false
</script>

<p>In template: {$effect.tracking()}</p> <!-- true -->
```

## 🏗️ Component Lifecycle & Mounting

### Manual Component Mounting
```js
import { mount, unmount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
  target: document.getElementById('app'),
  props: { message: 'Hello!' }
});

// Later...
unmount(app);
```

### Server-Side Rendering
```js
import { render } from 'svelte/server';
import App from './App.svelte';

const { html, head } = render(App, {
  props: { message: 'Hello from server!' }
});
```

## 🎨 Dynamic Components

### Without svelte:component
```svelte
<script>
  import ComponentA from './ComponentA.svelte';
  import ComponentB from './ComponentB.svelte';

  let currentComponent = $state(ComponentA);
</script>

<select bind:value={currentComponent}>
  <option value={ComponentA}>Component A</option>
  <option value={ComponentB}>Component B</option>
</select>

<!-- Direct usage - no svelte:component needed -->
<currentComponent />

<!-- With derived components -->
<script>
  let condition = $state(true);
  const Component = $derived(condition ? ComponentA : ComponentB);
</script>

<Component />
```

### In Each Blocks
```svelte
<script>
  let items = $state([
    { component: ComponentA, props: { title: 'A' } },
    { component: ComponentB, props: { title: 'B' } }
  ]);
</script>

{#each items as item}
  <item.component {...item.props} />
{/each}
```

## 🔗 Context API

### Setting and Getting Context
```svelte
<!-- Parent.svelte -->
<script>
  import { setContext } from 'svelte';
  import Child from './Child.svelte';

  let counter = $state({ count: 0 });
  setContext('counter', counter);
</script>

<button onclick={() => counter.count++}>
  Increment: {counter.count}
</button>

<Child />

<!-- Child.svelte -->
<script>
  import { getContext } from 'svelte';

  const counter = getContext('counter');
</script>

<p>Count from context: {counter.count}</p>
<button onclick={() => counter.count--}>Decrement</button>
```

## 🌐 Custom Elements

### Creating Custom Elements
```svelte
<svelte:options customElement="my-counter" />

<script>
  let { count = 0 } = $props();

  function increment() {
    count++;
    // Dispatch custom events
    const event = new CustomEvent('increment', {
      detail: { count }
    });
    $host().dispatchEvent(event);
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>

<style>
  button {
    padding: 10px;
    background: blue;
    color: white;
    border: none;
    border-radius: 4px;
  }
</style>
```

### Using Custom Elements
```svelte
<script>
  import './MyCounter.svelte';

  let count = $state(0);
</script>

<my-counter
  count={count}
  onincrement={(e) => count = e.detail.count}
></my-counter>
```

## 🎯 Advanced Patterns

### State Machines with $derived
```svelte
<script>
  let loading = $state(false);
  let data = $state(null);
  let error = $state(null);

  const status = $derived(
    loading ? 'loading' :
    error ? 'error' :
    data ? 'success' :
    'idle'
  );

  async function fetchData() {
    loading = true;
    error = null;

    try {
      const response = await fetch('/api/data');
      data = await response.json();
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

{#if status === 'loading'}
  <p>Loading...</p>
{:else if status === 'error'}
  <p>Error: {error}</p>
{:else if status === 'success'}
  <p>Data: {JSON.stringify(data)}</p>
{:else}
  <button onclick={fetchData}>Load Data</button>
{/if}
```

### Form Handling
```svelte
<script>
  let form = $state({
    name: '',
    email: '',
    age: 0
  });

  const isValid = $derived(
    form.name.length > 0 &&
    form.email.includes('@') &&
    form.age >= 18
  );

  function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
      console.log('Submitting:', form);
    }
  }

  function updateField(field, value) {
    form[field] = value;
  }
</script>

<form onsubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Name"
    bind:value={form.name}
  />

  <input
    type="email"
    placeholder="Email"
    bind:value={form.email}
  />

  <input
    type="number"
    placeholder="Age"
    bind:value={form.age}
  />

  <button type="submit" disabled={!isValid}>
    Submit
  </button>
</form>

<p>Form valid: {isValid}</p>
```

## 🧪 Testing

### Component Testing with Vitest
```js
// component.test.js
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Counter from './Counter.svelte';

test('Counter increments when clicked', async () => {
  const user = userEvent.setup();
  render(Counter);

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('0');

  await user.click(button);
  expect(button).toHaveTextContent('1');
});
```

### Testing Runes Directly
```js
// state.test.js
import { expect, test } from 'vitest';

test('State runes work in tests', () => {
  let count = $state(0);
  let doubled = $derived(count * 2);

  expect(doubled).toBe(0);

  count = 5;
  expect(doubled).toBe(10);
});
```

## 📦 Migration from Svelte 4

### Quick Reference
| Svelte 4 | Svelte 5 |
|----------|----------|
| `export let prop` | `let { prop } = $props()` |
| `$: derived = value * 2` | `let derived = $derived(value * 2)` |
| `$: { sideEffect() }` | `$effect(() => { sideEffect() })` |
| `on:click={handler}` | `onclick={handler}` |
| `<slot name="foo" />` | `{@render foo?.()}` |
| `$$props` | `$props()` |
| `$$restProps` | `let { ...rest } = $props()` |
| `createEventDispatcher()` | Callback props |

This reference covers the core concepts and patterns you'll need for Svelte 5 development. Keep this file handy for quick lookups and examples!