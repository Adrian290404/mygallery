import { useEffect, useState } from "react";
import { PhotoComponent } from "../components/photoComponent";

export const MyPhotosPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    return (
        <>
            {favorites.length > 0 && 
                favorites.map((photo) => (
                    <section className="main__image-container" key={photo.id}>
                        <PhotoComponent
                            id={photo.id}
                            height={photo.height}
                            width={photo.width}
                            likes={photo.likes}
                            publishDate={photo.publishDate}
                            imageURL={photo.imageURL}
                            description={photo.description}
                        />
                    </section>
                ))
            }
        </>
    );
    
};
