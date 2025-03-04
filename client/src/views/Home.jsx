// src/views/Home.js
import { Alert, Grid, Paper, Typography, Container, CircularProgress, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  function clearMessage() {
    window.history.replaceState({}, "");
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/product") 
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
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
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: "#fff8e1" }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#6d4c41" }}>
          Premium Coffee Selections
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ backgroundColor: "#f5f5f5" }}>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}

export default Home;
