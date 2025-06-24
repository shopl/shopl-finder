import { getTeckStackResult } from '@/services/techStack/getTeckStackResult';
import { getShoplflowResult } from '@/services/shoplflow/getShoplflowResult';
import { highlightTeckStack } from '@/services/techStack/highlightTeckStack';
import { highlightShoplflowComponents } from '@/services/shoplflow/highlightShoplflowComponents';
import { resetLabelAndHighlight } from '@/services/reset/resetLabelAndHighlight';


const FindStrategyMap = {
  'detect-techstack': {
    result: () => getTeckStackResult(),
    callback:() => highlightTeckStack(),
  },
  'detect-shoplflow': {
    result: () => getShoplflowResult(),
    callback:() => highlightShoplflowComponents(),
  },
  'reset-highlights': {
    result: () => Promise.resolve('모든 하이라이팅이 초기화되었습니다.'),
    callback:() => resetLabelAndHighlight(),
  },
}

chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    const result = await FindStrategyMap[request.action].result();
    FindStrategyMap[request.action].callback();
    return sendResponse({ result });
  },
);
