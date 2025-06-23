/**
 * 📋 TechStack 하이라이터 전략들
 *
 * 책임: React, JSP, React_Modal, React_Section 등 기술 스택 관련 컴포넌트 하이라이팅
 * 범위: iframe 기반 컴포넌트 처리 로직 포함
 */

import { ResultInfoByType, ResultType } from '@/consts';
import { HighlightStrategy, IframeHighlightConfig } from '@/types/highlighter';
import {
  applyRelativePosition,
  createLabel,
  addLabelToElement,
  insertLabelAsFirstChild,
  applyBorder,
} from '@/utils/domUtils';

/**
 * React 페이지를 하이라이트합니다.
 */
export const highlightReactPage: HighlightStrategy = (element: HTMLElement) => {
  applyRelativePosition(element);
  const label = createLabel({
    type: 'techstack',
    text: `${ResultType.React} Page`,
    color: ResultInfoByType[ResultType.React].color,
  });
  addLabelToElement(element, label);
};

/**
 * JSP 페이지를 하이라이트합니다.
 */
export const highlightJSPPage: HighlightStrategy = (element: HTMLElement) => {
  applyRelativePosition(element);
  const label = createLabel({
    type: 'techstack',
    text: `${ResultType.JSP} Page`,
    color: ResultInfoByType[ResultType.JSP].color,
  });
  addLabelToElement(element, label);
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
 * iframe을 처리하는 공통 로직입니다.
 */
const handleIframe = (element: HTMLElement, config: IframeHighlightConfig): void => {
  if (element.tagName.toLowerCase() !== 'iframe') return;

  const iframe = element as HTMLIFrameElement;

  try {
    const iframeDocument = iframe.contentDocument;
    if (!iframeDocument) {
      applyIframeFallback(iframe, config);
      return;
    }

    if (config.type === ResultType.React_Modal) {
      highlightReactModalInIframe(iframeDocument, config);
    } else if (config.type === ResultType.React_Section) {
      highlightReactSectionInIframe(iframe, iframeDocument, config);
    }
  } catch (e) {
    console.error('Error accessing iframe content:', e);
    applyIframeFallback(iframe, config);
  }
};

/**
 * React Modal을 하이라이트합니다.
 */
export const highlightReactModal: HighlightStrategy = (element: HTMLElement) => {
  handleIframe(element, {
    type: ResultType.React_Modal,
    color: ResultInfoByType[ResultType.React_Modal].color,
    labelText: 'React Modal',
  });
};

/**
 * React Section을 하이라이트합니다.
 */
export const highlightReactSection: HighlightStrategy = (element: HTMLElement) => {
  handleIframe(element, {
    type: ResultType.React_Section,
    color: ResultInfoByType[ResultType.React_Section].color,
    labelText: 'React Section',
  });
};
