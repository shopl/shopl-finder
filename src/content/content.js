import { highlightTeckStack } from '../services/techStack/highlightTeckStack';
import { highlightShoplflow } from '../services/shoplflow/highlightShoplflow';
import { removePortalHoverLabel } from '@/utils/domUtils';

// 하이라이팅과 라벨을 모두 제거하는 함수
export const resetAllHighlights = () => {
  try {
    const highlightedElements = document.querySelectorAll('[data-set-highlight="true"]');
    highlightedElements.forEach((element) => {
      removePortalHoverLabel(element);
      if (element.style.border && element.style.border.includes('solid')) {
        element.style.border = '';
      }
      if (element.style.position === 'relative') {
        element.style.position = '';
      }
    });

    const teckStackLabels = document.querySelectorAll('.techstack');
    teckStackLabels.forEach((label) => {
      label.remove();
    });

    // iframe 내부 정리
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          const teckStackLabels = iframeDoc.querySelectorAll('.techstack');
          teckStackLabels.forEach((label) => {
            label.remove();
          });

          // iframe 내부 요소들의 border 스타일 제거
          const iframeElements = iframeDoc.querySelectorAll('[data-set-highlight="true"]');
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
      } catch (e) {
        // Cross-origin iframe은 접근 불가하므로 무시
        console.debug('Cross-origin iframe detected, skipping cleanup');
      }
    });

    return '모든 하이라이팅이 초기화되었습니다.';
  } catch (error) {
    console.error('Reset highlights error:', error);
    return '초기화 중 오류가 발생했습니다.';
  }
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    // 기술 스택 탐지
    if (request.action === 'detect-techstack') {
      const result = highlightTeckStack();
      return sendResponse({ result });
    }

    // Shoplflow 탐지
    if (request.action === 'detect-shoplflow') {
      const result = highlightShoplflow();
      return sendResponse({ result });
    }

    // 하이라이팅 초기화
    if (request.action === 'reset-highlights') {
      const result = resetAllHighlights();
      return sendResponse({ result });
    }

    return true;
  },
);
