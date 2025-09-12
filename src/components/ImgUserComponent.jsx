import AvatarImg from '../assets/defaultAvatar.webp'

const ImgUserComponent = ({ imageUrl }) => {

    //const imageUrl = userImage.imageFileName;
    const API_BASE_Img = import.meta.env.VITE_API_Image + '/uploads/users/';
    const fullImageUrl = imageUrl ? `${API_BASE_Img}${imageUrl.imageFileName}` : AvatarImg;





    return (

        < figure className="flex flex-col items-center space-y-4" >
            <img
                src={fullImageUrl}
                alt="Photo de profil"
                className="w-2/3 h-28 rounded-full object-cover border-2 border-gray-300"
            />
        </figure>
    )
}

export default ImgUserComponent