import api from './../services/api';

export default class ShortController {
  constructor() {
    this.api = api;
  }

  async getLinks() {
    const response = await this.api.get(`/links`);    
    return response.data;
  }

  async getLink(code) {
    const response = await this.api.get(`/links/${code}`);    
    return response.data;
  }

  async getStats(code) {
    const response = await this.api.get(`/links/${code}/stats`);    
    return response.data;
  }

  async store(model) {
    const response = await this.api.post(`/links`, model);    
    return response.data;
  }

  async destroy(code) {
    const response = await this.api.delete(`/links/${code}`);
    return response.data;
  }
}