export interface Component {
  template: HTMLElement;
  init: () => void;
  createTemplate: () => void;
  handle: () => void;
}