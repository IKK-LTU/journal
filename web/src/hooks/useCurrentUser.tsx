import { clearUser } from "@/store/features/user";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const useCurrentUser = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const removeUser = () => {
    dispatch(clearUser());
  };

  return {
    currentUser: user,
    removeUser,
  };
};

export default useCurrentUser;
