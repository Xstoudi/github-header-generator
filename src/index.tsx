import { render } from 'preact'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './style.css'
import {
  AppBar,
  Box,
  Card,
  Grid,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import Settings from './components/settings'
import Preview from './components/preview'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    '2xl': true
  }
}

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1536,
      '2xl': 1900,
    },
  },
})

export function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              🚀 GitHub Header Generator
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="2xl">
          <Grid container spacing={4} my={2}>
            <Grid item xs={5}>
              <Card>
                <Settings />
              </Card>
            </Grid>
            <Grid item xs={7}>
              <Preview />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById('app'))
