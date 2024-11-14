import { PhotoComponent } from "../components/photoComponent";
import { useSelector, useDispatch } from "react-redux";
import { getSearchThunk } from "../redux/searchThunk";
import { useState, useEffect } from "react";
import { searchData, searchStatus } from "../redux/searchSlice";

export const SearchPage = () => {
    const dispatch = useDispatch();
    const photoData = useSelector(searchData) || [];
    const photoStatus = useSelector(searchStatus);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (photoStatus === "idle") {
            dispatch(getSearchThunk());
        }
    }, [dispatch, photoStatus]);

    useEffect(() => {
        switch (photoStatus) {
            case "pending":
                setIsLoading(true);
                break;
            case "fulfilled":
                setIsLoading(false);
                break;
            default:
                break;
        }
    }, [photoStatus]);

    return (
        <section className="main__image-container">
            {!isLoading &&
                photoData.map((photo) => (
                    <PhotoComponent
                        key={photo.id}
                        height={photo.height}
                        width={photo.width}
                        id={photo.id}
                        likes={photo.likes}
                        publishDate={photo.created_at}
                        section="home-photo"
                        imageURL={photo.urls.regular}
                        fileName={`${photo.slug}.jpg`}
                        description={photo.description}
                    />
                ))}
        </section>
    );
};