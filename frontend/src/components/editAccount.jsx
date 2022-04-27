import axios from 'axios';
import React, { useState } from 'react';
import '../assets/editAccount.css';

const EditAccount = () => {
    // Update the account using axios post request
    const updateAccount = (formData) => {
        var fileUrl = "";
        const file = formData['profile-img'].files[0];
        if (file) {
            // upload to /collections
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            let data = new FormData();
            data.append('myImage', file);
            axios.post('http://localhost:5000/uploadProfileImg', data, config).then(
                res => {
                    fileUrl = res.data;

                    const profileData = {
                        // get img
                        profileImg: fileUrl,
                        name: formData['profile-name'].value,
                        bio: formData['profile-bio'].value,
                        instagram: formData['profile-insta'].value,
                        twitter: formData['profile-twitter'].value
                    }
                    console.log(profileData);

                    axios.post('http://localhost:5000/updateProfileData', profileData)
                        .then(res => console.log(res.data));
                })
        }
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