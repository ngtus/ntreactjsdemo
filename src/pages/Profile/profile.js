import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ProfilePage = () => {
    const history = useHistory()
    const currentUser = useContext(UserContext)
    if (!currentUser.authed) history.push(`/login`);
    const [profile, setProfile] = useState({
        createdAt: null,
        name: null,
        id: null
    })
    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${currentUser.userId}`,
            headers: { Authorization: `Bearer ${currentUser.token}`},
        }).then(({ data }) => {
            setProfile({
                createdAt: data.createdAt,
                name: data.name,
                id: data.id
            });
        })
    }, [])

    return <div>
        <ul>
            <li>createdAt: {profile.createdAt}</li>
            <li>name: {profile.name}</li>
            <li>id: {profile.id}</li>
        </ul>
    </div>;
}

export default ProfilePage;