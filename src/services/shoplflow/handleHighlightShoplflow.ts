import { findShoplflow } from '@/services/shoplflow/findShoplflow';
import { highlightShoplflowComponent, isHTMLElement } from '@/services/shoplflow/highlightShoplflowUtils';

export const handleHighlightShoplflow = (): void => {
  const { hasShoplflow, shoplflowComponents } = findShoplflow();

  if (hasShoplflow && shoplflowComponents.length > 0) {
    shoplflowComponents.forEach(({ element, componentName }) => {
      if (isHTMLElement(element)) {
        highlightShoplflowComponent(element, componentName);
      }
    });
  }
};
