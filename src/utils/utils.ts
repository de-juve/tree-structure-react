export default class Utils {
  public static is(type: string, obj: any) {
    const clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }

  static isObject(obj: any) {
    return Utils.is('Object', obj);
  }

  static isNumber(num: any) {
    return Utils.is('Number', num);
  }

  static isString(str: any): boolean {
    return Utils.is('String', str);
  }

  static isBoolean(bol: any) {
    return Utils.is('Boolean', bol);
  }

  static isDate(date: any) {
    return Utils.is('Date', date);
  }

  static isArray(arr: any) {
    return Utils.is('Array', arr);
  }

  public static getType(obj: any) {
    if (obj === undefined) {
      return undefined;
    }
    if (obj === null) {
      return null;
    }
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  public static isEmpty(val: string | number) {
    return val === null || val === undefined || val === '';
  }
}
