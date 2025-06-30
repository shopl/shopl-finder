import { getTeckStackResult } from '@/services/techStack/getTeckStackResult';
import { getShoplflowResult } from '@/services/shoplflow/getShoplflowResult';
import { handleReset } from '@/services/reset/handleReset';
import { handleHighlightTechStack } from '@/services/techStack/handleHighlightTechStack';
import { handleHighlightShoplflow } from '@/services/shoplflow/handleHighlightShoplflow';

const FindStrategyMap = {
  'find-techstack': {
    result: () => getTeckStackResult(),
    callback: () => handleHighlightTechStack(),
  },
  'find-shoplflow': {
    result: () => getShoplflowResult(),
    callback: () => handleHighlightShoplflow(),
  },
  'reset-highlights': {
    result: () => Promise.resolve('모든 하이라이팅이 초기화되었습니다.'),
    callback: () => handleReset(),
  },
}

chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    const result = await FindStrategyMap[request.action].result();
    FindStrategyMap[request.action].callback();
    return sendResponse({ result });
  },
);
