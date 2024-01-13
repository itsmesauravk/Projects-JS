import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "http://localhost:4000/";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {  
        try {
            setLoading(true);
            const response = await axios.get(`${url}users`);
            // console.log("data : ", response.data);
            setUsers(response.data);
        } catch (error) {
            console.log("Error getting users : ", error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []); // useEffect to fetch data on component mount

    

    const defaultMaleImage = "https://www.w3schools.com/howto/img_avatar.png";
    const defaultFemaleImage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png";
    const defaultCustomImage = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";
    const blueTick = "https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png";
    // const goldTick = "https://seeklogo.com/images/T/twitter-verified-badge-gold-logo-48439DE18B-seeklogo.com.png";
    const goldTick = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Twitter_Verified_Badge_Gold.svg/2048px-Twitter_Verified_Badge_Gold.svg.png"
    return (
        <div>
        
            <div className="mt-3 mb-3">
                <h1 className="text-3xl font-bold">Use<span className="text-blue-500">rs</span></h1>
            </div>
            {loading && <div className="lds-circle"><div></div></div>}
            {!users && <p>No users found</p>}
            <div>
                {users.map((user) => (
                    <div 
                    className={`flex items-center gap-5 mt=3 mb-3 p-2.5 border-2 rounded-md
                    ${user.vipToken === 'iamgold' ? 'bg-purple-300' : user.vipToken === 'skyisblue' ? 'bg-blue-300' : 'bg-gray-300'}`}>
                        <div>
                            <img
                            src={
                                user.profileImage
                                ? url+user.profileImage
                                : user.gender === 'male'
                                ? defaultMaleImage
                                : user.gender === 'female'
                                ? defaultFemaleImage
                                : defaultCustomImage
                            }
                            alt={`${user.firstName} ${user.surname}`}
                            style={{ width: '5rem', height: '5rem' }} 
                            className="rounded-full mr-2 object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex gap-1  p-1 rounded-md">
                                <h1 className="text-xl font-bold">{user.firstName} {user.surname}</h1>
                                {user.vipToken === "iamgold" && <img src={goldTick} alt="gold" className="w-6 h-6" />}
                                {user.vipToken === "skyisblue" && <img src={blueTick} alt="blue" className="w-6 h-6" />}
                            </div>
                            <p className="text-blue-700 italic underline">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
