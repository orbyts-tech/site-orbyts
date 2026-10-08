import type { ReactNode } from "react";
import styles from "./FormField.module.css";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  isOptional?: boolean;
  isFullWidth?: boolean;
  children: ReactNode;
}

export const formControlClassName = styles.control;

export function getFieldErrorId(fieldId: string): string {
  return `${fieldId}-error`;
}

export function FormField({
  id,
  label,
  error,
  isOptional = false,
  isFullWidth = false,
  children,
}: FormFieldProps) {
  return (
    <div className={`${styles.field} ${isFullWidth ? styles.fullWidth : ""}`.trim()}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {isOptional ? <span className={styles.optional}> (opcional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={getFieldErrorId(id)} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
