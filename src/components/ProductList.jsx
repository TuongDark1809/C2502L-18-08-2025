import * as React from 'react';
import '../style/ProductList.css';
import '../style/General.css';
import '@fontsource/roboto/400.css';
import {
    HeaderMenuBtn,
    ShoppingBtn,
    SearchBtn,
    AccountBtn,
    CustomLink,
    FilterBtnGroup,
    CategoriesBtnGroup,
    DetailsBtn
} from './MUI_Components/MUI_Buttons.jsx'
import SearchBar from './MUI_Components/MUI_SearchBar.jsx'
import InsertChartIcon from '@mui/icons-material/InsertChart';
import GridViewIcon from '@mui/icons-material/GridView';
import PaddingIcon from '@mui/icons-material/Padding';
import CircularProgress from "@mui/material/CircularProgress";
import { ButtonGroup, Link, Breadcrumbs } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios';

function handleClick(event) {
    event.preventDefault();
}

function ProductList() {
    const [list, setList] = React.useState([]);
    const [originalList, setOriginalList] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const fetchData = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products")
            setList(response.data)
            setOriginalList(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        fetchData();
    }, [])
    console.log(originalList)

    //Phần js cho searchbar
    React.useEffect(() => {
        if (search === "") {
            setList(originalList)
        } else {
            const searchedProducts = originalList.filter(
                (e) =>
                    e.title.toLowerCase().includes(search.toLowerCase()) ||
                    e.category.toLowerCase().includes(search.toLowerCase())
            );
            setList(searchedProducts);
        }
    }, [search, originalList])

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
    };

    //Phần sắp xếp sản phẩm khi ấn các nút trên sidebar
    const handleFilter = (type) => {
        let sortedList = [...originalList]
        if (type === "popular") {
            sortedList.sort((a, b) => b.rating.count - a.rating.count)
        } else if (type === "favorite") {
            sortedList.sort((a, b) => b.rating.rate - a.rating.rate)
        } else if (type === "cheap") {
            sortedList.sort((a, b) => a.price - b.price)
        } else if (type === "menClothing") {
            sortedList = originalList.filter((p) => p.category === "men's clothing")
        } else if (type === "womenClothing") {
            sortedList = originalList.filter((p) => p.category === "women's clothing")
        } else if (type === "jewelery") {
            sortedList = originalList.filter((p) => p.category === "jewelery")
        } else if (type === "electronics") {
            sortedList = originalList.filter((p) => p.category === "electronics")
        }
        setList(sortedList)
    }

    return (
        <>
            <div className="pl">
                <section className="pl__header">
                    <HeaderMenuBtn />

                    <div className="pl__header-title">
                        PRODUCT LIST
                    </div>

                    <ButtonGroup
                        variant="text"
                        aria-label="home button group"
                        className="pl__header-buttons"
                    >
                        <ShoppingBtn/>
                        <SearchBtn />
                        <AccountBtn />
                    </ButtonGroup>
                </section>

                <div onClick={handleClick} className='breadcrumbs'>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link component={RouterLink} to="/home" underline="hover" color="inherit">
                            Home
                        </Link>
                        <Link component={RouterLink} to="/productList" underline="hover" color="text.primary" aria-current="page">
                            Product List
                        </Link>
                    </Breadcrumbs>
                </div>

                <section className="pl__body">
                    <p className="pl__body-title">Popular Products</p>
                    <p className="pl__body-description">
                        Join the countless others who have fallen in love with these
                        products. Each item has been a top performer
                    </p>
                </section>

                <section className="pl__display">
                    <div className="pl__display-nav">
                        <div className="pl__display-nav-icons -flexRow">
                            <InsertChartIcon />
                            <GridViewIcon />
                        </div>
                        <SearchBar
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="pl__display-nav-icons -flexRow">
                            <p>Ajust By</p>
                            <PaddingIcon />
                        </div>
                    </div>
                </section>

                <section className="pl__list -flexRow">
                    <div className="pl__list-sidebar -flexColumn">
                        <p className="pl__list-sidebar-title">FILTER</p>
                        <FilterBtnGroup onFilter={handleFilter} />
                        <p className="pl__list-sidebar-title">CATEGORIES</p>
                        <CategoriesBtnGroup onFilter={handleFilter} />
                    </div>

                    {/*Phần danh sách sản phẩm*/}
                    <div className="pl__list-display">
                        {list.map((p) => (
                            <div className="pl__list-display-product" key={p.id}>
                                <img src={p.image} alt={p.title} />
                                <div className="pl__list-product-header -flexRow">
                                    <h5 className="pl__product-name">{p.title}</h5>
                                    <h5 className="pl__product-price">${p.price}</h5>
                                </div>
                                <CustomLink to={`/productDetail/${p.id}`}>
                                    <DetailsBtn variant="outlined">
                                        Product details
                                    </DetailsBtn>
                                </CustomLink>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default ProductList