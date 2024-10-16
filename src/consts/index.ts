export const ResultType = {
  JSP: 'JSP',
  React: 'React',
  React_Modal: 'React_Modal',
  React_Section: 'React_Section',
} as const;

export const InfoByTechStack = {
  JSP: { notice: 'JSP로 만들어진 페이지에요', color: '#E66F0A' },
  React: { notice: 'React로 만들어진 페이지에요', color: '##04D5F5' },
  React_Modal: { notice: 'React로 만들어진 Modal이에요', color: '##04D5F5' },
  React_Section: { notice: 'JSP 페이지에 부분적으로 React가 적용되어 있어요', color: '##04D5F5' },
} as const;
