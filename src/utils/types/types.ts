

export interface Diary {
  readonly id: number;
  title: string;
  content: string;
  date: number;
  tag: Tag;
  filtered?: boolean;
}

export interface Tag {
  name: EnumStringKey<typeof TagEnum>;
  color: string;
}

export enum TagEnum {
  todo = 'Todo',
  important = 'Important',
  privat = 'Privat'
}

export interface TagObj {
  [key: string]: Tag;
}


export enum SortByType {
  asc = "ascending",
  desc = "descending"
}


export type ObjectMap<K extends string | number, V> = { [prop in K]: V }

export type EnumType = ObjectMap<string | number, string | number>;
export type EnumValue<ENUMTYPE extends EnumType> = Exclude<ENUMTYPE[keyof ENUMTYPE], undefined>;
export type EnumStringKey<ENUMTYPE extends EnumType> = keyof ENUMTYPE extends string ? keyof EnumType : never;

export interface ObjExp {
  [prop: string]: any;
}
