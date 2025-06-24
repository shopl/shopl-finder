import { removePortalHoverLabel } from '@/utils/domUtils';

// 하이라이팅과 라벨을 모두 제거하는 함수
export const resetLabelAndHighlight = () => {
  try {
    // iframe 외부 하이라이팅 정리
    const highlightedElements = document.querySelectorAll<HTMLElement>('[data-set-highlight="true"]');
    highlightedElements.forEach((element) => {
      removePortalHoverLabel(element);
      if (element.style.border && element.style.border.includes('solid')) {
        element.style.border = '';
      }
      if (element.style.position === 'relative') {
        element.style.position = '';
      }
    });
    // 기술 스택 label 정리
    const teckStackLabels = document.querySelectorAll<HTMLElement>('.techstack');
    teckStackLabels.forEach((label) => {
      label.remove();
    });

    // iframe 내부 정리
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // iframe 내부 - 기술 스택 label 제거
          const teckStackLabels = iframeDoc.querySelectorAll<HTMLElement>('.techstack');
          teckStackLabels.forEach((label) => {
            label.remove();
          });

          // iframe 내부 - border 스타일 제거
          const iframeElements = iframeDoc.querySelectorAll<HTMLElement>('[data-set-highlight="true"]');
          iframeElements.forEach((element) => {
            removePortalHoverLabel(element);
            if (element.style.border && element.style.border.includes('solid')) {
              element.style.border = '';
            }
            if (element.style.position === 'relative') {
              element.style.position = '';
            }
          });
        }
      } catch (error) {
        // Cross-origin iframe은 접근 불가하므로 무시
        console.error(error);
      }
    });
  } catch (error) {
    console.error('Reset highlights error:', error);
  }
};
