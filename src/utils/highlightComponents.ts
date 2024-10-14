import { InfoByTechStack, TechStackType, THEME_COLORS } from '@/consts';

export type ComponentType = 'React' | 'JSP' | 'React Modal' | 'React Section';

export const highlightComponents = (components: Element[], type: keyof typeof TechStackType): void => {
  components.forEach((el) => {
    const element = el as HTMLElement;
    if (type === TechStackType.React_Modal || type === TechStackType.React_Section) {
      if (element.tagName.toLowerCase() === 'iframe') {
        handleIframe(element as HTMLIFrameElement, type);
      }
    } else if (type === 'React') {
      // element.style.border = `3px solid ${THEME_COLORS.React}`;
      if (element.style.position === '' || element.style.position === 'static') {
        element.style.position = 'relative';
      }
      const label = createLabel(`${type} Page`, THEME_COLORS.React);
      element.appendChild(label);
    } else if (type === 'JSP') {
      // JSP의 경우 border 스타일링 없이 라벨만 추가
      if (element.style.position === '' || element.style.position === 'static') {
        element.style.position = 'relative';
      }
      const label = createLabel(`${type} Page`, THEME_COLORS.JSP);
      element.appendChild(label);
    }
  });
};

function handleIframe(iframe: HTMLIFrameElement, type: 'React_Modal' | 'React_Section'): void {
  try {
    const iframeDocument = iframe.contentDocument;
    if (iframeDocument) {
      const iframeUrl = iframe.src || iframeDocument.URL;

      if (type === TechStackType.React_Modal) {
        const backdrop = iframeDocument.querySelector('[data-shoplflow="BackDrop"]');
        const modal = backdrop?.querySelector('[data-shoplflow="Modal"]');

        if (modal) {
          const modalElement = modal as HTMLElement;
          modalElement.style.border = `5px solid ${THEME_COLORS['React Modal']}`;
          modalElement.style.position = 'relative';
          const label = createLabel('React Modal', THEME_COLORS['React Modal']);
          modalElement.insertBefore(label, modalElement.firstChild);
        }
      } else if (
        type === TechStackType.React_Section &&
        iframeUrl.includes('/dv2/') &&
        !iframe.classList.contains('modal-frame')
      ) {
        const body = iframeDocument.body;
        if (body) {
          body.style.border = `3px solid ${THEME_COLORS['React Section']}`;
          body.style.position = 'relative';
          const label = createLabel('React Section', THEME_COLORS['React Section']);
          body.insertBefore(label, body.firstChild);
        }
      }
    }
  } catch (e) {
    console.error('Error accessing iframe content:', e);
    // Fallback: iframe 자체에 스타일 적용
    iframe.style.border = `5px solid ${InfoByTechStack[type].color}`;
    if (iframe.parentElement) {
      iframe.parentElement.style.position = 'relative';
      const label = createLabel(type, InfoByTechStack[type].color);
      iframe.parentElement.insertBefore(label, iframe);
    }
  }
}

function createLabel(text: string, backgroundColor: string): HTMLDivElement {
  const label = document.createElement('div');
  Object.assign(label.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    background: backgroundColor,
    color: text.includes('JSP') ? 'black' : 'white',
    padding: '6px',
    fontSize: '16px',
    zIndex: '10000',
  });
  label.textContent = text;
  label.classList.add('tech-stack-label');
  return label;
}
