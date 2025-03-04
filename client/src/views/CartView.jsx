import { useEffect, useState } from "react";
import { fetchCart } from "../services/CartService";
import { Button, Box, Typography, List, Paper } from "@mui/material/";
import { grey, brown } from "@mui/material/colors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from 'react-router-dom';

function CartView() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetCartItems = async () => {
            try {
                const userId = 1; 
                const fetchedCartItems = await fetchCart(userId);
                console.log("Fetched Cart Items:", fetchedCartItems); 
                if (fetchedCartItems.length > 0) {
                    setCartItems(fetchedCartItems[0].products || []); 
                }
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };
        fetchAndSetCartItems();
    }, []);

    function calculateTotal(cartItems) {
        return cartItems.reduce(
            (total, item) => total + (item.cartRow?.amount || 1) * (item.price || 0),
            0
        );
    }

    function handleCheckout() {
        alert("Your order has been placed!");
    }

    return (
        <Paper sx={{ mt: 4, borderRadius: 1, backgroundColor: '#efebe9' }} elevation={3}>
            <Box sx={{ m: 2 }}>
                <Typography variant='h5' color={brown[800]}> Your Cart </Typography>
            </Box>
            <Box sx={{ m: 2 }}>
                {cartItems.map((item, index) => (
                    <List
                        sx={{ mb: 1, borderBottom: `1px solid ${grey[300]}` }}
                        key={index}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <img
                                src={item.imageUrl}
                                alt={"Product image missing"}
                                style={{ width: "100px", height: "auto" }}
                            />
                            <Typography variant='body1' color="text.secondary">
                                Product: {item.title || "Product name missing"}, Price:{" "}
                                {item.price || 0} kr, Quantity: {item.cartRow?.amount || 1},
                                Total: {(item.cartRow?.amount || 1) * (item.price || 0)} kr
                            </Typography>
                        </Box>
                    </List>
                ))}
            </Box>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2, pb: 1, px: 2 }}
            >
                <Button
                    variant='contained'
                    color='secondary'
                    startIcon={<ChevronLeftIcon />}
                    onClick={() => navigate(-1)}
                >
                    Back to Shop
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCheckout}
                >
                    Place Order
                </Button>
                <Typography variant='h6' color={brown[700]}>
                    Total to Pay: {calculateTotal(cartItems)} kr
                </Typography>
            </Box>
        </Paper>
    );
}

export default CartView;
