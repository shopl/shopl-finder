import { clearHighLight, clearIframe, clearLabel } from './resetUtils';

export const handleReset = () => {
  const iframes = document.querySelectorAll('iframe');
  const teckStackLabels = document.querySelectorAll<HTMLElement>('.techstack');
  const highlightedElements = document.querySelectorAll<HTMLElement>('[data-set-highlight="true"]');

  try {
    clearHighLight(highlightedElements);
    clearLabel(teckStackLabels);
    clearIframe(iframes);
  } catch (error) {
    console.error('Reset highlights error:', error);
  }
};
