export type TSidebarItem = {
  key: string;
  to?: JSX.Element | string;
  label: JSX.Element | string;
  children?: TSidebarItem[];
};

export type TUserPath = {
  name: string;
  path?: string;
  element?: JSX.Element;
  children?: TUserPath[];
};
