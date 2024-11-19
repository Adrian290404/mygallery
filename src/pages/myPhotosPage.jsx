import { useEffect, useState } from "react"
import { useLocation, useOutletContext } from "react-router-dom"
import { PhotoComponent } from "../components/photoComponent"

export const MyPhotosPage = () => {
    const [favorites, setFavorites] = useState([])
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000)
    const location = useLocation()
    const { filter } = useOutletContext()
    const filteredFavorites = location.state?.filteredFavorites || []

    useEffect(() => {
        if (filteredFavorites.length === 0) {
            const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
            setFavorites(savedFavorites)
        } else {
            setFavorites(filteredFavorites)
        }

        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1000)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [filteredFavorites])

    const sortedFavorites = [...favorites].sort((a, b) => {
        switch (filter) {
            case "width":
                return b.width - a.width
            case "height":
                return b.height - a.height
            case "created_at":
                return new Date(b.publishDate) - new Date(a.publishDate)
            case "likes":
                return b.likes - a.likes
            default:
                return 0
        }
    })

    const [column1, column2, column3] = isWideScreen ? [[], [], []] : [sortedFavorites, [], []]
    if (isWideScreen) {
        sortedFavorites.forEach((photo, index) => {
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
            {sortedFavorites.length > 0 && (
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