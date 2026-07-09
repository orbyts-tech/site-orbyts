import type { Project } from "@/lib/constants/projects";
import {
  getProjectImageUrl,
  isExternalProjectUrl,
  resolveProjectAppUrl,
} from "@/lib/constants/projects";
import { IPhoneFrame } from "./IPhoneFrame";
import { MacbookFrame } from "./MacbookFrame";

interface ProjectMockupFrameProps {
  project: Project;
  isActive?: boolean;
  enableLiveEmbed?: boolean;
  showHint?: boolean;
  interactive?: boolean;
  size?: "default" | "large" | "fill";
  onIframeLoad?: () => void;
  onClick?: () => void;
}

function getLiveEmbedUrl(project: Project, isActive: boolean, enableLiveEmbed: boolean): string | undefined {
  if (!enableLiveEmbed || !isActive) return undefined;

  const { url } = resolveProjectAppUrl(project);
  return isExternalProjectUrl(url) ? url : undefined;
}

export function ProjectMockupFrame({
  project,
  isActive = false,
  enableLiveEmbed = false,
  showHint = false,
  interactive = false,
  size = "default",
  onIframeLoad,
  onClick,
}: ProjectMockupFrameProps) {
  const imageSrc = getProjectImageUrl(project);
  const liveUrl = getLiveEmbedUrl(project, isActive, enableLiveEmbed);
  const mockup = project.mockup ?? "macbook";

  if (mockup === "iphone") {
    return (
      <IPhoneFrame
        imageSrc={imageSrc}
        imageAlt={project.imageAlt}
        title={project.title}
        liveUrl={liveUrl}
        isActive={isActive}
        showHint={showHint}
        size={size}
        interactive={interactive}
        onIframeLoad={onIframeLoad}
      />
    );
  }

  const macbookSize = size === "fill" ? "large" : size;

  return (
    <MacbookFrame
      imageSrc={imageSrc}
      imageAlt={project.imageAlt}
      title={project.title}
      isActive={isActive}
      showHint={showHint}
      size={macbookSize}
      interactive={interactive}
      onClick={onClick}
    />
  );
}
