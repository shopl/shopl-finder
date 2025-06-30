import { removePortalHoverLabel } from '@/utils/domUtils';

/**
 * 전달되는 label 요소를 제거합니다.
 */
export const clearLabel = (labels: NodeListOf<HTMLElement>) => {
  return labels.forEach((label) => {
    label.remove();
  });
};

/**
 * 전달되는 요소의 border 하이라이팅을 제거합니다.
 */
export const clearHighLight = (elements: NodeListOf<HTMLElement>) => {
  return elements.forEach((element) => {
    removePortalHoverLabel(element);
    if (element.style.border && element.style.border.includes('solid')) {
      element.style.border = '';
    }
    if (element.style.position === 'relative') {
      element.style.position = '';
    }
  });
};

/**
 * 전달되는 iframe 내부를 초기화합니다.
 */
export const clearIframe = (iframes: NodeListOf<HTMLIFrameElement>) => {
  return iframes.forEach((iframe) => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        const teckStackLabels = iframeDoc.querySelectorAll<HTMLElement>('.techstack');
        clearLabel(teckStackLabels);

        const iframeElements = iframeDoc.querySelectorAll<HTMLElement>('[data-set-highlight="true"]');
        clearHighLight(iframeElements);
      }
    } catch (error) {
      // Cross-origin iframe은 접근 불가하므로 무시
      console.error(error);
    }
  });
};
