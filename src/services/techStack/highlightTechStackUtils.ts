import { IframeHighlightConfig } from '@/types/highlighter';
import { ResultInfoByType, ResultType } from '@/consts';
import {
  applyRelativePosition,
  createLabel,
  addLabelToElement,
  applyBorder,
  insertLabelAsFirstChild,
} from '@/utils/domUtils';

/**
 * iframe에 fallback 스타일을 적용합니다.
 */
const applyIframeFallback = (iframe: HTMLIFrameElement, config: IframeHighlightConfig): void => {
  applyBorder(iframe, config.color, '5px');
  if (iframe.parentElement) {
    applyRelativePosition(iframe.parentElement);
    const label = createLabel({
      type: 'techstack',
      text: config.labelText,
      color: config.color,
    });
    iframe.parentElement.insertBefore(label, iframe);
  }
};

/**
 * iframe 내부의 React Modal을 하이라이트합니다.
 */
const highlightReactModalInIframe = (iframeDocument: Document, config: IframeHighlightConfig): void => {
  const backdrop = iframeDocument.querySelector('[data-shoplflow="BackDrop"]');
  const modal = backdrop?.querySelector('[data-shoplflow="Modal"]');

  if (modal) {
    const modalElement = modal as HTMLElement;
    applyBorder(modalElement, config.color, '5px');
    applyRelativePosition(modalElement);
    const label = createLabel({
      type: 'techstack',
      text: config.labelText,
      color: config.color,
    });
    insertLabelAsFirstChild(modalElement, label);
  }
};

/**
 * iframe 내부의 React Section을 하이라이트합니다.
 */
const highlightReactSectionInIframe = (
  iframe: HTMLIFrameElement,
  iframeDocument: Document,
  config: IframeHighlightConfig,
): void => {
  const iframeUrl = iframe.src || iframeDocument.URL;

  if (iframeUrl.includes('/dv2/') && !iframe.classList.contains('modal-frame')) {
    const body = iframeDocument.body;
    if (body) {
      applyBorder(body, config.color);
      applyRelativePosition(body);
      const label = createLabel({
        type: 'techstack',
        text: config.labelText,
        color: config.color,
      });
      insertLabelAsFirstChild(body, label);
    }
  }
};

/**
 * iframe을 처리하는 공통 로직입니다.
 */
export const handleIframe = (element: HTMLElement, type: 'React_Modal' | 'React_Section'): void => {
  if (element.tagName.toLowerCase() !== 'iframe') return;
  const iframe = element as HTMLIFrameElement;
  const config = {
    type,
    color: ResultInfoByType[type].color,
    labelText: type,
  };
  try {
    const iframeDocument = iframe.contentDocument;
    if (!iframeDocument) {
      applyIframeFallback(iframe, config);
      return;
    }

    if (type === ResultType.React_Modal) {
      highlightReactModalInIframe(iframeDocument, config);
    } else if (type === ResultType.React_Section) {
      highlightReactSectionInIframe(iframe, iframeDocument, config);
    }
  } catch (e) {
    console.error('Error accessing iframe content:', e);
    applyIframeFallback(iframe, config);
  }
};

export const highlightPage = (element: HTMLElement, type: keyof typeof ResultType) => {
  applyRelativePosition(element);
  const label = createLabel({
    type: 'techstack',
    text: `${ResultType[type]} Page`,
    color: ResultInfoByType[type].color,
  });
  addLabelToElement(element, label);
};
