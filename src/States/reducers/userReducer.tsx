import { LOGIN, LOGOUT } from "../ActionTypes";
import { IUser, StateActions } from "../interfaces";

const userReducer = (user: IUser, action: StateActions) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return { ...user, ...payload };
    case LOGOUT:
      return { ...user, username: "", active: false };
    default:
      return user;
  }
};
export default userReducer;