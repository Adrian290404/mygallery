import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

export const Modal = ({ type, text = "", onClose, onSave }) => {
    const [newDescription, setNewDescription] = useState(text)

    const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value)
    }

    const handleSave = () => {
        onSave(newDescription)
        onClose()
    }

    return (
        <div className="modal">
            <button className="modal__close-button" onClick={onClose}>x</button>
            {type === "information" ? (
                <>
                    <h1 className="modal__title">Photo Information</h1>
                    <p className="modal__text">{text}</p>
                </>
            ) : (
                <>
                    <h1 className="modal__title modal__title--edit">Edit Photo</h1>
                    <div className="modal__mui">
                        <TextField
                            className="modal__mui__textField"
                            id="filled-multiline-static"
                            label="Change description"
                            multiline
                            rows={4}
                            defaultValue={newDescription}
                            onChange={handleDescriptionChange}
                            variant="filled"
                        />
                        <span className='modal__mui__separator'></span>
                        <Button
                            className="modal__mui__button"
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleSave}
                        >
                            Change description
                        </Button>
                    </div>
                </>
            )}
        </div>
    )    
}