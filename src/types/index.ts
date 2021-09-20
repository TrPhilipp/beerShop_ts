export interface IBeer {
  id: number
  name: string
  [propName: string]: any
}

export interface IColumn {
  name: string
  items: Array<IBeer>
}

export interface IColumns {
  [propName: string]: IColumn
}
