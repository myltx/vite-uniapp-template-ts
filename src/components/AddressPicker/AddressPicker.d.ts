export interface TabItem {
  name: string;
  index: number;
  list: any[];
}
export interface OptionsItem {
  label?: string;
  value?: string;
  children: OptionsItem[] | null;
  level: number;
  code?: string;
  [key: string]: any;
}
