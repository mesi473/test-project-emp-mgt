
import * as actionTypes from '../actionTypes';

const initialState = {
    employees:[],
    error_message: null,
    error_code:null,
    message: null,
    loading:false,
}
export const AddEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EMPLOYEE_SUCCESS:
                return {
                    ...state,
                    message:action.payload,
                    loading:false,
                }
        case actionTypes.ADD_EMPLOYEE_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.ADD_EMPLOYEE_ERROR:
            return {
                ...state,
                error_code: action.payload?.code,
                error_message:action.payload?.message,
                loading:false
            }
        case actionTypes.CLEAR_ADD_EMPLOYEE_STATE:
            return {
                error_message:null,
                error_code:null,
                loading:false,
                message:null
            }
        default:
            return {
                ...state
            }
    }
}
export const GetEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_EMPLOYEE_SUCCESS:
                return {
                    ...state,
                    employees:action.payload,
                    loading:false,
                }
        case actionTypes.GET_EMPLOYEE_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.GET_EMPLOYEE_ERROR:
            return {
                ...state,
                error_code: action.payload?.code,
                error_message:action.payload?.message,
                loading:false
            }
        case actionTypes.CLEAR_GET_EMPLOYEE_STATE:
            return {
                error_message:null,
                error_code:null,
                loading:false,
                message:null
            }
        default:
            return {
                ...state
            }
    }
}

export const DeleteEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_EMPLOYEE_SUCCESS:
                return {
                    ...state,
                    message:action.payload,
                    loading:false,
                }
        case actionTypes.DELETE_EMPLOYEE_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.DELETE_EMPLOYEE_ERROR:
            return {
                ...state,
                error_code: action.payload?.code,
                error_message:action.payload?.message,
                loading:false
            }
        case actionTypes.CLEAR_DELETE_EMPLOYEE_STATE:
            return {
                error_message:null,
                error_code:null,
                loading:false,
                message:null
            }
        default:
            return {
                ...state
            }
    }
}
