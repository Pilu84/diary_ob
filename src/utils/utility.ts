import { EnumType, EnumValue, ObjExp } from "./types/types";



export class Utility {

  public static sortBy<ENUM extends EnumType, T>(sortEnum: ENUM, sortType: string, data: Array<T>, key: string): Array<T> {

    if (Utility.getenumValue(sortEnum, sortType) === 'asc') {
      return data.sort((a: any, b: any) => a[key].toString().toLocaleLowerCase() - b[key].toString().toLocaleLowerCase());
    }

    return data.sort((a: any, b: any) => b[key].toString().toLocaleLowerCase() - a[key].toString().toLocaleLowerCase());
  }

  public static getEnumValueFromKey<ENUMTYPE extends EnumType>(
    en: ENUMTYPE,
    enumStringKey: string
  ): EnumValue<ENUMTYPE> {
    return (en as ObjExp)[enumStringKey];
  }

  public static getenumValue<ENUMTYPE extends EnumType>(
    en: ENUMTYPE,
    enumStringKey: string
  ): string {
    const keys: Array<string | number> = Object.keys(en)
      .filter((key) => !isNaN(Number(key)) || (typeof en[key] === "string"))
      .map((key) => !isNaN(Number(key)) ? Number(key) : key)
      .filter((key) => key === enumStringKey);

    return keys[0] as string;


  }


  public static getEnumValuesArray<ENUMTYPE extends EnumType>(en: ENUMTYPE): Array<EnumValue<ENUMTYPE>> {
    const keys: Array<string | number> = Object.keys(en)
      .filter((key) => !isNaN(Number(key)) || (typeof en[key] === "string"))
      .map((key) => !isNaN(Number(key)) ? Number(key) : key);

    return keys as any;
  }

}