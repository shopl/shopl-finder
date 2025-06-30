export interface ShoplflowComponent {
  element: Element;
  componentName: string;
}

export interface FindShoplflowResult {
  hasShoplflow: boolean;
  shoplflowComponents: ShoplflowComponent[];
  totalCount: number;
  excludedCount: number;
}
