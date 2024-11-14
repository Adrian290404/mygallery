// import { useDispatch, useSelector } from "react-redux";

export const PhotoComponent = ({ width, height, likes, id, publishDate, imageURL, fileName, description }) => {
    // const dispatch = useDispatch();
    // const photos = useSelector((state) => state.search.data); 

    // return (
    //     <div className="photos-grid">
    //         {photos.map((photo) => (
    //             <article className="photo-container" key={photo.id}>
    //                 <img
    //                     className="photo-container__image"
    //                     src={photo.urls.small} // Usa la URL adecuada para la imagen
    //                     alt={photo.alt_description || "Photo"}
    //                 />
    //                 {/* Puedes agregar más detalles o botones aquí */}
    //             </article>
    //         ))}
    //     </div>
    // );

    return (
        <article className="main__image-container__photo">
            <img className="main__image-container__photo__img" src={imageURL} />
        </article>
    )
};
