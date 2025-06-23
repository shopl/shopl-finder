export const ResultType = {
  JSP: 'JSP',
  React: 'React',
  React_Modal: 'React_Modal',
  React_Section: 'React_Section',
  Shoplflow: 'Shoplflow',
} as const;

export const ResultInfoByType = {
  JSP: { notice: 'JSP로 만들어진 페이지에요', color: '#E66F0A' },
  React: { notice: 'React로 만들어진 페이지에요', color: '#04D5F5' },
  React_Modal: { notice: 'React로 만들어진 Modal이에요', color: '#04D5F5' },
  React_Section: { notice: 'JSP 페이지에 React가 부분 적용 되어있어요', color: '#04D5F5' },
  Shoplflow: { notice: 'Shoplflow 컴포넌트가 발견되었어요', color: '#8D4CF6' },
} as const;

/**
 * 하이라이팅에서 제외할 Shoplflow 컴포넌트 타입들
 */
export const EXCLUDE_SHOPLFLOW_TYPES = [
  'Stack',
  'Popper',
  'StackContainer',
  'Text',
  'shopl',
  'BackDrop',
  'ScrollArea',
] as const;
