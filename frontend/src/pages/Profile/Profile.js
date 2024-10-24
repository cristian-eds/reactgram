import React from 'react'
import './Profile.css';

import { uploads } from '../../utils/config';

//components
import Message from '../../components/Message';
import { Link } from "react-router-dom";

//icons
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

//hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//redux
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage, getUserPhotos } from '../../slices/photoSlice';

const Profile = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.user);
    const { user: userAuth } = useSelector(state => state.auth);
    const {
        photos,
        error: errorPhoto,
        loading: loadingPhoto,
        message: messagePhoto,
    } = useSelector((state) => state.photo);


    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    //New form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();


    // load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id])


    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        //build form data
        const formData = new FormData();

        const photoFormData = Object.keys(photoData)
            .forEach((key) => formData.append(key, photoData[key]))

        formData.append("photo", photoFormData);

        dispatch(publishPhoto(formData));
        setTitle("");

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }


    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id='profile'>
            <div className="profile__header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile__description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>Título para a foto:</span>
                                <input type="text" placeholder='Insira um título' value={title || ""} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loadingPhoto && <input type="submit" value="Postar" />}
                            {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type="error"></Message>}
                    {messagePhoto && <Message msg={messagePhoto} type="success"></Message>}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas</h2>
                <div className="photos__container">
                    {photos && photos.map(photo => (
                        <div className="photo" key={photo._id}>
                            {photo.image && (
                                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                            )}
                            {id === userAuth._id ? (
                                <div className="actions">
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                    <BsPencilFill />
                                    <BsXLg />
                                </div>

                            ) : (<Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>)}
                        </div>
                    )
                    )}


                </div>
            </div>
        </div>
    )
}

export default Profile