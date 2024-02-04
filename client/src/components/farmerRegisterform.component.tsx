import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import React, { useState, Dispatch, SetStateAction } from "react";
import InputWithImageComponent from "./inputWithimage.component";
import { MdEmail } from "react-icons/md";

type FarmerRegisterformProps = {
  setSelectedUserType: Dispatch<SetStateAction<string>>;
};

const FarmerRegisterform = ({
  setSelectedUserType,
}: FarmerRegisterformProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    gender: "",
    pincode: "",
    aadhar: "",
    pan: "",
    aadharImage: "",
    panImage: "",
    landArea: "",
    landAddress: "",
    landCity: "",
    landState: "",
    landPincode: "",
    landImage: "",
    username: "",
  });

  return (
    <>
      <Swiper
        pagination={{ type: "progressbar", dynamicBullets: true }}
        navigation={true}
        modules={[Pagination, Navigation]}>
        <SwiperSlide>
          <div className="flex p-4  ml-[100px] gap-4 flex-col h-full w-[60%]">
            <h2 className="text-2xl mb-4 font-bold">Profile Info</h2>
            <div className="flex flex-col gap-4">
              <InputWithImageComponent
                Image={<MdEmail size={25} />}
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <InputWithImageComponent
                Image={<MdEmail size={25} />}
                placeholder="Username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} />}
                placeholder="Password"
                type="text"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} />}
                placeholder="Confirm Password"
                type="text"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <span className="flex gap-4">
                <span>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={() =>
                      setFormData({ ...formData, gender: "Male" })
                    }
                  />
                  <label>Male</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={() =>
                      setFormData({ ...formData, gender: "Female" })
                    }
                  />
                  <label>Female</label>
                </span>
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex p-4  ml-[100px] gap-4 flex-col h-full w-[60%]">
            <h2 className="text-2xl mb-4 font-bold">Profile Info</h2>
            <div className="flex flex-col gap-4">
              <InputWithImageComponent
                Image={<MdEmail size={25} />}
                placeholder="Phone Number"
                type="number"
                value={formData.phoneNo}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNo: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} />}
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} />}
                placeholder="Address"
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
        </SwiperSlide>
        
      </Swiper>
      <div className="flex gap-4 justify-start">
        <button
          onClick={() => setSelectedUserType("")}
          className="bg-black  text-white flex items-start rounded-md p-2 focus:outline-none">
          Reset
        </button>
        <button
          onClick={() => console.log(formData)}
          className="bg-black text-white flex items-start rounded-md p-2 focus:outline-none">
          Submit
        </button>
      </div>
    </>
  );
};

export default FarmerRegisterform;
