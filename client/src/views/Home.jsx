import { 
  Box, 
  Alert, 
  Grid, 
  Paper, 
  Typography, 
  Container, 
  CircularProgress, 
  Card, 
  CardContent 
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  function clearMessage() {
    window.history.replaceState({}, "");
  }

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data); // Kontrollera att ID finns
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant="filled"
          severity="success"
          sx={{ mb: 2, bgcolor: "#87CEEB", color: "#fff", fontWeight: "bold" }}
        >
          {message}
        </Alert>
      )}
      
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#FAF3E0",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: "#6A5ACD", fontWeight: "bold", textAlign: "center" }}
        >
          Snajker - Sneakers for Every Style 👟
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.id || `product-${index}`}>
                  <Card
                    sx={{
                      backgroundColor: "#FFDEE9",
                      backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
                      borderRadius: 3,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ textAlign: "center", width: "100%", mt: 2 }}>
                No products available
              </Typography>
            )}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}

export default Home;
