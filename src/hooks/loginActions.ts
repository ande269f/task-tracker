import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login } from "../store/slices/loginSlice/thunks";
import { setUsername } from "../store/slices/loginSlice/loginSlice";

export const useLoginActions = () => {
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: { username: string; password: string }) => {
    dispatch(setUsername({ username: data.username }));
    dispatch(login({ username: data.username, password: data.password }));
  };

  return { onSubmit };
};