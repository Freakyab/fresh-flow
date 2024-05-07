'use client';

import { AppDispatch,RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';


import { cropMapAction  } from '@/redux/reducers/cropsMap';

const useCropsMap = () => {

    const cropState = useSelector((state : RootState) => state.cropsMap);
    const dispatch = useDispatch<AppDispatch>();

    const setCrops = (cropList: CropsMarketPlaceProps[]) => {
        dispatch(cropMapAction.setCrops(cropList));
    };

    const setFilter = ({ cropName , priceRange , location } : filterProps) => {
        console.log(cropName, priceRange, location);
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