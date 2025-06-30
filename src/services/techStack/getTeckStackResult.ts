import { ResultInfoByType } from '@/consts';
import { findReactComponents, FindReactComponentsResult } from '@/services/techStack/findReactComponents';

export const getTeckStackResult = () => {
  const { hasReact, isFullPageReact, reactModals, reactSections }: FindReactComponentsResult = findReactComponents();

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
