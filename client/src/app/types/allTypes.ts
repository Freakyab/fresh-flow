type warehouseDetailDataProps = {
    ownerName: string;
    name: string;
    _id: string;
    address: string;
    city: string;
    state: string;
    capacity: string;
    registrationDate: string;
    registrationValidUpto: string;
    phoneNo: string;
    status: string;
    type: string;
    image: string;
    location: number[];
    price: number;
    email: string;
    typeOfCrop: string[];
};

type CropsMapProps = {
    id: number,
    cropName: string,
    price: number,
    img: string,
    farmerName: string,
    farmerLocation: string,
    farmerContact: number ,
    city: string,
}

type filterProps = {
    cropName: string | null,
    priceRange: { min: number, max: number },
    location: string

}

type CustomerOrderCartItemsProps = {
    id: number,
    cropName: string,
    price: number,
    img: string,
    farmerName: string,
    farmerLocation: string,
    farmerContact: number,
    city: string,
    quantity: number,
}

type  TotalSpend = {
    price: number;
    month: string;
}


type farmerOrderListProps = {
    id: number,
    farmerName: string,
    cropName: string,
    price: number,
    img: string,
    farmerLocation: string,
    farmerContact: number,
    city: string,
    quantity: number,
    duration: number,
    email : string
}

type transactionProps = {
    _id : string,
    farmerId: string,
    warehouseId: string,
    farmerName : string,
    warehouseName: string,
    quantity: number,
    duration: number,
    price : number,
    status: string,
    typeOfCrop: string,
    createdAt: string,
}


type WarehouseOccupacyPieProps = {
    occupied: {
        type: string,
        quantity: number
    }[],
    unoccupied: number,
    totalSpace: number
}