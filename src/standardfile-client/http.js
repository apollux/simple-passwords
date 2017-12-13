import _ from 'lodash';
import axios from 'axios';

export default class Http {
  constructor(url) {
    this.url = url;
    this.token = null;
    this.axios = axios.create({
      baseURL: url,
      headers: { 'X-Custom-Header': 'foobar' }
    });
  }

  async post(path, data) {
    const headers = {};
    if (this.token) {
      _.set(headers, 'Authorization', `Bearer ${this.token}`);
    }
    const response = await this.axios.post(path, data, {
      headers
    });

    return response.data;
  }

  async get(path, params) {
    const response = await this.axios.get(path, {
      params
    });

    return response.data;
  }
}
