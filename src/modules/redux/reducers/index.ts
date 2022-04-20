import { combineReducers } from "redux";
import { logOutActionTypes } from "../actions/user";
import { homeReducer } from "./homeReducer";
import { userReducer } from "./userReducer";

const appReducer = combineReducers({
    homeReducer,
    userReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === logOutActionTypes.success) {
        console.log('action', action);

        delete state.homeReducer;
        delete state.userReducer;
    }
    return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;