import Utils from './utils';

export default class LocalStorageHelper {
  public static set(key: string, value: any) {
    if (LocalStorageHelper.hasLocalStorage()) {
      if (Utils.isString(value)) {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      throw Error('No LocalStorage');
    }
  }

  public static get(key: string): any {
    if (LocalStorageHelper.hasLocalStorage()) {
      let value = localStorage.getItem(key) || null;
      // @ts-ignore
      if (Utils.isString(value) && value[0] === '{' && value[1] === '"') {
        try {
          // @ts-ignore
          value = JSON.parse(value);
        } catch (e) {
          // storageValue = null;
        }
      }
      return value;
    } else {
      throw Error('No LocalStorage');
    }
  }

  public static has(key: string) {
    if (LocalStorageHelper.hasLocalStorage()) {
      return !!localStorage.getItem(key);
    } else {
      throw Error('No LocalStorage');
    }
  }

  public static remove(key: string) {
    if (LocalStorageHelper.hasLocalStorage()) {
      return localStorage.removeItem(key);
    } else {
      throw Error('No LocalStorage');
    }
  }

  public static clear() {
    if (LocalStorageHelper.hasLocalStorage()) {
      return  localStorage.clear();
    } else {
      throw Error('No LocalStorage');
    }
  }

  public static hasLocalStorage() {
    return typeof window !== 'undefined' ? !!window.localStorage : false;
  }
}
