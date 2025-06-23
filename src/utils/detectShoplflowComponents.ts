import { EXCLUDE_SHOPLFLOW_TYPES } from '@/consts';
import { ShoplflowComponent, ShoplflowDetectionResult } from '@/types/shoplflow';

/**
 * DOM에서 data-shoplflow 속성을 가진 요소들을 탐지합니다.
 * 제외 타입에 해당하는 컴포넌트는 필터링됩니다.
 */
export const detectShoplflowComponents = (): ShoplflowDetectionResult => {
  const shoplflowComponents: ShoplflowComponent[] = [];
  const excludedCount = 0;

  /**
   * 컴포넌트 타입이 제외 목록에 있는지 확인합니다.
   */
  const isExcludedType = (componentName: string): boolean => {
    return (EXCLUDE_SHOPLFLOW_TYPES as readonly string[]).includes(componentName);
  };

  /**
   * iframe 내부의 data-shoplflow 요소를 탐지해 shoplflowComponents에 push합니다.
   */
  const detectComponentsInIframe = (iframeList: NodeListOf<Element>, shoplflowComponents: ShoplflowComponent[]) => {
    iframeList.forEach((element) => {
      const componentName = element.getAttribute('data-shoplflow');

      if (componentName) {
        const trimmedName = componentName.trim();

        // 제외 타입 확인
        if (isExcludedType(trimmedName)) {
          return; // 제외 타입이면 건너뛰기
        }

        shoplflowComponents.push({
          element,
          componentName: trimmedName,
        });
      }
    });
  };

  // data-shoplflow 속성을 가진 모든 요소 탐지
  const elementsWithShoplflow = document.querySelectorAll('[data-shoplflow]');
  detectComponentsInIframe(elementsWithShoplflow, shoplflowComponents);

  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    try {
      const iframeDocument = iframe.contentDocument;
      if (iframeDocument) {
        const iframeShoplflowElements = iframeDocument.querySelectorAll('[data-shoplflow]');
        detectComponentsInIframe(iframeShoplflowElements, shoplflowComponents);
      }
    } catch (e) {
      console.error('Error accessing iframe content for shoplflow detection:', e);
    }
  });

  return {
    hasShoplflow: shoplflowComponents.length > 0,
    totalCount: shoplflowComponents.length,
    shoplflowComponents,
    excludedCount,
  };
};
