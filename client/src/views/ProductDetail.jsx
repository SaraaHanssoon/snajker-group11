import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Tooltip,
  Alert,
  Box,
  Container,
  Typography,
  List,
  Paper
} from '@mui/material';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Hämta produktdata
  useEffect(() => {
    // Hämta produktdata från API eller annan källa
    getOne(id).then((product) => {
      setProduct(product);
    });
  }, [id]);

  const navigate = useNavigate();

  // Funktion för att lägga till recension
  function onReviewAdd(review) {
    addReview(product.product_id, review)  // Se till att använda rätt id (product_id)
      .then(() => getOne(id))  // Hämta produkt efter att en recension har lagts till
      .then((updatedProduct) => setProduct(updatedProduct));
  }

  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);

  // Rensa meddelande
  function clearMessage() {
    window.history.replaceState({}, "");
  }

  return product ? (
    <>
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant='filled'
          severity='success'
          sx={{ marginBottom: 2 }}
        >
          {message}
        </Alert>
      )}

      <Container maxWidth='lg'>
        <Box display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }} 
          justifyContent="center" 
          alignItems="flex-start" 
          gap={5}
          mt={2}
        >
          <Paper elevation={3} sx={{ p: 3, width: '100%', flex: 1, bgcolor: '#fff8e1' }}>
            <ProductItemLarge product={product} /> 
            <Box mt={2}>
              <Tooltip
                title='Only admins can edit this product'
                componentsProps={{
                  tooltip: { sx: { fontSize: "1rem" } },
                }}
              >
                <Button
                  startIcon={<EditIcon />}
                  variant='contained'
                  onClick={() => navigate(`/product/${product.product_id}/edit`)} // Uppdatera id till product_id
                >
                  Edit Product
                </Button>
              </Tooltip>
            </Box>
          </Paper>

          {/* Recensioner och formulär */}
          <Paper elevation={3} sx={{ p: 3, width: '100%', flex: 1, bgcolor: '#fff8e1', mt: { xs: 5, md: 0 } }}>
            <Typography variant="h5" gutterBottom>Review</Typography>
            <ReviewForm onSave={onReviewAdd} /> {/* Formulär för att lägga till recension */}
            <Typography variant="h5" sx={{ mt: 6 }}>Customer Reviews</Typography>
            <Box sx={{ mt: 2 }}>
              {product.reviews && (
                <List sx={{ width: '100%' }}>
                  {product.reviews.map((review, i) => (
                    <Review key={`review_${i}`} review={review} /> 
                  ))}
                </List>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  ) : (
    <Typography variant="h5" color="text.secondary" textAlign="center">
      Could not retrieve the product
    </Typography>
  );
}

export default ProductDetail;
