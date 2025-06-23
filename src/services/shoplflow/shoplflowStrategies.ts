import { ResultInfoByType, ResultType } from '@/consts';
import { ShoplflowComponent } from '@/types/shoplflow';
import { addHoverLabelToPortal, applyBorder } from '@/utils/domUtils';

/**
 * data-shoplflow 속성을 가진 요소를 하이라이트합니다.
 * 기본적으로는 border만 적용하고, hover시 Portal을 통해 label을 표시합니다.
 * @param element 하이라이트할 요소
 * @param componentName data-shoplflow 속성의 값 (예: "Button", "Modal" 등)
 */
export const highlightShoplflowComponent = (element: HTMLElement, componentName: string): void => {
  // 요소에 테두리 적용 (상대적 포지셔닝은 Portal 방식에서 불필요)
  applyBorder(element, ResultInfoByType[ResultType.Shoplflow].color, '1px');

  addHoverLabelToPortal(element, {
    type: 'shoplflow',
    text: componentName,
    color: ResultInfoByType[ResultType.Shoplflow].color,
  });
};

const isHTMLElement = (element: Element): element is HTMLElement => {
  return Boolean(
    element instanceof HTMLElement ||
      // iframe 내부의 HTMLElement를 파악하기 위한 로직
      (element.ownerDocument?.defaultView?.HTMLElement &&
        element instanceof element.ownerDocument.defaultView.HTMLElement),
  );
};

/**
 * 여러 shoplflow 컴포넌트들을 일괄 하이라이트합니다.
 * @param components 하이라이트할 shoplflow 컴포넌트들의 배열
 */
export const highlightShoplflowComponents = (components: ShoplflowComponent[]): void => {
  components.forEach(({ element, componentName }) => {
    if (isHTMLElement(element)) {
      highlightShoplflowComponent(element, componentName);
    }
  });
};
