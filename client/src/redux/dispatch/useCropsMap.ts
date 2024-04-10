'use client';

import { AppDispatch,RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CropsMapProps } from '@/redux/reducers/cropsMap';

import { cropMapAction , filterProps } from '@/redux/reducers/cropsMap';

const useCropsMap = () => {

    const cropState = useSelector((state : RootState) => state.cropsMap);
    const dispatch = useDispatch<AppDispatch>();

    const setCrops = (cropList: CropsMapProps[]) => {
        dispatch(cropMapAction.setCrops(cropList));
    };

    const setFilter = ({ cropName , priceRange , location } : filterProps) => {
        dispatch(cropMapAction.setfilter({ cropName , priceRange , location }));
    }

    const getCropsList = () => {
        return cropState.cropList;
    };

    return {
        cropState,
        setCrops,
        setFilter,
        getCropsList,
    };
}

export default useCropsMap;