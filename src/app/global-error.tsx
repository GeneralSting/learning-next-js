"use client";

import { Button } from "@mui/material";

export default function GlobalError() {
  return (
    <html>
      <body>
        <div style={{ margin: "auto", maxHeight: "100vh" }}>
          <h2>Something went wrong!</h2>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            variant="outlined"
            color="error"
          >
            Refresh
          </Button>
        </div>
      </body>
    </html>
  );
}
