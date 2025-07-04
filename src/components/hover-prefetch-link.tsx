"use client";

import Link from "next/link";
import { useState } from "react";

export interface HoverPrefetchLinkProps {
  href: string;
  children: React.ReactNode;
}

export const HoverPrefetchLink: React.FC<HoverPrefetchLinkProps> = ({
  href,
  children,
}) => {
  const [activeHover, setActiveHover] = useState(false);

  return (
    <Link
      href={href}
      prefetch={activeHover ? null : false}
      onMouseEnter={() => setActiveHover(true)}
    >
      {children}
    </Link>
  );
};
