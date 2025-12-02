import { createTheme } from '@mui/material/styles'
import { pink } from '@mui/material/colors'
const theme = createTheme({
palette: {
mode: 'light', // replaces `type: 'light'` in MUI v5
primary: {
light: '#4d633a',
main: '#4d633a',
dark: '#4d633a',
contrastText: '#fff',
},
secondary: {
light: '#ff79b0',
main: '#ff4081',
dark: '#c60055',
contrastText: '#000',
},
},
typography: {
// `useNextVariants` is removed in MUI v5; it's on by default
},
custom: {
openTitle: '#3f4771',
protectedTitle: pink[400],
},
})
export default theme