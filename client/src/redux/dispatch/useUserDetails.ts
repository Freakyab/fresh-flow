'use client';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { userDetailsAction } from '@/redux/reducers/userDetails';

const useUserDetails = () => {
    const userDetails = useSelector((state: RootState) => state.userDetails);
    const dispatch = useDispatch<AppDispatch>();

    const signup = (username: string, _id: string,token : string,type : string) => {
        dispatch(userDetailsAction.signup({ username, _id ,token,type}));
    };

    const logout = () => {
        dispatch(userDetailsAction.logout());
    };

    const getUserDetails = () => {
        return userDetails;
    }

    const typeOfUser = () => {
        return userDetails.userDetails.type;
    } 
    
    return {
        userDetails,
        signup,
        logout,
        getUserDetails,
        typeOfUser
    };
};

export default useUserDetails;