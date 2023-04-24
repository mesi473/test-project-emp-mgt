import * as actionTypes from "../actionTypes";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import FirebaseApp from "../../auth/firebaseConfig";

export const LoginAction = (userData) => async (dispatch) => {
  const auth = getAuth(FirebaseApp);
  dispatch({
    type: actionTypes.LOGIN_START,
  });

  signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
            user: user,
            password: userData.password,
          },
        });
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("email", user.email);
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: err,
      });
    });
};
export const LoginWithGoogleAction = () => async (dispatch) => {
  const auth = getAuth(FirebaseApp);
  dispatch({
    type: actionTypes.LOGIN_START,
  });
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (user) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
            user: user,
            displayName:user.reloadUserInfo.displayName,
            photoUrl:user.reloadUserInfo.photoUrl

          },
        });
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("email", user.email);
      }
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: error,
      });
    });
};

export const ClearLoginAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_LOGIN_STATE,
  });
};
