import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class APIBase {
  public axios: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axios = Axios.create(config);
  }
}
