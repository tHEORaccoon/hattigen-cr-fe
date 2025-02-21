import { useState } from "react";
import Header from "./Header";
import Rectagle from "../../assets/Rectangle.png"
import NoImage from "../../assets/no-image.png"
import { updateProfileInfoData } from "../../core/redux/slice/cvFormSlice";
import {useSelector, useDispatch} from "react-redux";


function ProfileInfo() {

    
    const [isEdit, setIsEdited] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        city: "",
        country: "",
        postalCode:"",
        phone: "",
    });
    const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});

    const dispatch = useDispatch()
    const state = useSelector((h)=>(
        console.log(h,"dd")
    ))

    console.log(state)

    const handleInputFocus = (name: string) => {
        setIsTyping((prev) => ({ ...prev, [name]: true }));
    };

    const handleInputBlur = (name: string) => {
        setIsTyping((prev) => ({ ...prev, [name]: false }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedUserData = {
            ...userData,
            [name]: value,
        };
    
        setUserData(updatedUserData);
        dispatch(updateProfileInfoData(updatedUserData));

    };

    return (
        <div className="container mx-auto">
            <Header
                title={"Let’s start with your personal info"}
                description={"Include your full name and at least one way for employers to reach you"}
                isEditing={false}
                setIsEditing={() => {
                    setIsEdited(!isEdit);
                }}
                hideEditButton={true}
            />

            <div className="grid sm:grid-cols-2 gap-[121px] mt-20">
                <div className="">
                    <div className=" flex md:items-center mb-4 md:mb-6 px-4 py-2 ">
                        <div className="border p-4 flex items-center justify-center w-[100px] h-[100px]" style={{ backgroundImage: image ? `url(${image})` : 'none' }}>
                            {!image && 
                                <span className="text-gray-500 text-xs">
                                    <img src={NoImage} alt="" />
                                </span>
                            }
                        </div>

                        <div className="flex flex-col justify-center items-center mx-auto md:mx-3">
                            <span className="text-center mb-2 text-xs text-gray-800 font-normal">Add a photo to your profile</span>
                            <label
                                htmlFor="file-input"
                                className="bg-[#F4D06C] text-black rounded-full cursor-pointer w-[161px] h-[35px] flex items-center justify-center"
                            >
                                Add a Photo
                            </label>
                        </div>
                    </div>
                    <form>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${isTyping.firstname ? 'text-blue-500' : 'text-gray-700'}`}
                                    htmlFor="firstname"
                                >
                                    First Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="firstname"
                                    type="text"
                                    placeholder="Jane"
                                    value={userData.firstname}
                                    onFocus={() => handleInputFocus("firstname")}
                                    onBlur={() => handleInputBlur("firstname")}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                <label
                                     className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${isTyping.lastname? 'text-blue-500' : 'text-gray-700'}`}
                                    htmlFor="lastname"
                                >
                                    Last Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    placeholder="Doe"
                                    value={userData.lastname}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus("lastname")}
                                    onBlur={() => handleInputBlur("lastname")}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                       className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${isTyping.city? 'text-blue-500' : 'text-gray-700'}`}
                                    htmlFor="city"
                                >
                                    City
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="City"
                                    value={userData.city}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus("city")}
                                    onBlur={() => handleInputBlur("city")}
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                <div className="flex flex-wrap -mx-3">
                                <div className="w-full md:w-1/2 px-3 md:mb-0">
                                <label
                                       className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${isTyping.country? 'text-blue-500' : 'text-gray-700'}`}
                                    htmlFor="country"
                                >
                                 country
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="countr"
                                    name="country"
                                    type="text"
                                    placeholder="country"
                                    value={userData.country}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus("country")}
                                    onBlur={() => handleInputBlur("country")}
                                />
                            </div>
                                <div className="w-full md:w-1/2 px-3 md:mb-0">
                                <label
                                       className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${isTyping.postalCode? 'text-blue-500' : 'text-gray-700'}`}
                                    htmlFor="postalCode"
                                >
                                  Postal Code
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="postalCode"
                                    name="postalCode"
                                    type="text"
                                    placeholder="postalCode"
                                    value={userData.postalCode}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus("postalCode")}
                                    onBlur={() => handleInputBlur("postalCode")}
                                />
                            </div>
                
                        </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-1/2 px-3 md:mb-0">
                                <label
                                      className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${isTyping.email ? 'text-blue-500' : 'text-gray-700'}`}
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus("email")}
                                    onBlur={() => handleInputBlur("email")}
                                    
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-3 md:mb-0">
                                <label
                                     className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${isTyping.phone ? 'text-blue-500' : 'text-gray-700'}`}
                                    htmlFor="phone"
                                >
                                    Phone
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus("phone")}
                                    onBlur={() => handleInputBlur("phone")}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                      {/* Live Preview Section */}
                      <div className="hidden md:block w-full max-w-2xl h-[400px] bg-white shadow-lg pt-2 px-2 border border-black">
                    <div className="w-full">
                        <img src={Rectagle} alt="" className="w-full" />
                    </div>
                    <div className="w-full h-20 bg-white flex flex-col justify-center mt-20">
                        <h2>Framework</h2>
                        <div className="text-center">
                            <p className="text-lg font-semibold">{userData.firstname} {userData.lastname}</p>
                            <p>{userData.city}, {userData.country}</p>
                            <p>{userData.email}</p>
                            <p>{userData.phone}</p>
                        </div>
                    </div>
                </div>
                        
                {/* <div className="border p-4 flex flex-col items-center">
                    <div className="text-center">
                        <p className="text-lg font-semibold">{userData.firstname} {userData.lastname}</p>
                        <p>{userData.city}, {userData.country}</p>
                        <p>{userData.email}</p>
                        <p>{userData.phone}</p>
                    </div> */}

                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                {/* </div> */}
            </div>
        </div>
    );
}

export default ProfileInfo;
