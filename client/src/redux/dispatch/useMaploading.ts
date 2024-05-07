'use client';

import { AppDispatch,RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { mapLoadingAction } from '@/redux/reducers/mapLoading';

const useMapLoading = () => {

    const mapState = useSelector((state: RootState) => state.mapLoading);
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

    const changeIsClicked = (isClicked: boolean) => {
        dispatch(mapLoadingAction.changeIsClicked(isClicked));
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

    const setFilterCrop = (filterCrop: string) => {
        dispatch(mapLoadingAction.setFilterCrop(filterCrop));
    }

    const getFilterCrop = () => {
        return mapState.filterCrop;
    }

    return {
        mapState,
        setFlyOn,
        setSearch,
        setLoc,
        changeIsClicked,
        getFlyOn,
        getSearch,
        getLoc,
        getIsClicked,
        setFilterCrop,
        getFilterCrop
    };
};

export default useMapLoading;

