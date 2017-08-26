import { TabTypeEnum } from '../constants/Enums';

export interface ITab{
  id: string;
  label: string;
  link: string;
  icon: string;
  security: ITabSecurity;
}

interface ITabSecurity{
  Type: TabTypeEnum;
  Scopes: Array<string>;
}