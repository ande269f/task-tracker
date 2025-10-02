import axios from "../API/client";
import JwtHandler from "./JwtHandler";

export default class Login {
  username: string | null;
  jwtHandler = new JwtHandler();

  constructor(username: string | null) {
    this.username = username;
  }

  static submit = async (
    username: string | null,
    password: string | null = null
  ) => {
    try {
      const response = await axios.post("users/login/", {
        username,
        password,
      });
      if (response.data.token) {
        const jwtHandler = new JwtHandler();
        jwtHandler.safeJwtToken(response.data.token);
        return "SUCCESS";
      } else return response.data;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("login fails " + e);
    }
  };

  static createNewUser = async (username: string) => {
    try {
      const response = await axios.post("users/createNewUser/" + username);
      return response.data;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("create new user fails");
    }
  };

  static setUserPassword = async (username: string | null, password: string) => {
    try {
      const response = await axios.post(
        "users/setUserPassword/" + username + "/" + password
      );
      return response.data as string;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("setting user password fails");
    }
  };

  deleteUser = async (username = this.username) => {
    try {
      const response = await axios.post("users/deleteUser/" + username);
      return response;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("deleting user fails");
    }
  };

  deactivateUser = async (username = this.username) => {
    try {
      const response = await axios.post("users/deactivateUser/" + username);
      return response;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("deactivating user fails");
    }
  };

  static checkLogin = async () => {
    try {
      const response = await axios.get("checkLogin/");
      return response.data;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("checkLogin fails" + e);
      return "";
    }
  };
}
