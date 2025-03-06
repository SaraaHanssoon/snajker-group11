import { Link, Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Tooltip,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#FAF3E0", // Ljus beige bakgrund
    },
    primary: {
      main: "#FFB6C1", // Ljusrosa pastell
    },
    secondary: {
      main: "#87CEEB", // Babyblå
    },
    text: {
      primary: "#4A4A4A", // Mjuk mörkgrå
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif', // Modern och clean font
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fcdcff", // Ändra här till den nya färgen
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "0 10px",
          textTransform: "none",
          fontSize: "16px",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        <AppBar position="static" sx={{ boxShadow: "none" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Bara logotypen */}
            <img src="/images/logo.png" alt="Logo" style={{ width: "150px" }} /> {/* Justera storleken på logotypen här */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip
                title="Endast admin kan skapa ny vara"
                componentsProps={{ tooltip: { sx: { fontSize: "1rem" } } }}
              >
                <Button variant="contained" color="secondary">
                  <Link to="/products/new" style={{ color: "#fff", textDecoration: "none" }}>
                    Skapa produkt
                  </Link>
                </Button>
              </Tooltip>
              <Button variant="contained" color="primary">
                <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
                  🛒 Varukorg
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
