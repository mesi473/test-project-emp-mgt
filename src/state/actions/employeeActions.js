import * as actionTypes from "../actionTypes";
import FirebaseApp from "../../auth/firebaseConfig";
import { getDatabase, ref, set,  onValue ,remove} from "firebase/database";

export const AddEmployeeAction = (values) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_EMPLOYEE_START,
  });
  const db = getDatabase(FirebaseApp);
  set(ref(db, "employee/" + values?.fullName), values)
    .then((res) => {
      dispatch({
        type: actionTypes.ADD_EMPLOYEE_SUCCESS,
        payload: "action successfuly done",
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.ADD_EMPLOYEE_ERROR,
        payload: err,
      });
    });
};

export const ClearAddEmployeeState = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ADD_EMPLOYEE_STATE,
  });
};

export const GetEmployeeAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_EMPLOYEE_START,
  });
  const db = getDatabase(FirebaseApp);
  const dbRef = ref(db, "employee");

  onValue(dbRef, (snapshot) => {
    var employees = [];
    snapshot.forEach((element) => {
      const data = element.val();
      employees.push(data);
    });
    dispatch({
      type: actionTypes.GET_EMPLOYEE_SUCCESS,
      payload: employees,
    });
  },(err)=>{
    dispatch({
      type: actionTypes.GET_EMPLOYEE_ERROR,
      payload: err,
    });
  });
};

export const ClearGetEmployeeState = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_GET_EMPLOYEE_STATE,
  });
};

export const DeleteEmployeeAction = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_EMPLOYEE_START,
  });
  const db = getDatabase(FirebaseApp);
  const dbRef = ref(db, "employee/"+value);
  remove(dbRef).then(()=>{
    dispatch({
      type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
      payload: "employee data have been deleted",
    });
  }).catch(err=>{
    dispatch({
      type: actionTypes.DELETE_EMPLOYEE_ERROR,
      payload: err,
    });
  })
};

export const ClearDeleteEmployeeState = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_DELETE_EMPLOYEE_STATE,
  });
};
