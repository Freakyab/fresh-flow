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
    name: "", //
    username: "", //
    password: "", //
    confirmPassword: "", //
    gender: "", //
    phoneNo: "", //1
    email: "", //1
    address: "", //1
    pincode: "", //1
    city: "", //2
    state: "", //2
    aadhar: "", //2
    pan: "", //2
    // Reconsider the below fields
    aadharImage: "",
    panImage: "",
    landArea: "",
    landAddress: "",
    landCity: "",
    landState: "",
    landPincode: "",
    landImage: "",
  });

  return (
    <>
      <Swiper
        pagination={{ type: "progressbar", dynamicBullets: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className="flex p-4  ml-[100px] gap-4 flex-col h-full w-[60%]">
            <h2 className="text-2xl mb-4 font-bold">Profile Info</h2>
            <div className="flex flex-col gap-4">
              <InputWithImageComponent
                Image={<MdEmail size={25} className="input-icon-color" />}
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Password"
                type="text"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Confirm Password"
                type="text"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <span className="flex gap-4 justify-evenly">
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
              </div>
            </div>
          </SwiperSlide>
        }
        <SwiperSlide>
          <div className="flex p-4  ml-[100px] gap-4 flex-col h-full w-[60%]">
            <h2 className="text-2xl mb-4 font-bold">Profile Info</h2>
            <div className="flex flex-col gap-4">
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Phone Number"
                type="number"
                value={formData.phoneNo}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNo: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Address"
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Pincode"
                type="number"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex p-4  ml-[100px] gap-4 flex-col h-full w-[60%]">
            <h2 className="text-2xl mb-4 font-bold">Profile Info</h2>
            <div className="flex flex-col gap-4">
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="City"
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="State"
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Aadhar Number"
                type="number"
                value={formData.aadhar}
                onChange={(e) =>
                  setFormData({ ...formData, aadhar: e.target.value })
                }
              />
              <InputWithImageComponent
                Image={<MdEmail size={25} className={"input-icon-color"} />}
                placeholder="Pan Number"
                type="text"
                value={formData.pan}
                onChange={(e) =>
                  setFormData({ ...formData, pan: e.target.value })
                }
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setSelectedUserType("")}
          className="bg-black font-semibold text-white text-lg text-pretty  mx-10 w-60  items-center rounded-md p-2 focus:outline-none"
        >
          Reset
        </button>
        <button
          onClick={() => console.log(formData)}
          className="bg-black font-semibold text-white text-lg text-pretty  mx-10 w-60 items-center rounded-md p-2 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default FarmerRegisterform;
