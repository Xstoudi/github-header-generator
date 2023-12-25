import { Box, Typography } from '@mui/material'

export default function Field({ name, children }) {
  return (
    <Box mb={2}>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      {children}
    </Box>
  )
}
