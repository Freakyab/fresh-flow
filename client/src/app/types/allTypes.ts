type warehouseDetailDataProps = {
    _id: string;
    ownerName: string;
    name: string;
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

type customerDetailDataProps = {
    _id : string,
    fullName: string,
    email: string,
    address: string,
    city: string,
    state : string,
    phoneNo: string,
    username: string,
    password: string,
    img : string,
    location: number[],
};

type farmerDetailDataProps = {
    _id : string;
    farmerName: string;
    adharNo: string;
    username : string;
    password : string;
    address: string;
    state: string;
    farmerContact: string;
    image : string;
    email   : string;
    location: number[];
    city : string;
    availableCrops: {
        typeOfCrop: string;
        quantity: number;
        price: number;
    }[],
}

type CropsMarketPlaceProps = {
    _id : string,
    farmerName: string;
    address: string;
    city : string;
    state: string;
    farmerContact: string;
    image : string;
    email   : string;
    location: number[];
    crop : string,
    price: number;
    availableQuantity: number;
}

type filterProps = {
    cropName: string | null,
    priceRange: { min: number, max: number },
    location: string

}

type CustomerOrderCartItemsProps = {
    _id: string,
    crop: string,
    price: number,
    image: string,
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
    customerName: string | undefined ,
    customerId: string | undefined,
}


type WarehouseOccupacyPieProps = {
    occupied: {
        type: string,
        quantity: number
    }[],
    unoccupied: number,
    totalSpace: number
}