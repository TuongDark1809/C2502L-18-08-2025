import * as React from 'react';
import '../style/ProductDetails.css'
import '../style/General.css';
import '@fontsource/roboto/400.css';
import {
    HeaderMenuBtn,
    ShoppingBtn,
    SearchBtn,
    AccountBtn,
    ProductDetailsAccordion,
    CountBtn,
} from './MUI_Components/MUI_Buttons.jsx'
import CircularProgress from "@mui/material/CircularProgress";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { ButtonGroup, Button, Rating, Stack, Link, Breadcrumbs } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom'
import axios from 'axios';

function handleClick(event) {
    event.preventDefault();
}

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
            setProduct(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }
    React.useEffect(() => {
        fetchData();
    }, [])

    const [count, setCount] = React.useState(1)
    //Phần js randow thời gian ship hàng
    const [weeks, setWeeks] = React.useState(null)
    React.useEffect(() => {
        if (product) {
            setWeeks(Math.floor(Math.random() * 10) + 1)
        }
    }, [product])

    //Phần hiện lên trong lúc fetch api
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <div className="pd">
                <section className="pd__header">
                    <HeaderMenuBtn />

                    <div className="pd__header-title">
                        PRODUCT LIST
                    </div>

                    <ButtonGroup
                        variant="text"
                        aria-label="home button group"
                        className="pd__header-buttons"
                    >
                        <ShoppingBtn/>
                        <SearchBtn />
                        <AccountBtn />
                    </ButtonGroup>
                </section>
            </div>

            <div onClick={handleClick} className='breadcrumbs'>
                <Breadcrumbs aria-label="breadcrumb" separator="›">
                    <Link component={RouterLink} to="/home" underline="hover" color="inherit">
                        Home
                    </Link>
                    <Link component={RouterLink} to="/productList" underline="hover" color="inherit">
                        Product List
                    </Link>
                    <Link  aria-current="page" component={RouterLink} to="/productDetail/:id" underline="hover" color='text.primary'>
                        Product Detail
                    </Link> 
                </Breadcrumbs>
            </div>

            <div className="pd__body -flexRow">
                <img src={product?.image} alt={product?.title} />

                <section className="pd__body-product -flexColumn">
                    <div className="pd__body-details -flexColumn">
                        <p className="pd__body-category">{product?.category.toUpperCase()}</p>
                        <p className="pd__body-title">{product?.title}</p>
                        <div className="pd__body-shipping -flexRow">
                            <LocalShippingIcon />
                            <p>Delivery from {weeks} week(s)</p>
                        </div>
                    </div>

                    <ProductDetailsAccordion description={product?.description} />

                    <div className="pd__body-prices -flexRow">
                        <div className="-flexColumn">
                            <p className='pd__body-prices-title'>Regular price</p>
                            <p className='pd__body-prices-number'>${product?.price}</p>
                        </div>
                        <div className="-flexColumn">
                            <p className='pd__body-prices-title'>Member price (Save up to $200 for $100 per year)</p>
                            <p className='pd__body-prices-number'>${(product?.price * 0.85).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="pd__body-count -flexRow">
                        <div className="pd__body-amount -flexRow">
                            <CountBtn onClick={() => setCount(count - 1)} disabled={count <= 1}>-</CountBtn>
                            <p>{count}</p>
                            <CountBtn onClick={() => setCount(count + 1)} disabled={count >= 10}>+</CountBtn>
                        </div>

                        <Stack spacing={1}>
                            <Rating name='pd__body-rate' defaultValue={product?.rating.rate} sx={{ fontSize: "3rem" }} readOnly />
                        </Stack>
                    </div>

                    <div className="pd__body-btn-group -flexRow">
                        <Button
                            variant='outlined'
                            sx={{
                                borderRadius: "20px",
                                borderColor: "black",
                                padding: "15px",
                                fontFamily: "roboto",
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                                color: "black",
                                minWidth: "400px",
                            }}
                            onClick={() => {
                                const item = {
                                    id: product.id,
                                    name: product.title,
                                    price: product.price,
                                    count: count,
                                    image: product.image,
                                    rating: product.rating.rate,
                                }
                                localStorage.setItem(`Item${product.id}`, JSON.stringify(item))
                            }}
                        >Add to cart</Button>
                        <Button
                            variant='contained'
                            sx={{
                                borderRadius: "20px",
                                backgroundColor: "black",
                                padding: "15px",
                                fontFamily: "roboto",
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                                minWidth: "400px",
                            }}
                        >Buy now</Button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ProductDetail