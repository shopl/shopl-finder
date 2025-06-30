export interface FindReactComponentsResult {
  hasReact: boolean;
  reactRoots: Element[];
  isFullPageReact: boolean;
  reactModals: Element[];
  reactSections: Element[];
}

export const findReactComponents = (): FindReactComponentsResult => {
  const currentUrl = window.location.href;
  const isFullPageReact = currentUrl.includes('/dv2/');

  let reactRoots: Element[] = [];
  const reactModals: Element[] = [];
  const reactSections: Element[] = [];

  const classifyIframe = (iframe: HTMLIFrameElement) => {
    if (!iframe.contentDocument) {
      return;
    }
    const iframeUrl = iframe.src || iframe.contentDocument.URL;
    if (iframeUrl.includes('/dv2/')) {
      if (iframe.classList.contains('modal-frame')) {
        return reactModals.push(iframe);
      }
      reactSections.push(iframe);
    }
  };

  if (isFullPageReact) {
    reactRoots = [document.body];
  } else {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      try {
        classifyIframe(iframe);
      } catch (e) {
        console.error('error: iframe content:', e);
      }
    });
  }

  return {
    hasReact: isFullPageReact || reactModals.length > 0 || reactSections.length > 0,
    reactRoots: reactRoots,
    isFullPageReact: isFullPageReact,
    reactModals: reactModals,
    reactSections: reactSections,
  };
};
