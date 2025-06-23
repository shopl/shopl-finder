export interface ShoplflowComponent {
  element: Element;
  componentName: string;
}

export interface ShoplflowDetectionResult {
  hasShoplflow: boolean;
  shoplflowComponents: ShoplflowComponent[];
  totalCount: number;
  excludedCount: number;
}
