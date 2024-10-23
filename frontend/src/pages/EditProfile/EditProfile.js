import React from 'react'
import './EditProfile.css'

import { uploads } from '../../utils/config'

//hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//redux
import { profile, resetMessage } from '../../slices/userSlice'

//components
import Message from '../../components/Message'

const EditProfile = () => {

  const dispatch = useDispatch()

  const { user, message, error, loading } = useSelector(state => state.user);

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch])

  //fill form with user data
  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio)
    }
  },[user])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  console.log(user);

  return (
    <div id='edit-profile'>
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você..
      </p>
      {/* Preview imagem */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Nome' value={name || ""} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='E-mail' disabled value={email || ""} />
        <label>
          <span>Imagem perfil</span>
          <input type="file" />
        </label>
        <label>
          <span>Bio</span>
          <input type="text" placeholder='Descrição perfil' value={bio || ""} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input type="password" placeholder='Digite sua nova senha' value={password || ""} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  )
}

export default EditProfile