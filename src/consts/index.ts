export const THEME_COLORS = {
  React: '#84c2fc',
  JSP: '#ffbb00',
  'React Modal': '#84c2fc',
  'React Section': '#84c2fc',
};

export const TechStackType = {
  JSP: 'JSP',
  React: 'React',
  React_Modal: 'React_Modal',
  React_Section: 'React_Section',
} as const;

export const InfoByTechStack = {
  JSP: { notice: 'JSP로 만들어진 페이지에요', color: '#ffbb00' },
  React: { notice: 'React로 만들어진 페이지에요', color: '#84c2fc' },
  React_Modal: { notice: 'React로 만들어진 Modal이에요', color: '#84c2fc' },
  React_Section: { notice: 'JSP 페이지이지만 부분적으로 React가 적용되어 있어요', color: '#84c2fc' },
} as const;
