import {useState} from 'react'
import {IconButton, Alert, Dialog} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const SuccessAlert = () => {

    const [open, setOpen] = useState<boolean>(true)


    return (
        <Dialog open={open} sx={{width: "100%"}}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="large"
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >
                Pokemon was liked!
            </Alert>
        </Dialog>
    )
}

export default SuccessAlert