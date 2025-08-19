import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import DiamondIcon from '@mui/icons-material/Diamond';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    IconButton,
    Menu,
    MenuItem,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import styled from '@emotion/styled';

const CustomBtn = styled(IconButton)(({ }) => ({
    border: "none",
    borderRadius: "0px",
    width: "48px",
    height: "48px",
    marginTop: "12px",
    color: "white",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.125)"
    },
}));

const CustomLink = styled(Link)(({ }) => ({
    textDecoration: "none",
}));

const CustomToggleBtn = styled(ToggleButton)(({ }) => ({
    justifyContent: "flex-start",
    WebkitJustifyContent: "flex-start",
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "rgb(40, 148, 250)",
        backgroundColor: "black",
    }
}));

const DetailsBtn = styled(Button)(({ }) => ({
    border: "2.5px solid grey",
    borderRadius: "25px",
    marginLeft: "25px",
    marginBottom: "25px",
    color: "grey",
    width: "300px",
    "&:hover": {
        backgroundColor: "rgba(40, 148, 250, 0.25)",
        color: "black"
    }
}));

const CountBtn = styled(Button)(({ }) => ({
    width: "50px",
    minWidth: "50px",
    height: "50px",
    padding: "0px",
    borderRadius: "32px",
    backgroundColor: "rgb(245, 245, 245)",
    fontSize: "2.5rem",
    color: "black",
    "&:hover": {
        backgroundColor: "rgba(40, 148, 250, 0.25)",
    }
}));


function HeaderMenuBtn() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <CustomBtn
                id="header_menu-button"
                aria-controls={open ? "header_menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MenuRoundedIcon />
            </CustomBtn>

            <Menu
                id="header_menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{ list: { "aria-labelledby": "header_menu-button" } }}
                elevation={0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <CustomLink to="/"><MenuItem onClick={handleClose}>Logout</MenuItem></CustomLink>
            </Menu>
        </>
    )
}

function ShoppingBtn() {
    return (
        <CustomBtn>
            <Link 
                to="/cart"
                style={{
                    color: "white"
                }}
                state={{from: window.location.pathname}}
            >
            <ShoppingBagIcon />
            </Link>
        </CustomBtn>
    )
}

function SearchBtn() {
    return (
        <CustomBtn>
            <SearchIcon />
        </CustomBtn>
    )
}

function AccountBtn() {
    return (
        <CustomBtn>
            <AccountCircleIcon />
        </CustomBtn>
    )
}

function FilterBtnGroup({ onFilter }) {
    const [view, setView] = React.useState('list');
    const handleChange = (event, nextView) => {
        setView(nextView);
        if (nextView !== null) {
            onFilter(nextView)
        }
    };

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <CustomToggleBtn
                value="popular"
                aria-label="Popular"
                children={<><StarIcon /><h2>Popular</h2></>}
            />
            <CustomToggleBtn
                value="favorite"
                aria-label="Favorite"
                children={<><FavoriteIcon /><h2>Favorite</h2></>}
            />
            <CustomToggleBtn
                value="cheap"
                aria-label="Cheap"
                children={<><MonetizationOnIcon /><h2>Cheap</h2></>}
            />
        </ToggleButtonGroup>
    )
}

function CategoriesBtnGroup({ onFilter }) {
    const [view, setView] = React.useState('list');
    const handleChange = (event, nextView) => {
        setView(nextView);
        if (nextView !== null) {
            onFilter(nextView)
        }
    };

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <CustomToggleBtn
                value="menClothing"
                aria-label="MenClothing"
                children={<><ManIcon /><h2>Men's</h2></>}
            />
            <CustomToggleBtn
                value="womenClothing"
                aria-label="WomenClothing"
                children={<><WomanIcon /><h2>Women's</h2></>}
            />
            <CustomToggleBtn 
                value="jewelery" 
                aria-label="Jewelery" 
                children={<><DiamondIcon /><h2>Jewelery</h2></>} 
            />
            <CustomToggleBtn 
                value="electronics"
                aria-label='Electronics'
                children={<><ElectricBoltIcon /><h2>Electronics</h2></>}
            />
        </ToggleButtonGroup>
    )
}

const CustomAccordion = styled(Accordion)(({ }) => ({
    width: "940.86px",
    maxWidth: "940.86px",
    boxShadow: "none",
    marginLeft: "50px",
    marginBottom: "25px",
    "&.Mui-expanded": {
        marginLeft: "50px",
        marginBottom: "25px",
    },
}));

function ProductDetailsAccordion(params) {
    return (
        <CustomAccordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.5rem' }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ padding: "0px" }}
            >
                <Typography
                    component="span"
                    sx={{
                        fontFamily: "roboto",
                        fontWeight: "bold",
                        fontSize: "1.25rem"
                    }}
                >
                    DESCRIPTION
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0px" }}>
                <Typography sx={{ color: "grey" }}>
                    {params.description}
                </Typography>
            </AccordionDetails>
        </CustomAccordion>
    )
}

export {
    HeaderMenuBtn,
    ShoppingBtn,
    SearchBtn,
    AccountBtn,
    CustomLink,
    FilterBtnGroup,
    CategoriesBtnGroup,
    DetailsBtn,
    ProductDetailsAccordion,
    CountBtn,
}
