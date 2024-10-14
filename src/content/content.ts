import { detectAndHighlight } from '../services/detectAndHighlight';

function removeHighlights() {
  // Remove labels
  document.querySelectorAll('.tech-stack-label').forEach((el) => {
    el.remove();
  });

  // Remove borders
  document.querySelectorAll('[style*="border"]').forEach((el: Element) => {
    if (el instanceof HTMLElement) {
      el.style.border = '';
    }
  });
}

chrome.runtime.onMessage.addListener(
  (
    request: { action: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: { result: string } | { success: boolean }) => void,
  ) => {
    if (request.action === 'detect') {
      const result = detectAndHighlight();
      sendResponse({ result });
    } else if (request.action === 'removeHighlights') {
      removeHighlights();
      sendResponse({ success: true });
    }
    return true;
  },
);
