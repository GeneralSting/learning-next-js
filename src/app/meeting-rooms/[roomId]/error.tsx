"use client";

import { ErrorCard } from "./components/ErrorCard";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <ErrorCard error={error} reset={function (): void {}} />;
}
