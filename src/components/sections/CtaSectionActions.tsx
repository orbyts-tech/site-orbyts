"use client";

import { OpenProposalButton } from "@/components/proposal/OpenProposalButton";
import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";import { SITE } from "@/config/site";
import styles from "./CtaSection.module.css";

export function CtaSectionActions() {
  return (
    <div className={styles.actions}>
      <OpenProposalButton className={buttonStyles.fullWidth}>
        Solicitar proposta
      </OpenProposalButton>
      <Button
        href={`mailto:${SITE.contact.email}`}
        variant="ghost"
        className={buttonStyles.fullWidth}
      >        {SITE.contact.email}
      </Button>
    </div>
  );
}
