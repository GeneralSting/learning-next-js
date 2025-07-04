import styles from "@/styles/modular/loading-spinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p>Loading meeting rooms...</p>
    </div>
  );
}
