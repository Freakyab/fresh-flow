'use client';

import { AppDispatch,RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { mapLoadingAction } from '@/redux/reducers/mapLoading';

const useMapLoading = () => {

    const mapState = useSelector((state : RootState) => state.mapLoading);
    const dispatch = useDispatch<AppDispatch>();

    const setFlyOn = (lat: number, lng: number) => {
        dispatch(mapLoadingAction.setFlyOn({ lat, lng }));
    };

    const setSearch = (search: string) => {
        dispatch(mapLoadingAction.setSearch(search.toString().toLowerCase()));
    };

    const setLoc = (lat: number, lng: number) => {
        dispatch(mapLoadingAction.setLoc({ lat, lng }));
    };

    const setIsClicked = (isClicked: boolean) => {
        dispatch(mapLoadingAction.setIsClicked(isClicked));
    };

    const getFlyOn = () => {
        return mapState.FlyOn;
    };

    const getSearch = () => {
        return mapState.search;
    };

    const getLoc = () => {  
        return mapState.loc;
    };

    const getIsClicked = () => {
        return mapState.isClicked;
    };

    return {
        mapState,
        setFlyOn,
        setSearch,
        setLoc,
        setIsClicked,
        getFlyOn,
        getSearch,
        getLoc,
        getIsClicked,
    };
};

export default useMapLoading;

