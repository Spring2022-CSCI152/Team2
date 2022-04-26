import axios from 'axios';
import React, { useState } from 'react';
import '../assets/editAccount.css';

const EditAccount = () => {
    // Update the account using axios post request
    const updateAccount = (formData) => {
        console.log(formData
        // const data = {
        //     profileimg: profileData.profileimg,
        //     name: profileData.name,
        //     bio: profileData.bio,
        //     instagram: profileData.instagram,
        //     twitter: profileData.twitter
        // }

        // axios.post('http://localhost:5000/updateAccount', data)
        //     .then(res => console.log(res.data));
    }


    return (
        <div className="edit-account">
            <p> Test </p>
            <form className="edit-account-form" onSubmit={(e) => {
                e.preventDefault();
                updateAccount(e.target.elements);
            }}>
                <label htmlFor="profile-img">Profile Image</label>
                <input type="file" id="profile-img" name="profile-img" />

                <label htmlFor="profile-name">Name</label>
                <input type="text" id="profile-name" name="profile-name" />

                <label htmlFor="profile-bio">Bio</label>
                <textarea id="profile-bio" name="profile-bio" />

                <label htmlFor="profile-insta">Instagram Name</label>
                <input type="text" id="profile-insta" name="profile-insta" />

                <label htmlFor="profile-twitter">Twitter Name</label>
                <input type="text" id="profile-twitter" name="profile-twitter" />

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditAccount;