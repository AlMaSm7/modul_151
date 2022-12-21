import {useState} from 'react'
import { Box, Collapse, IconButton, Alert, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const SuccessAlert = () => {

    const [open, setOpen] = useState<boolean>(false)


    return (
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Close me!
            </Alert>
          </Collapse>
          <Button
            disabled={open}
            variant="outlined"
            onClick={() => {
              setOpen(true)
            }}
          >
            Re-open
          </Button>
        </Box>
    )
}

export default SuccessAlert