
import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    email: null,
    error_message: null,
    error_code:null,
    message: null,
    loading:false,
    displayName:'',
    photoUrl:'',
}
export const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
                return {
                    ...state,
                    token:action.payload?.user?.accessToken,
                    email:action.payload?.user?.email,
                    password:action.payload?.password,
                    displayName:action.payload?.displayName,
                    photoUrl:action.payload?.photoUrl,
                    loading:false,
                }
        case actionTypes.LOGIN_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                error_code: action.payload?.code,
                error_message:action.payload?.message,
                loading:false
            }
        case actionTypes.CLEAR_LOGIN_STATE:
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
