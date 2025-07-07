# Next.js Learning Notes v.15

## 📁 Project Structure

- store Project Files Outside of app
- store all application code in shared folders in the root of your project.
- keep the app directory purely for routing purposes.

### 📦 Routing & Layouts

- opting Specific Segments into a Layout
- create a route group (e.g. (shop)) and move routes that share a layout into that group (e.g. account, cart).
- routes outside of the group (e.g. checkout) will not share the layout.

### 🔗 Linking and Navigating

#### How Navigation Works

- server rendering
  - prefetching
  - streaming
  - client-side transitions

### 🚀 Rendering & Server Components

#### Benefits of Suspense

- streaming Server Rendering: Progressively render HTML from the server.
- selective Hydration: React prioritizes which components to hydrate first based on interaction.

#### What is the RSC Payload?

The React Server Component (RSC) Payload is a compact binary representation of the rendered Server Component tree. It includes:

Rendered Server Component output

Placeholders for Client Components

References to JS files

Props passed from Server to Client components

Rendering Lifecycle
On First Load (Client):
Static HTML is displayed immediately.

RSC Payload reconciles Client & Server trees.

JavaScript hydrates Client Components.

On Subsequent Navigations:
RSC Payload is prefetched and cached.

Client Components render entirely on the client (no server-rendered HTML).

Hydration
Hydration is the process by which React attaches event listeners to pre-rendered HTML, making it interactive.

🧩 Async Components with Server Components
React allows async/await in Server Components. When await is used, React suspends rendering until the promise resolves.

Example:
Server Component

```jsx
import db from "./database";

async function Page({ id }) {
  const note = await db.notes.get(id);
  const commentsPromise = db.comments.get(note.id);

  return (
    <div>
      {note}
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}
```

Client Component

```jsx
"use client";
import { use } from "react";

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((comment) => <p>{comment}</p>);
}
```

## 🎨 Theming & UI Logic

Dark Mode
Easy to implement using a Theme Provider.

No extra logic needed.

Theming works like standard React.

Logic Separation
Encourages splitting logic (Server Component) and UI (Client Component).

Keeps UI components clean.

### 🧠 Context & State

Context Providers
React context does not work in Server Components.

Use a Client Component to wrap context providers and accept children.

Render providers deep in the tree for better performance.

## 📦 3rd Party Libraries

When building a component library, add "use client" to client-dependent entry points.

Allows import into Server Components without needing wrappers.

## 🛡️ Environment & Safety

Preventing Environment Poisoning
Only variables prefixed with \_NEXT_PUBLIC are exposed to the client.

Use the server-only package to restrict usage in client components.

Use the client-only package for client-specific logic (e.g., accessing window).

## 📥 Streaming Implementation

Two ways to implement streaming:

loading.js: Wrap an entire page for loading fallback.

<Suspense>: Wrap individual components.

---

Error boundaries don’t catch errors inside event handlers. They’re designed to catch errors during rendering to show a fallback UI instead of crashing the whole app.

- In general, errors in event handlers or async code aren’t handled by error boundaries because they run after rendering.

---

Route Handlers can be nested anywhere inside the app directory, similar to page.js and layout.js. But there cannot be a route.js file at the same route segment level as page.js.

```txt
app/
└── dashboard/
    ├── page.js      ✅ defines a page (e.g., /dashboard)
    └── route.js     ❌ Not allowed in the same folder as page.js

```
