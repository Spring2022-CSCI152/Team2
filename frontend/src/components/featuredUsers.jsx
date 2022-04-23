import UserCard from "../components/userCards.jsx";
import '../assets/featUsers.css';

import React from "react";
function FeaturedUsers(){
    return(
     <>
    <h2 className = 'featUsersLabel'>Featured Users</h2>
    <div className = 'featUsers'>
    <UserCard/>
    </div>
    </>

    );

}

export default FeaturedUsers;