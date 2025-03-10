import { 
  Box, 
  Alert, 
  Grid, 
  Paper, 
  Typography, 
  Container, 
  CircularProgress, 
  Card, 
  CardMedia, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");

  function clearMessage() {
    window.history.replaceState({}, "");
  }

  const fetchProducts = () => {
    setLoading(true);
    setError(null);

    let url = "http://localhost:3000/products"; // Grund-URL
    let params = [];

    if (category) params.push(`category=${category}`);
    if (inStock) params.push(`stock=${inStock}`);

    if (params.length) url = `http://localhost:3000/products/filter?${params.join("&")}`;

    console.log("📡 Fetching:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("✅ Filtered products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [category, inStock]);

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

        {/* Filter Dropdowns */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">Adidas</MenuItem>
              <MenuItem value="2">Nike</MenuItem>
              <MenuItem value="3">Puma</MenuItem>
              <MenuItem value="4">Converse</MenuItem>
              <MenuItem value="5">Vans</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Stock</InputLabel>
            <Select value={inStock} onChange={(e) => setInStock(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">In Stock</MenuItem>
              <MenuItem value="false">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Typography variant="h6" sx={{ color: "red", textAlign: "center" }}>
            Error loading products: {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.product_id}>
                  <Card sx={{ borderRadius: 3, backgroundColor: "#FFDEE9" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`http://localhost:3000/${item.imageUrl}`}
                      alt={item.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2">{item.description}</Typography>
                      <Typography variant="h6" sx={{ color: "#1b5e20" }}>
                        {item.price} kr
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No products found.</Typography>
            )}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}

export default Home;
