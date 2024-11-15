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

    console.log(photoData);
    return (
        <>
            {!isLoading &&
                photoData.map((photo) => (
                    <section className="main__image-container" key={photo.id}>
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
                ))
            }
        </>
    );
};