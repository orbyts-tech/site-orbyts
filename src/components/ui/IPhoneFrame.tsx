import Image from "next/image";
import { DeviceMockup, iPhone16Pro } from "@mockifydev/react";
import { LiveEmbedGate } from "./LiveEmbedGate";
import styles from "./IPhoneFrame.module.css";

interface IPhoneFrameProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  liveUrl?: string;
  canEmbed?: boolean;
  isActive?: boolean;
  showHint?: boolean;
  size?: "default" | "large" | "fill" | "carousel";
  interactive?: boolean;
  onIframeLoad?: () => void;
}

const MOCKIFY_BASE_PATH = "/mockify";

const MOCKUP_WIDTH: Record<NonNullable<IPhoneFrameProps["size"]>, number> = {
  carousel: 220,
  default: 280,
  large: 380,
  fill: 400,
};

function getScreenContent(
  showLiveEmbed: boolean,
  liveUrl: string | undefined,
  imageSrc: string,
  imageAlt: string,
  title: string,
  canEmbed: boolean,
  onIframeLoad?: () => void,
) {
  if (showLiveEmbed && liveUrl) {
    return (
      <LiveEmbedGate
        src={liveUrl}
        title={`${title} — app ao vivo`}
        fallbackImageSrc={imageSrc}
        fallbackImageAlt={imageAlt}
        canEmbed={canEmbed}
        onLoad={onIframeLoad}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      sizes="400px"
      className={styles.screenImage}
      priority
    />
  );
}

export function IPhoneFrame({
  imageSrc,
  imageAlt,
  title,
  liveUrl,
  canEmbed = true,
  isActive = false,
  showHint = false,
  size = "default",
  interactive = false,
  onIframeLoad,
}: IPhoneFrameProps) {
  const showLiveEmbed = Boolean(liveUrl && isActive);
  const mockupWidth = MOCKUP_WIDTH[size];
  const className = [
    styles.wrapper,
    styles[size],
    isActive ? styles.active : "",
    showLiveEmbed ? styles.live : "",
    interactive ? styles.interactive : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} aria-label={`Projeto ${title}`}>
      <DeviceMockup
        device={iPhone16Pro}
        width={mockupWidth}
        color="Black Titanium"
        basePath={MOCKIFY_BASE_PATH}
        showStatusBar={false}
        screenColor="#000000"
        className={styles.mockup}
      >
        <div className={styles.screenContent}>
          {getScreenContent(
            showLiveEmbed,
            liveUrl,
            imageSrc,
            imageAlt,
            title,
            canEmbed,
            onIframeLoad,
          )}
        </div>
      </DeviceMockup>

      {showHint ? (
        <span className={styles.hint}>
          {showLiveEmbed ? "Toque para interagir" : isActive ? "Selecionado" : "Selecionar"}
        </span>
      ) : null}
    </div>
  );
}
