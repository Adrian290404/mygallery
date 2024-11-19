import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import blackHeart from "../assets/blackHeart.png"
import redHeart from "../assets/redHeart.png"
import info from "../assets/info.png"
import trash from "../assets/trash.png"
import edit from "../assets/edit.png"
import download from "../assets/download.png"
import { Modal } from "./modalComponent"
import { addFavorite, removeFavorite, editPhoto } from "../features/favoritesSlice"
import FileSaver from "file-saver";

export const PhotoComponent = ({ height, width, likes, id, publishDate, imageURL, description }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [currentDescription, setCurrentDescription] = useState(description)
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorite.data)
    const isSearchPage = window.location.pathname === "/"

    useEffect(() => {
        const isFavoritePhoto = favorites.some(photo => photo.id === id)
        setIsFavorite(isFavoritePhoto)
    }, [favorites, id])

    const infoHandler = () => {
        setIsModalOpen(true)
    }

    const closeModalHandler = () => {
        setIsModalOpen(false)
    }

    const toggleFavorite = () => {
        const photoInfo = { width, height, likes, id, publishDate, imageURL, description }

        if (isFavorite) {
            dispatch(removeFavorite(id))
        } else {
            dispatch(addFavorite(photoInfo))
        }

        setIsFavorite(prevState => !prevState)
    }

    const editHandler = () => {
        setIsModalOpen(true)
    }

    const saveDescription = (newDescription) => {
        setCurrentDescription(newDescription)
        dispatch(editPhoto({ id, description: newDescription }))
    }

    const deleteHandler = () => {
        dispatch(removeFavorite(id))
    }

    const downloadHandler = () => {
        FileSaver.saveAs(imageURL, id + ".jpg")
    }

    const isPhotoInFavorites = favorites.some(photo => photo.id === id)

    if (!isPhotoInFavorites && !isSearchPage) {
        return null
    }

    return (
        <>
            <img className="main__columns-container__column__image-container__photo" src={imageURL} alt={currentDescription} />
            <div className="main__columns-container__column__image-container__buttons-container">
                {isSearchPage ? (
                    <>
                        <img
                            className="main__columns-container__column__image-container__buttons-container__button"
                            src={isFavorite ? redHeart : blackHeart}
                            alt="Favorite"
                            onClick={toggleFavorite}
                        />
                        <img
                            className="main__columns-container__column__image-container__buttons-container__button"
                            src={info}
                            alt="Info"
                            onClick={infoHandler}
                        />
                    </>
                ) : (
                    <>
                        <img
                            className="main__columns-container__column__image-container__buttons-container__button"
                            src={trash}
                            alt="Trash"
                            onClick={deleteHandler}
                        />
                        <img
                            className="main__columns-container__column__image-container__buttons-container__button"
                            src={edit}
                            alt="Edit"
                            onClick={editHandler}
                        />
                        <img
                            className="main__columns-container__column__image-container__buttons-container__button"
                            src={download}
                            alt="Download"
                            onClick={downloadHandler}
                        />
                    </>
                )}
            </div>

            {isModalOpen && (
                <Modal
                    type={isSearchPage ? "information" : "edit"}
                    text={
                        isSearchPage ? (
                            <>
                                <b>Width:</b> {width} px.
                                <br />
                                <b>Height:</b> {height} px.
                                <br />
                                <b>Likes:</b> {likes} likes.
                                <br />
                                <b>Date:</b> {new Date(publishDate).toLocaleDateString()}.
                            </>
                        ) : (
                            currentDescription
                        )
                    }
                    onClose={closeModalHandler}
                    {...(!isSearchPage && { onSave: saveDescription })}
                />
            )}
        </>
    )
}