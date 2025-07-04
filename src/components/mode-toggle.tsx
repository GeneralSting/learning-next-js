"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "@/styles/modular/mode-toggle.module.css";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={styles.toggleButton}>
        <Sun className={styles.icon} />
      </button>
    );
  }

  return (
    <div className={styles.menuContainer}>
      <button className={styles.toggleButton} aria-label="Toggle theme">
        {theme === "light" ? (
          <Sun className={styles.icon} />
        ) : theme === "dark" ? (
          <Moon className={styles.icon} />
        ) : (
          <Monitor className={styles.icon} />
        )}
      </button>

      <div className={styles.menu}>
        <button
          onClick={() => setTheme("light")}
          className={`${styles.menuItem} ${
            theme === "light" ? styles.activeMenuItem : ""
          }`}
        >
          <Sun className={styles.icon} />
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`${styles.menuItem} ${
            theme === "dark" ? styles.activeMenuItem : ""
          }`}
        >
          <Moon className={styles.icon} />
          Dark
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`${styles.menuItem} ${
            theme === "system" ? styles.activeMenuItem : ""
          }`}
        >
          <Monitor className={styles.icon} />
          System
        </button>
      </div>
    </div>
  );
}
