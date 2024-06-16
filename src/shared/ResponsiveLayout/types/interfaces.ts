export interface IWidth {
  left: number;
  center: number;
  right: number;
  tabletLeft: number;
  tabletRight: number;
}

export interface IWidthSetters {
  setLeftWidth: React.Dispatch<React.SetStateAction<number>>;
  setCenterWidth: React.Dispatch<React.SetStateAction<number>>;
  setRightWidth: React.Dispatch<React.SetStateAction<number>>;
  setTabletLeftWidth: React.Dispatch<React.SetStateAction<number>>;
  setTabletRightWidth: React.Dispatch<React.SetStateAction<number>>;
}
