import React, { useState, useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import logo from "../assets/logoTexto.png"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import { useDispatch } from "react-redux"
import { getSearchThunk } from "../features/searchThunk"
import { useSelector } from "react-redux"
import { favoriteList } from "../features/favoritesSlice"

export const LayoutComponent = () => {
    const [filter, setFilter] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [showDropdown, setShowDropdown] = useState(true)
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1000)
    const navigate = useNavigate()
    const location = useLocation()
    const isSearchPage = location.pathname === "/"
    const dispatch = useDispatch()
    const search = ["Find the perfect photo for your project", "Free stock photos",]
    const myPhotos = ["Manage your favorite photos", "Saved photos"]
    const favorites = useSelector(favoriteList)

    const handleChange = (event) => {
        setFilter(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSearch = () => {
        if (isSearchPage) {
            dispatch(getSearchThunk(searchTerm))
        } else {
            const filteredFavorites = favorites.filter(photo =>
                photo.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            console.log(filteredFavorites)
            navigate('/my-photos', { state: { filteredFavorites } })
        }
    }

    const showMenuHandler = () => {
        setShowMenu(true)
        setShowDropdown(false)
    }

    const hideMenuHandler = () => {
        setShowMenu(false)
        setShowDropdown(true)
    }

    const handleNavigation = (path) => {
        navigate(path)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1000)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            <header className="header">
                <nav className="header__nav">
                    <img className="header__nav__logo" src={logo} alt="Logo" />
                    {!isLargeScreen && (
                        <>
                            <button className={`header__nav__dropdown ${showDropdown ? "visible" : "hidden"}`} onClick={showMenuHandler}>≡</button>
                            <button className={`header__nav__dropdown ${!showDropdown ? "visible" : "hidden"}`} onClick={hideMenuHandler}>x</button>
                        </>
                    )}
                    <ul className={`header__nav__menu ${isLargeScreen || showMenu ? "visible" : "hidden"}`}>
                        <li className={`header__nav__menu__item ${isSearchPage ? "thisPage" : ""}`} onClick={() => handleNavigation("/")}>Search</li>
                        <li className={`header__nav__menu__item ${!isSearchPage ? "thisPage" : ""}`} onClick={() => handleNavigation("/my-photos")}>My Photos</li>
                    </ul>
                </nav>
                <section className="header__search-container">
                    <h2 className="header__search-container__title">{isSearchPage ? search[0] : myPhotos[0]}</h2>
                    <TextField
                        className="header__search-container__textfield"
                        id="filled-basic"
                        label="Search photos"
                        variant="filled"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <FormControl
                        className="header__search-container__select"
                        variant="filled"
                        sx={{ m: 1, minWidth: 120 }}
                    >
                        <InputLabel id="demo-simple-select-filled-label">
                            Filter by
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={filter}
                            onChange={handleChange}
                        >
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="width">Width</MenuItem>
                            <MenuItem value="height">Height</MenuItem>
                            <MenuItem value="created_at">Date</MenuItem>
                            <MenuItem value="likes">Likes</MenuItem>
                        </Select>
                    </FormControl>
                    <h3 className="header__search-container__subtitle">{isSearchPage ? search[1] : myPhotos[1]}</h3>
                </section>
            </header>

            <main className="main">
                <Outlet />
            </main>

            <footer className="footer">
                <img className="footer__logo" src={logo} alt="Footer Logo" />
                <h4 className="footer__text">© 2024 MyGallery, All Rights Reserved</h4>
            </footer>
        </>
    )
}