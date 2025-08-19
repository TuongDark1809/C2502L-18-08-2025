import * as React from 'react';
import '../style/Cart.css'
import '../style/General.css';
import '@fontsource/roboto/400.css';
import {
    HeaderMenuBtn,
    SearchBtn,
    AccountBtn
} from './MUI_Components/MUI_Buttons.jsx'
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    ButtonGroup,
    Button,
    Stack,
    Rating,
    IconButton,
    FormControl,
    InputLabel,
    FilledInput,
    InputAdornment,
    Link,
    Breadcrumbs,
    Typography
} from '@mui/material';
import { Link as RouterLink, useLocation } from "react-router-dom";

function handleClick(event) {
    event.preventDefault();
}

const breadcrumbNameMap = {
    "/home": "Home",
    "/productList": "Product List",
    "/cart": "Cart",
};

function Cart() {
    const [cart, setCart] = React.useState([])
    const [cost, setCost] = React.useState()
    React.useEffect(() => {
        //Tạo danh sách sản phẩm đã cho vào cart
        const items = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key.startsWith("Item")) {
                const data = JSON.parse(localStorage.getItem(key))
                items.push({ key, data })
            }
        }
        console.log(items)
        setCart(items)
        //Tính giá tiền của tất cả sản phẩm
        const sum = items.reduce((total, p) => total + (p.data.price) * (p.data.count), 0)
        console.log(sum)
        setCost(sum)
    }, [])

    const location = useLocation()
    const from = location.state?.from;

    const crumbs = []
    if (from) {
        if (from.startsWith("/productDetail/")) {
            const id = from.split("/").pop();
            crumbs.push({to: "/productList" , label: "Product List"})
            crumbs.push({ to: from, label: `Product Detail ${id}` });
        } else {
            crumbs.push({ to: from, label: breadcrumbNameMap[from] || from });
        }
    }
    crumbs.push({ to: "/cart", label: "Cart" });

    return (
        <>
            <div className="cart">
                <section className="cart__header">
                    <HeaderMenuBtn />

                    <div className="cart__header-title">
                        CART
                    </div>

                    <ButtonGroup
                        variant="text"
                        aria-label="cart button group"
                        className="cart__header-buttons"
                    >
                        <SearchBtn />
                        <AccountBtn />
                    </ButtonGroup>
                </section>

                <div onClick={handleClick} className='breadcrumbs'>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link component={RouterLink} to="/home" underline="hover" color="inherit">
                            Home
                        </Link>
                        {crumbs.map((crumb, index) =>
                            index === crumbs.length - 1 ? (
                                <Typography key={crumb.to} color="text.primary">
                                    {crumb.label}
                                </Typography>
                            ) : (
                                <Link
                                    component={RouterLink}
                                    underline="hover"
                                    color="inherit"
                                    to={crumb.to}
                                    key={crumb.to}
                                >
                                    {crumb.label}
                                </Link>
                            )
                        )}
                    </Breadcrumbs>
                </div>

                <section className="cart__body">
                    <div className="cart__body-title">
                        YOUR CART
                    </div>
                    <section className="cart__body-display -flexRow">
                        <div className="cart__body-display-list">
                            {cart.map((p) => (
                                <div className="cart__product -flexRow" key={p.key}>
                                    <img src={p.data.image} alt={p.data.name} />
                                    <div>
                                        <p className="cart__product-name">{p.data.name}</p>
                                        <Stack spacing={1}>
                                            <Rating
                                                name='pd__body-rate'
                                                defaultValue={p.data.rating}
                                                sx={{ fontSize: "1.5rem", paddingLeft: "12.5px" }}
                                                readOnly
                                            />
                                        </Stack>
                                        <p className="cart__product-price">${p.data.price}</p>
                                    </div>
                                    <div>
                                        <IconButton
                                            aria-label="delete"
                                            size="large"
                                            color='error'
                                            sx={{
                                                marginLeft: "112.5px",
                                                width: "50px",
                                                minWidth: "50px",
                                                height: "50px",
                                                padding: "0px",
                                            }}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                        <p className="cart__product-count">Total number: {p.data.count}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="cart__body-display-sum">
                            <p>Order Summary</p>
                            <div className="cart__body-display-calc -flexRow">
                                <div style={{ gap: "12.5px" }} className='-flexColumn'>
                                    <div>Subtotal:</div>
                                    <div>Discount:</div>
                                    <div>Delivery fee:</div>
                                </div>
                                <div
                                    style={{
                                        gap: "12.5px",
                                        marginLeft: "auto",
                                        marginRight: "12.5px",
                                        fontWeight: "bold"
                                    }}
                                    className='-flexColumn'
                                >
                                    <div>${cost}</div>
                                    <div style={{ color: "red" }}>-$0</div>
                                    <div>$15</div>
                                </div>
                            </div>

                            <div className="cart__body-display-total -flexRow">
                                <div>Total:</div>
                                <div
                                    style={{
                                        gap: "12.5px",
                                        marginLeft: "auto",
                                        marginRight: "12.5px",
                                        fontWeight: "bold"
                                    }}
                                >${cost + 15}</div>
                            </div>

                            <div className="cart__body-display-code -flexRow">
                                <FormControl variant='filled' sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "black", // màu label khi focus
                                    },
                                }}>
                                    <InputLabel htmlFor="outlined-adornment-code">Add promo code</InputLabel>
                                    <FilledInput
                                        disableUnderline
                                        id='cart__body-display-input'
                                        label="Add promo code"
                                        endAdornment={<InputAdornment position='end'><LocalOfferIcon sx={{ fontSize: "1.125rem" }} /></InputAdornment>}
                                        sx={{
                                            borderRadius: "25px",
                                            backgroundColor: "rgba(128, 128, 128, 0.125)",
                                            minWidth: "275px",
                                            maxWidth: "275px"
                                        }}
                                    />
                                </FormControl>
                                <Button
                                    variant='contained'
                                    sx={{
                                        borderRadius: "25px",
                                        backgroundColor: "black",
                                        padding: "15px",
                                        marginLeft: "auto",
                                        marginRight: "12.5px",
                                        fontFamily: "roboto",
                                        fontSize: "1rem",
                                        minWidth: "125px",
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>

                            <Button
                                variant='contained'
                                sx={{
                                    borderRadius: "25px",
                                    backgroundColor: "black",
                                    padding: "15px",
                                    marginTop: "25px",
                                    fontFamily: "roboto",
                                    fontSize: "1rem",
                                    minWidth: "450px",
                                }}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Go to Checkout
                            </Button>
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}



export default Cart