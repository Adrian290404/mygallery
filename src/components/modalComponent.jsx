import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'

export const Modal = ({ type, text = "", onClose }) => {
    if (type === "information") {
        return (
            <div className="modal">
                <button className="modal__close-button" onClick={onClose}>x</button>
                <h1 className="modal__title">Photo Information</h1>
                <p className="modal__text">{text}</p>
            </div>
        );
    }
    else if (type === "edit") {
        console.log(text)
        return (
            <div className="modal">
                <button className="modal__close-button" onClick={onClose}>x</button>
                <h1 className="modal__title modal__title--edit">Edit Photo</h1>
                <div className="modal__mui">
                    <TextField
                        className = "modal__mui__textField"
                        id="filled-multiline-static"
                        label="Change description"
                        multiline
                        rows={4}
                        defaultValue={text}
                        variant="filled"
                    />
                    <span className='modal__mui__separator'></span>
                    <Button className = "modal__mui__button" variant="contained" startIcon={<EditIcon />}>
                        Change description
                    </Button>
                </div>
            </div>
        )
    }
    return null
}
