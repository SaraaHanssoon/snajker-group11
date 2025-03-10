import PropTypes from 'prop-types';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Box,
  Paper,
  Typography,
  Rating,
} from "@mui/material";

function ProductItemLarge({ product }) {
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();

  // ✅ Rättar bildsökväg
  const getImageUrl = (imageUrl) => {
    return `http://localhost:3000/${imageUrl}`;
  };

  useEffect(() => {
    console.log('🔍 Product:', product);
    console.log('🖼️ Image Path:', getImageUrl(product.imageUrl));
  }, [product]);

  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2, width: '100%', maxWidth: '600px', backgroundColor: '#f5f5dc' }} elevation={3}>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h4' sx={{ color: '#6d4c41' }}> {product.name} </Typography>
        <Rating name='read-only' value={product.rating} readOnly />
      </Box>

      {/* ✅ Använder endast produktens faktiska bildväg */}
      <img
        src={getImageUrl(product.imageUrl)}
        alt={`Image of ${product.name}`}
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
      />

      <Typography variant='body1' sx={{ mt: 4, color: '#3e2723' }}> {product.description} </Typography>

      {typeof product.price !== "undefined" && product.price !== null ? (
        <Typography variant='h6' gutterBottom sx={{ color: '#1b5e20' }}>
          {product.price} kr
        </Typography>
      ) : (
        <Typography variant='body1' color="error">Price not available</Typography>
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
          onClick={() => alert("Product added to cart")}
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
          '&:hover': { backgroundColor: '#5d4037' },
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
    rating: PropTypes.number,
    product_id: PropTypes.number,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired
};

export default ProductItemLarge;
