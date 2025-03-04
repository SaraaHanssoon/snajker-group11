import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const emptyProduct = {
    id: 0,
    title: '',
    body: '',
    price: '',
    imageUrl: ''
};

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(emptyProduct);

    useEffect(() => {
        if (id) {
            getOne(id).then((product) => setProduct(product));
        } else {
            setProduct(emptyProduct);
        }
    }, [id]);

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const newProduct = { ...product, [name]: value };
        setProduct(newProduct);
    }

    function onSave() {
        if (product.id === 0) {
            create(product).then((response) => {
                navigate('/', { replace: true, state: response });
            });
        } else {
            update(product).then((response) =>
                navigate(`/product/${product.id}`, { replace: true, state: response })
            );
        }
    }

    function onDelete() {
        remove(product.id).then((response) =>
            navigate('/', { replace: true, state: response })
        );
    }

    return (
        <Container maxWidth='lg'>
            <Paper elevation={3} sx={{ p: 3, mt: 4, backgroundColor: '#fff8e1' }}>
                <Typography variant='h4' component='h2' color="text.primary">
                    {product.id ? "Edit Product" : "Create Product"}
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        margin='normal'
                        onChange={onChange}
                        value={product.title}
                        name='title'
                        id='title'
                        label='Title'
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin='normal'
                        onChange={onChange}
                        value={product.body}
                        multiline
                        minRows={5}
                        name='body'
                        id='body'
                        label='Description'
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin='normal'
                        onChange={onChange}
                        value={product.price}
                        name='price'
                        id='price'
                        label='Price'
                        type='number'
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin='normal'
                        onChange={onChange}
                        value={product.imageUrl}
                        name='imageUrl'
                        id='imageUrl'
                        label='Image URL'
                        variant="outlined"
                    />
                    <Box display='flex' justifyContent="space-between" mt={2}>
                        <Button
                            startIcon={<ChevronLeftIcon />}
                            variant='contained'
                            onClick={() => navigate(-1)}
                            sx={{ backgroundColor: '#a1887f', '&:hover': { backgroundColor: '#8d6e63' } }}
                        >
                            Back
                        </Button>
                        {id && (
                            <Button
                                startIcon={<DeleteIcon />}
                                onClick={onDelete}
                                variant='contained'
                                color='error'
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                            variant='contained'
                            color='primary'
                            sx={{ backgroundColor: '#6d4c41', '&:hover': { backgroundColor: '#5d4037' } }}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default ProductEdit;
