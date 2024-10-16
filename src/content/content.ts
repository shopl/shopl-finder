import { detectAndHighlight } from '../services/detectAndHighlight';

chrome.runtime.onMessage.addListener(
  (
    request: { action: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: { result: string } | { success: boolean }) => void,
  ) => {
    if (request.action === 'detect') {
      const result = detectAndHighlight();
      return sendResponse({ result });
    }

    return true;
  },
);
