import axios from "../API/client"
import { AppDispatch } from "../store";

export default class Login {
  username: string | null;
  dispatch: AppDispatch;

  constructor(
    username: string | null,
    dispatch: AppDispatch
  ) {
    this.username = username;
    this.dispatch = dispatch;
  }


  submit = async (username: string | null= this.username, password: string | null = null) => {
    try {
      const url = password 
      ? `users/getUser/${username}?password=${password}`
      : `users/getUser/${username}`;
      const response = await axios.get(url);
      return response;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("submit fails");
    }
  };

  createNewUser = async (username = this.username) => {
    try {
      const response = await axios.post("users/createNewUser/" + username)
      return response
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("create new user fails");
    }
  }

  setUserPassword = async (username = this.username, password: string) => {
    try {
      const response = await axios.post("users/setUserPassword/" + username + "/" + password);
      return response
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("setting user password fails");
    }
  }

  deleteUser = async (username = this.username) => {
    try {
      const response = await axios.post("users/deleteUser/" + username);
      return response
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("deleting user fails");
    }
  }

    deactivateUser = async (username = this.username) => {
    try {
      const response = await axios.post("users/deactivateUser/" + username);
      return response
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("deactivating user fails");
    }
  }


}
