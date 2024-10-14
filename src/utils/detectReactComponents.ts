export interface DetectionResult {
  hasReact: boolean;
  reactRoots: Element[];
  isFullPageReact: boolean;
  reactModals: Element[];
  reactSections: Element[];
}

export const detectReactComponents = (): DetectionResult => {
  const currentUrl = window.location.href;
  const isFullPageReact = currentUrl.includes('/dv2/');

  let reactRoots: Element[] = [];
  const reactModals: Element[] = [];
  const reactSections: Element[] = [];

  if (isFullPageReact) {
    reactRoots = [document.body];
  } else {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      try {
        const iframeDocument = (iframe as HTMLIFrameElement).contentDocument;
        if (iframeDocument) {
          const iframeUrl = iframe.src || iframeDocument.URL;
          if (iframeUrl.includes('/dv2/')) {
            if (iframe.classList.contains('modal-frame')) {
              reactModals.push(iframe);
            } else {
              reactSections.push(iframe);
            }
          }
        }
      } catch (e) {
        console.error('Error accessing iframe content:', e);
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
