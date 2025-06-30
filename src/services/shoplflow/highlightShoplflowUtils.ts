import { ResultInfoByType, ResultType } from '@/consts';
import { addHoverLabelToPortal, applyBorder } from '@/utils/domUtils';

/**
 * data-shoplflow 속성을 가진 요소를 하이라이트합니다.
 * hover시 Portal을 통해 label을 표시합니다.
 * @param element 하이라이트할 요소
 * @param componentName data-shoplflow 속성의 값 (예: "Button", "Modal" 등)
 */
export const highlightShoplflowComponent = (element: HTMLElement, componentName: string): void => {
  applyBorder(element, ResultInfoByType[ResultType.Shoplflow].color, '1px');
  addHoverLabelToPortal(element, {
    type: 'shoplflow',
    text: componentName,
    color: ResultInfoByType[ResultType.Shoplflow].color,
  });
};

export const isHTMLElement = (element: Element): element is HTMLElement => {
  return Boolean(
    element instanceof HTMLElement ||
      // iframe 내부의 HTMLElement를 파악하기 위한 로직
      (element.ownerDocument?.defaultView?.HTMLElement &&
        element instanceof element.ownerDocument.defaultView.HTMLElement),
  );
};
