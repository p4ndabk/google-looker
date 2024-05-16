import axios from "axios";

export default class Authentication {
  constructor() {
    this.axios = axios.create({
      baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    });
  }

  async login(loginData) {
    return this.axios.post("/login", loginData);
  }
}
