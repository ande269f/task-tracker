import axios from "../API/client"
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { setUserLoggedIn, setUsername } from "../store/slices/loginSlice";
import { AppDispatch } from "../store";

export default class Login {
  username: string;
  dispatch: AppDispatch;

  constructor(
    username: string,
    dispatch: AppDispatch
  ) {
    this.username = username;
    this.dispatch = dispatch;

  }

  checkBackendResponse = (data: any) => {
    if (data === null || data === "") {
      this.dispatch(
        setDetailsDialogState({
          taskObject: null,
          dialogboxType: "newUserDialog",
          dialogboxOpened: true,
        }),
        this.dispatch(setUsername({username: this.username}))
      );
    } else
      this.dispatch(
        setUserLoggedIn({ username: data.username, userId: data.userId })
      );
  };

  submit = async (username = this.username, password: string | null = null) => {
    try {
      const response = await axios.get("users/getUser/" + username + "/" + password);
      this.checkBackendResponse(response.data);
      return response;
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("submit fails");
    }
  };

  createNewUser = async (username = this.username) => {
    try {
      const response = await axios.post("users/createNewUser/" + username);
      return response
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("create new user fails");
    }
  }

  setUserPassword = async (username = this.username, password: string) => {
    try {
      await axios.post("users/setUserPassword/" + username + "/" + password);
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
