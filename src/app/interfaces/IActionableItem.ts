export interface IActionableItem{
  label: string;
  action: () => boolean;
  params: Array<any>;
}
