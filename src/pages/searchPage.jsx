import { PhotoComponent } from "../components/photoComponent"
import { useSelector, useDispatch } from "react-redux"
import { getSearchThunk } from "../features/searchThunk"
import { useState, useEffect } from "react"
import { searchData, searchStatus } from "../features/searchSlice"

export const SearchPage = () => {
    const dispatch = useDispatch()
    const photoData = useSelector(searchData) || []
    const photoStatus = useSelector(searchStatus)
    const [isLoading, setIsLoading] = useState(false)
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000)

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1000)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        if (photoStatus === "idle") {
            dispatch(getSearchThunk())
        }
    }, [dispatch, photoStatus])

    useEffect(() => {
        switch (photoStatus) {
            case "pending":
                setIsLoading(true)
                break
            case "fulfilled":
                setIsLoading(false)
                break
            default:
                break
        }
    }, [photoStatus])

    const [column1, column2, column3] = isWideScreen ? [[], [], []] : [photoData, [], []]
    if (isWideScreen) {
        photoData.forEach((photo, index) => {
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
            {!isLoading && (
                <div className="main__columns-container">
                    <div className="main__columns-container__column">
                        {column1.map((photo) => (
                            <section className="main__columns-container__column__image-container" key={photo.id}>
                                <PhotoComponent
                                    height={photo.height}
                                    width={photo.width}
                                    id={photo.id}
                                    likes={photo.likes}
                                    publishDate={photo.created_at}
                                    imageURL={photo.urls.regular}
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
                                            height={photo.height}
                                            width={photo.width}
                                            id={photo.id}
                                            likes={photo.likes}
                                            publishDate={photo.created_at}
                                            imageURL={photo.urls.regular}
                                            description={photo.description}
                                        />
                                    </section>
                                ))}
                            </div>
                            <div className="main__columns-container__column">
                                {column3.map((photo) => (
                                    <section className="main__columns-container__column__image-container" key={photo.id}>
                                        <PhotoComponent
                                            height={photo.height}
                                            width={photo.width}
                                            id={photo.id}
                                            likes={photo.likes}
                                            publishDate={photo.created_at}
                                            imageURL={photo.urls.regular}
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