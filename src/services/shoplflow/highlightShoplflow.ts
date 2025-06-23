import { ResultInfoByType, ResultType } from '@/consts';
import { detectShoplflowComponents } from '@/utils/detectShoplflowComponents';
import { highlightShoplflowComponents } from './shoplflowStrategies';

/**
 * Shoplflow 컴포넌트를 탐지하고 하이라이트합니다.
 */
export const highlightShoplflow = (): string => {
  const { hasShoplflow, shoplflowComponents, totalCount, excludedCount } = detectShoplflowComponents();

  if (hasShoplflow && shoplflowComponents.length > 0) {
    // 탐지된 shoplflow 컴포넌트들을 하이라이트
    highlightShoplflowComponents(shoplflowComponents);

    const baseMessage = `${ResultInfoByType[ResultType.Shoplflow].notice} (${totalCount}개 발견)`;
    const excludeMessage = excludedCount > 0 ? ` · ${excludedCount}개 제외됨` : '';

    return baseMessage + excludeMessage;
  }

  if (excludedCount > 0) {
    return `Shoplflow 컴포넌트가 ${excludedCount}개 발견되었지만 모두 제외 타입이에요`;
  }

  return 'Shoplflow 컴포넌트가 발견되지 않았어요';
};
