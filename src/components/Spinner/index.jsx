import styles from './Spinner.module.scss';

export function Spinner() {
  return (
    <div className={styles.wrapper} role="status" aria-label="로딩 중">
      <div className={styles.ring}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
