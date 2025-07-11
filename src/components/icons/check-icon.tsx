import styles from "@/styles/modular/meeting-room-page.module.css";

export function CheckIcon() {
  return (
    <svg
      className={styles.checkIcon}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
