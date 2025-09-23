import axios from "../API/client";
import JwtHandler from "./JwtHandler";

export default class Login {
  username: string | null;
  jwtHandler = new JwtHandler();

  constructor(username: string | null) {
    this.username = username;
  }

  submit = async (
    username: string | null = this.username,
    password: string | null = null
  ) => {
    try {
      const url = password
        ? `users/getUser/${username}?password=${password}`
        : `users/getUser/${username}`;
      const response = await axios.get(url);
      if (response.data.token) {
        this.jwtHandler.safeJwtToken(response.data.token);
        return "SUCCESS"
      } else return response.data;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("submit fails " + e);
    }
  };

  createNewUser = async (username = this.username) => {
    try {
      const response = await axios.post("users/createNewUser/" + username);
      console.log(response)
      return response;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("create new user fails");
    }
  };

  setUserPassword = async (username = this.username, password: string) => {
    try {
      const response = await axios.post(
        "users/setUserPassword/" + username + "/" + password
      );
      return response;
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


  checkLogin = async () => {
    try {
      const response = await axios.get("checkLogin/");
      return response.data;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("checkLogin fails" + e);
      return ""
    }
  }
}
