import { useState, useEffect } from "react";
import blackHeart from "../assets/blackHeart.png";
import redHeart from "../assets/redHeart.png";
import info from "../assets/info.png";
import trash from "../assets/trash.png";
import edit from "../assets/edit.png";
import download from "../assets/download.png";
import { Modal } from "./modalComponent";

export const PhotoComponent = ({ height, width, likes, id, publishDate, imageURL, description }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); 
    const [favorites, setFavorites] = useState([]);
    const isSearchPage = location.pathname === "/";

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
        const isFavoritePhoto = savedFavorites.some(photo => photo.id === id);
        setIsFavorite(isFavoritePhoto);
    }, [id]);

    const infoHandler = () => {
        setIsModalOpen(true);
    };

    const closeModalHandler = () => {
        setIsModalOpen(false);
    };

    const toggleFavorite = () => {
        const photoInfo = { width, height, likes, id, publishDate, imageURL, description };

        setFavorites(prevFavorites => {
            let updatedFavorites;
            if (isFavorite) {
                updatedFavorites = prevFavorites.filter(photo => photo.id !== id);
            } else {
                updatedFavorites = [...prevFavorites, photoInfo];
            }
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            console.log("Updated Favorites:", JSON.parse(localStorage.getItem("favorites")));
            return updatedFavorites;
        });

        setIsFavorite(prevState => !prevState);
    };

    const editHandler = () => {
        setIsModalOpen(true);
    };

    console.log(width)
    return (
        <>
            <img className="main__image-container__photo" src={imageURL} alt={description} />
            <div className="main__image-container__buttons-container">
                {isSearchPage ? (
                    <>
                        <img
                            className="main__image-container__buttons-container__button"
                            src={isFavorite ? redHeart : blackHeart}
                            alt="Favorite"
                            onClick={toggleFavorite}
                        />
                        <img
                            className="main__image-container__buttons-container__button"
                            src={info}
                            alt="Info"
                            onClick={infoHandler}
                        />
                    </>
                ) : (
                    <>
                        <img
                            className="main__image-container__buttons-container__button"
                            src={trash}
                            alt="Trash"
                            // onClick={toggleFavorite}
                        />
                        <img
                            className="main__image-container__buttons-container__button"
                            src={edit}
                            alt="Edit"
                            onClick={editHandler}
                        />
                        <img
                            className="main__image-container__buttons-container__button"
                            src={download}
                            alt="Download"
                            // onClick={infoHandler}
                        />
                    </>
                )}
            </div>

            {isModalOpen && (
                isSearchPage ? (
                    <Modal
                        type="information"
                        text={
                            <>
                                <b>Width:</b> {width} px.
                                <br />
                                <b>Height:</b> {height} px.
                                <br />
                                <b>Likes:</b> {likes} likes.
                                <br />
                                <b>Date:</b> {new Date(publishDate).toLocaleDateString()}.
                            </>
                        }
                        onClose={closeModalHandler}
                    />
                ) : (
                    <Modal
                        type="edit"
                        text={description}
                        onClose={closeModalHandler}
                    />
                )
            )}
        </>
    );
};
