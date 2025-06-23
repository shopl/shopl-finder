import { ResultInfoByType, ResultType } from '@/consts';
import { detectReactComponents, DetectionResult } from '../../utils/detectReactComponents';
import {
  highlightReactPage,
  highlightJSPPage,
  highlightReactModal,
  highlightReactSection,
} from './techStackStrategies';

export const highlightTeckStack = (): string => {
  const { hasReact, isFullPageReact, reactModals, reactSections }: DetectionResult = detectReactComponents();

  if (hasReact) {
    // React Modal
    if (reactModals.length) {
      reactModals.forEach((el) => el instanceof HTMLElement && highlightReactModal(el));
      highlightJSPPage(document.body);
      return ResultInfoByType[ResultType.React_Modal].notice;
    }
    // React Section
    else if (reactSections.length) {
      reactSections.forEach((el) => el instanceof HTMLElement && highlightReactSection(el));
      highlightJSPPage(document.body);
      return ResultInfoByType[ResultType.React_Section].notice;
    }
  }
  // React page
  if (isFullPageReact) {
    highlightReactPage(document.body);
    return ResultInfoByType[ResultType.React].notice;
  }
  // JSP page
  highlightJSPPage(document.body);
  return ResultInfoByType[ResultType.JSP].notice;
};
