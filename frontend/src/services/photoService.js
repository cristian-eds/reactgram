import { api, requestConfig } from '../utils/config'

// publish an user photo
const publishPhoto = async (data, token) => {


    const config = requestConfig("POST", data, token, true);

    try {
        const res = fetch(api + "/photos", config)
            .then(res => res.json())
            .catch(err => err);

        return res;

    } catch (error) {
        console.log(error)
    }

}

// get user photos
const getUserPhotos = async (id, token) => {

    const config = requestConfig("GET",null,token);

    try {

        const res = fetch(api + "/photos/user/" + id, config)
            .then(res => res.json())
            .catch(err => err);

        return res;

    } catch (error) {
        console.log(error)
    }
}
// delete photo 
const deletePhoto = async (id, token) => {
    
    const config = requestConfig("DELETE",null,token);

    try {
        const res = fetch(api+"/photos/"+id,config)
            .then(res=>res.json())
            .catch(err=>err)

        return res;
    } catch (error) {
        console.log(error);
    }
}




const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto
}

export default photoService;