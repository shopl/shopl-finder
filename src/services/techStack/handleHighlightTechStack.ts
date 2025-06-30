import { findReactComponents, FindReactComponentsResult } from './findReactComponents';
import { handleIframe, highlightPage } from './highlightTechStackUtils';

export const handleHighlightTechStack = () => {
  const { hasReact, isFullPageReact, reactModals, reactSections }: FindReactComponentsResult = findReactComponents();

  // React page
  if (isFullPageReact) {
    return highlightPage(document.body, 'React');
  }

  if (hasReact) {
    // React Modal
    if (reactModals.length) {
      return reactModals.forEach((el) => el instanceof HTMLElement && handleIframe(el, 'React_Modal'));
    }
    // React Section
    else if (reactSections.length) {
      return reactSections.forEach((el) => el instanceof HTMLElement && handleIframe(el, 'React_Section'));
    }
  }
  // JSP page
  highlightPage(document.body, 'JSP');
};
