// import store from '../store';
import types from '../types';
import axios from 'axios'
import { store, persistor } from '../store';
import { BaseUrl } from '../../config/urls'
const { dispatch } = store;


const saveUserData = data => {

    return {
        type: types.LOGIN,
        payload: data,
    }
};

const login = (data) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(BaseUrl + 'login', data, { headers: { 'accept': 'application/json' } })
                .then(res => {

                    if (res.data.status == "SUCCESS") {
                        // setUserData(res)
                        dispatch(saveUserData(res.data.response))
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export {
    login,
};

// export function login(data) {
//     console.log(data)
//     saveUserData(data)

// }