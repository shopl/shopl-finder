import { ResultInfoByType, ResultType } from '@/consts';
import { findShoplflow } from '@/services/shoplflow/findShoplflow';

export const getShoplflowResult = (): string => {
  const { hasShoplflow, shoplflowComponents, excludedCount } = findShoplflow();

  if (hasShoplflow && shoplflowComponents.length > 0) {
    const baseMessage = `${ResultInfoByType[ResultType.Shoplflow].notice}`;
    return baseMessage;
  }

  if (excludedCount > 0) {
    return `Shoplflow 컴포넌트가 ${excludedCount}개 발견되었지만 모두 제외 타입이에요`;
  }

  return 'Shoplflow 컴포넌트가 발견되지 않았어요';
};
