// import React from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class DeviceStorage {
  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */

  static get(key: string) {
    return AsyncStorage.getItem(key).then((value: string | null) => {
      if (value === null) {
        value = '';
      }
      const jsonValue = JSON.parse(value);
      // console.log('jsonValue', jsonValue);

      return jsonValue;
    });
  }

  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static save(key: string, value: Array<TodoItem>) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key: string, value: TodoItem) {
    return DeviceStorage.get(key).then((item: Array<TodoItem>) => {
      value =
        typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  /**
   * 更新
   * @param key
   * @returns {*}
   */
  static delete(key: string) {
    return AsyncStorage.removeItem(key);
  }
}

export default DeviceStorage;
