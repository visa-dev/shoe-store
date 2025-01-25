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
        { id: 1, name: 'Nike Air Max', quantity: 1, price: 121, image: '/src/assets/shoes1.jpg' },
        { id: 2, name: 'Adidas Boost', quantity: -1, price: 181, image: '/src/assets/shoes2.jpg' },
        { id: 3, name: 'Puma Suede', quantity: -1, price: 85, image: '/src/assets/shoes3.jpg' },
        { id: 4, name: 'Rok Classic', quantity: 1, price: 70, image: '/src/assets/shoes4.jpg' },
        { id: 5, name: 'Converse Chuck Taylor', quantity: 1, price: 55, image: '/src/assets/shoes5.jpg' },
        { id: 6, name: 'Nike Air Max', quantity: 1, price: 126, image: '/src/assets/shoes1.jpg' },
        { id: 7, name: 'Adidas UltraBoost', quantity: -1, price: 160, image: '/src/assets/shoes2.jpg' },
        { id: 8, name: 'Puma Suede', quantity: 1, price: 90, image: '/src/assets/shoes3.jpg' },
        { id: 9, name: 'Reebok Classic', quantity: 1, price: 66, image: '/src/assets/shoes4.jpg' },
        { id: 10, name: 'Converse Chuck Taylor', quantity: -1, price: 60, image: '/src/assets/shoes5.jpg' }
    ];

    // Update availability based on quantity (true if quantity > 0)
    shoes.forEach(shoe => {
        shoe.availability = shoe.quantity > 0;
    });


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
                                            {shoe.name} s are a type of shoe known for their style and comfort.
                                        </Typography>
                                        <div className='mt-3'>  Rs {shoe.price}.00</div>

                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="flex justify-between">
                                    {shoe.quantity >= 0 ? (
                                        <Button onClick={() => addToCart(shoe)}>
                                            <div className="border rounded-3xl">
                                                <IconButton>
                                                    <FaCartPlus color={iconColor} />
                                                </IconButton>
                                            </div>
                                        </Button>
                                    ) : (
                                        <div className="border bg-red-500 p-1 rounded-md">Out of Stock</div>
                                    )}
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
