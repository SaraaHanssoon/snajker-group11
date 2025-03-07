import PropTypes from 'prop-types';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Box,
  CardMedia,
  Paper,
  Typography,
  Rating,
} from "@mui/material";

function ProductItemLarge({ product }) {
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    alert("Product added to cart");
  };

  // Felsökning: Logga produktdata för att säkerställa att vi får den korrekta informationen
  useEffect(() => {
    console.log('Product:', product);  // Kontrollera att produktobjektet skickas korrekt
    console.log('Image URL:', product.imageUrl); // Kontrollera bildvägen
    console.log('Price:', product.price);  // Kontrollera priset
  }, [product]);

  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2, width: '100%', maxWidth: '600px', backgroundColor: '#f5f5dc' }} elevation={3}>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h4' sx={{ color: '#6d4c41' }}> {product.name} </Typography>
        <Rating name='read-only' value={product.rating} readOnly />
      </Box>

      {/* Kontrollera om imageUrl finns och visa den */}
      {product.imageUrl ? (
        <CardMedia
          sx={{ borderRadius: 2, maxHeight: '300px', objectFit: 'cover' }}
          component='img'
          image={`${process.env.PUBLIC_URL}/images/${product.imageUrl}`}  // Bildvägen
          alt={`Image of ${product.name}`} 
        />
      ) : (
        <Typography variant='h6' color="error">Image not available</Typography>  // Om ingen bild finns
      )}

      <Typography variant='body1' sx={{ mt: 4, color: '#3e2723' }}> {product.description} </Typography>

      {/* Kontrollera om price finns och visa det */}
      {product.price ? (
        <Typography variant='h6' gutterBottom sx={{ color: '#1b5e20' }}> {product.price} kr </Typography>
      ) : (
        <Typography variant='body1' color="error">Price not available</Typography>  // Om priset inte finns
      )}

      <Box sx={{ mt: 4 }}>
        <TextField
          label='Quantity'
          type='number'
          InputLabelProps={{ shrink: true }}
          variant='outlined'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          size='small'
          sx={{ width: '100px' }}
        />
        <Button
          sx={{ ml: 1.5 }}
          onClick={handleAddToCart}
          startIcon={<AddShoppingCartIcon />}
          variant="contained"
          color='primary'
        >
          Add to Cart
        </Button>
      </Box>

      <Button
        variant='contained'
        color='primary'
        startIcon={<ChevronLeftIcon />}
        sx={{
          mt: 2,
          backgroundColor: '#795548', 
          '&:hover': {
            backgroundColor: '#5d4037' 
          },
          position: 'absolute', 
          top: 95, 
          left: 70,
        }}
        onClick={() => navigate(-1)}
      >
        Back to Shop
      </Button>
    </Paper>
  );
}

ProductItemLarge.propTypes = {
  product: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired
};

export default ProductItemLarge;
