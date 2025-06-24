import { ResultInfoByType } from '@/consts';
import { DetectionResult, detectReactComponents } from '@/services/techStack/detectReactComponents';

export const getTeckStackResult = () => {
  const { hasReact, isFullPageReact, reactModals, reactSections }: DetectionResult = detectReactComponents();

  if (hasReact) {
    // React Modal
    if (reactModals.length) {
      return ResultInfoByType['React_Modal'].notice;
    }
    // React Section
    else if (reactSections.length) {
      return ResultInfoByType['React_Section'].notice;
    }
  }
  // React page
  if (isFullPageReact) {
    return ResultInfoByType['React'].notice;
  }
  // JSP page
  return ResultInfoByType['JSP'].notice;
};
