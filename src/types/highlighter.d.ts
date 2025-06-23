import { ResultType } from '@/consts';

export type ComponentType = keyof typeof ResultType;

export type HighlightStrategy = (element: HTMLElement) => void;

export type HighlightStrategies = {
  [K in ComponentType]: HighlightStrategy;
};

export interface LabelConfig {
  type: 'techstack' | 'shoplflow';
  text: string;
  color: string;
}

export interface IframeHighlightConfig {
  type: 'React_Modal' | 'React_Section';
  color: string;
  labelText: string;
}
