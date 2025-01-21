import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { FaCartPlus } from "react-icons/fa6";
import { IconButton, useTheme } from "@mui/material";
import { useCart } from '../context/CartContext';


const ShoesList = () => {
    const { addToCart } = useCart();
    
    const shoes = [
        { id: 1, name: 'Nike Air Max', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 2, name: 'Adidas UltraBoost', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 3, name: 'Puma Suede', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 4, name: 'Reebok Classic', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 5, name: 'Converse Chuck Taylor', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 6, name: 'Nike Air Max', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 7, name: 'Adidas UltraBoost', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 8, name: 'Puma Suede', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 9, name: 'Reebok Classic', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) },
        { id: 10, name: 'Converse Chuck Taylor', quantity: 0, price: (Math.random() * (150 - 50) + 50).toFixed(2) }
    ];
    
    
    // State to manage the cart

    const theme = useTheme();
    const iconColor = theme.palette.mode === 'dark' ? 'white' : 'black';

    
   

    return (
        <div>
            <div className="flex flex-wrap justify-around gap-4 p-6">
                {
                    shoes.map((shoe) => (
                        <div className="flex-none w-[220px]" key={shoe.id}>
                            <Card className="max-w-sm">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="/src/assets/shoes1.jpg"
                                        alt={shoe.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {shoe.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {shoe.name}s are a type of shoe known for their style and comfort.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button>
                                        <div className='border rounded-3xl'>
                                            <IconButton onClick={() => addToCart(shoe)}>
                                                <FaCartPlus color={iconColor} />
                                            </IconButton>
                                        </div>
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))
                }
            </div>

            
        </div>
    );
};

export default ShoesList;
