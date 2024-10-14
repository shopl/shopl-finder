import { InfoByTechStack, TechStackType } from '@/consts';
import { detectReactComponents, DetectionResult } from '../utils/detectReactComponents';
import { highlightComponents } from '../utils/highlightComponents';

export const detectAndHighlight = (): string => {
  const { hasReact, isFullPageReact, reactModals, reactSections }: DetectionResult = detectReactComponents();
  // React page
  if (isFullPageReact) {
    highlightComponents([document.body], TechStackType.React);
    return InfoByTechStack[TechStackType.React].notice;
  }
  if (hasReact) {
    if (reactModals.length) {
      highlightComponents(reactModals, TechStackType.React_Modal);
      highlightComponents([document.body], TechStackType.JSP);
      return InfoByTechStack[TechStackType.React_Modal].notice;
    }
    if (reactSections.length) {
      highlightComponents(reactSections, TechStackType.React_Section);
      highlightComponents([document.body], TechStackType.JSP);
      return InfoByTechStack[TechStackType.React_Section].notice;
    }
    return '';
  } else {
    // JSP page
    highlightComponents([document.body], TechStackType.JSP);
    return InfoByTechStack[TechStackType.JSP].notice;
  }
};
