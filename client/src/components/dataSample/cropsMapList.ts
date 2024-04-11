import cropsType from "@/components/dataSample/cropsType";
import warehouseDetailData from "@/components/dataSample/warehouseData";

const index = 0;

export const CropsMapList: CropsMapProps[] = [
    {
        id: 1,
        cropName: cropsType[index].label,
        price: 1000,
        img: cropsType[index].image,
        farmerName: "John Doe",
        farmerLocation:
            warehouseDetailData[index].city,
        farmerContact: parseInt(warehouseDetailData[index].phoneNo),
        city: "Accra",
    },
    {
        id: 2,
        cropName: cropsType[index + 1].label,
        price: 2000,
        img: cropsType[index + 1].image,
        farmerName: "Jane Doe",
        farmerLocation:
            warehouseDetailData[index + 1].city,
        farmerContact:
            parseInt(warehouseDetailData[index + 1].phoneNo),
        city: "Kumasi",
    },
    {
        id: 3,
        cropName: cropsType[index + 2].label,
        price: 3000,
        img: cropsType[index + 2].image,
        farmerName: "Doe Doe",
        farmerLocation:
            warehouseDetailData[index + 2].city,
        farmerContact:
            parseInt(warehouseDetailData[index + 2].phoneNo),
        city: "Tamale",
    },
    {
        id: 4,
        cropName: cropsType[index + 3].label,
        price: 4000,
        img: cropsType[index + 3].image,
        farmerName: "John Doe",
        farmerLocation:
            warehouseDetailData[index + 3].city,
        farmerContact: parseInt(warehouseDetailData[index + 3].phoneNo),
        city: "Ho",
    },
    {
        id: 5,
        cropName: cropsType[index + 4].label,
        price: 5000,
        img: cropsType[index + 4].image,
        farmerName: "Jane Doe",
        farmerLocation:
            warehouseDetailData[index + 4].city,
        farmerContact: parseInt(warehouseDetailData[index + 4].phoneNo),
        city: "Sunyani",
    },
    {
        id: 6,
        cropName: cropsType[index + 5 | 0].label,
        price: 6000,
        img: cropsType[index + 5 | 0].image,
        farmerName: "Doe Doe",
        farmerLocation:
            warehouseDetailData[0].city,
        farmerContact:
            parseInt(warehouseDetailData[0].phoneNo),
        city: "Bolgatanga",
    }
];