## Store project files outside of app

- This strategy stores all application code in shared folders in the root of your project and keeps the app directory purely for routing purposes.

## Opting specific segments into a layout

- To opt specific routes into a layout, create a new route group (e.g. (shop)) and move the routes that share the same layout into the group (e.g. account and cart). The routes outside of the group will not share the layout (e.g. checkout).

By using Suspense, you get the benefits of:

Streaming Server Rendering - Progressively rendering HTML from the server to the client.
Selective Hydration - React prioritizes what components to make interactive first based on user interaction.

---

## Linking and Navigating

### How navigation works

- server rendering
- prefetching
- streaming
- client-side transition

---

What is the React Server Component Payload (RSC)?
The RSC Payload is a compact binary representation of the rendered React Server Components tree. It's used by React on the client to update the browser's DOM. The RSC Payload contains:
The rendered result of Server Components
Placeholders for where Client Components should be rendered and references to their JavaScript files
Any props passed from a Server Component to a Client Component

---

On the client (first load)
Then, on the client:

HTML is used to immediately show a fast non-interactive preview of the route to the user.
RSC Payload is used to reconcile the Client and Server Component trees.
JavaScript is used to hydrate Client Components and make the application interactive.
What is hydration?

Hydration is React's process for attaching event handlers to the DOM, to make the static HTML interactive.

Subsequent Navigations
On subsequent navigations:

The RSC Payload is prefetched and cached for instant navigation.
Client Components are rendered entirely on the client, without the server-rendered HTML.

---

Async components with Server Components
Server Components introduce a new way to write Components using async/await. When you await in an async component, React will suspend and wait for the promise to resolve before resuming rendering. This works across server/client boundaries with streaming support for Suspense.

**You can even create a promise on the server, and await it on the client:**

```jsx
// Server Component
import db from "./database";

async function Page({ id }) {
  // Will suspend the Server Component.
  const note = await db.notes.get(id);

  // NOTE: not awaited, will start here and await on the client.
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

```jsx
// Client Component
"use client";
import { use } from "react";

function Comments({ commentsPromise }) {
  // NOTE: this will resume the promise from the server.
  // It will suspend until the data is available.
  const comments = use(commentsPromise);
  return comments.map((commment) => <p>{comment}</p>);
}
```


- dark mode
  - theme provider extra easy - no logic needed
  - theming is still same as react - themes required ?

- enforces you to separate the logic and only UI that uses that logic - the rest of component remains clean without logic