import { useEffect, useState } from "react"
import { PhotoComponent } from "../components/photoComponent"

export const MyPhotosPage = () => {
    const [favorites, setFavorites] = useState([])
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000)

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
        setFavorites(savedFavorites)

        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1000)
        };

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const [column1, column2, column3] = isWideScreen ? [[], [], []] : [favorites, [], []]
    if (isWideScreen) {
        favorites.forEach((photo, index) => {
            if (index % 3 === 0) {
                column1.push(photo)
            } else if (index % 3 === 1) {
                column2.push(photo)
            } else {
                column3.push(photo)
            }
        })
    }

    return (
        <>
            {favorites.length > 0 && (
                <div className="main__columns-container">
                    <div className="main__columns-container__column">
                        {column1.map((photo) => (
                            <section className="main__columns-container__column__image-container" key={photo.id}>
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
                        ))}
                    </div>
                    {isWideScreen && (
                        <>
                            <div className="main__columns-container__column">
                                {column2.map((photo) => (
                                    <section className="main__columns-container__column__image-container" key={photo.id}>
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
                                ))}
                            </div>
                            <div className="main__columns-container__column">
                                {column3.map((photo) => (
                                    <section className="main__columns-container__column__image-container" key={photo.id}>
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
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}