import { InfoByTechStack, ResultType } from '@/consts';

export type ComponentType = 'React' | 'JSP' | 'React Modal' | 'React Section';

export const highlightComponents = (components: Element[], type: keyof typeof ResultType): void => {
  components.forEach((el) => {
    const element = el as HTMLElement;
    // React Modal / Section
    if (type === ResultType.React_Modal || type === ResultType.React_Section) {
      if (element.tagName.toLowerCase() === 'iframe') {
        handleIframe(element as HTMLIFrameElement, type);
      }
      // React Page
    } else if (type === ResultType.React) {
      if (element.style.position === '' || element.style.position === 'static') {
        element.style.position = 'relative';
      }
      const label = createLabel(`${type} Page`, InfoByTechStack[ResultType.React].color);
      element.appendChild(label);
      // JSP Page
    } else if (type === 'JSP') {
      if (element.style.position === '' || element.style.position === 'static') {
        element.style.position = 'relative';
      }
      const label = createLabel(`${type} Page`, InfoByTechStack[ResultType.JSP].color);
      element.appendChild(label);
    }
  });
};

const handleIframe = (iframe: HTMLIFrameElement, type: 'React_Modal' | 'React_Section') => {
  try {
    const iframeDocument = iframe.contentDocument;
    if (iframeDocument) {
      const iframeUrl = iframe.src || iframeDocument.URL;

      if (type === ResultType.React_Modal) {
        const backdrop = iframeDocument.querySelector('[data-shoplflow="BackDrop"]');
        const modal = backdrop?.querySelector('[data-shoplflow="Modal"]');

        if (modal) {
          const modalElement = modal as HTMLElement;
          modalElement.style.border = `5px solid ${InfoByTechStack[ResultType.React_Modal].color}`;
          modalElement.style.position = 'relative';
          const label = createLabel('React Modal', InfoByTechStack[ResultType.React_Modal].color);
          modalElement.insertBefore(label, modalElement.firstChild);
        }
      } else if (
        type === ResultType.React_Section &&
        iframeUrl.includes('/dv2/') &&
        !iframe.classList.contains('modal-frame')
      ) {
        const body = iframeDocument.body;
        if (body) {
          body.style.border = `3px solid ${InfoByTechStack[ResultType.React_Section].color}`;
          body.style.position = 'relative';
          const label = createLabel('React Section', InfoByTechStack[ResultType.React_Section].color);
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
};

const createLabel = (text: string, backgroundColor: string) => {
  const label = document.createElement('div');
  Object.assign(label.style, {
    position: 'absolute',
    top: '6px',
    left: '6px',
    background: backgroundColor,
    color: '#ffffff',
    padding: '8px',
    fontSize: '16px',
    zIndex: '10000',
    borderRadius: '6px',
  });
  label.textContent = text;
  label.classList.add('tech-stack-label');
  return label;
};
