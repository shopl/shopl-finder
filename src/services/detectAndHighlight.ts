import { InfoByTechStack, ResultType } from '@/consts';
import { detectReactComponents, DetectionResult } from '../utils/detectReactComponents';
import { highlightComponents } from '../utils/highlightComponents';

export const detectAndHighlight = (): string => {
  const { hasReact, isFullPageReact, reactModals, reactSections }: DetectionResult = detectReactComponents();
  // React page
  if (isFullPageReact) {
    highlightComponents([document.body], ResultType.React);
    return InfoByTechStack[ResultType.React].notice;
  }
  if (hasReact) {
    if (reactModals.length) {
      highlightComponents(reactModals, ResultType.React_Modal);
      highlightComponents([document.body], ResultType.JSP);
      return InfoByTechStack[ResultType.React_Modal].notice;
    }
    if (reactSections.length) {
      highlightComponents(reactSections, ResultType.React_Section);
      highlightComponents([document.body], ResultType.JSP);
      return InfoByTechStack[ResultType.React_Section].notice;
    }
    return '';
  } else {
    // JSP page
    highlightComponents([document.body], ResultType.JSP);
    return InfoByTechStack[ResultType.JSP].notice;
  }
};
