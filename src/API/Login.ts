import axios from "../API/client"
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { setUserLoggedIn, setUsername } from "../store/slices/userSlice";
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

  submit = async (username = this.username) => {
    try {
      const response = await axios.get("users/" + username);
      this.checkBackendResponse(response.data);
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("submit fails");
    }
  };

  createNewUser = async (username = this.username) => {
    try {
      await axios.post("createNewUser/" + username);
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("create new user fails");
    }
  }

  setUserPassword = async (username = this.username, password: string) => {
    try {
      await axios.post("setUserPassword/" + username);
    } catch (e) {
      //der er ikke forbindelse til back-enden
      console.log("create new user fails");
    }
  }


}
