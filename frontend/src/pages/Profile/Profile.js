import React from 'react'
import './Profile.css';

import { uploads } from '../../utils/config';

//components
import Message from '../../components/Message';
import { Link } from "react-router-dom";

//icons
import { BsFillEyeFill, BsPencilFill, BsXlg } from 'react-icons/bs'

//hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//redux

const Profile = () => {
    return (
        <div>Profile</div>
    )
}

export default Profile