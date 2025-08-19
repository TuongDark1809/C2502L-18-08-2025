import {Link} from 'react-router-dom'

function AddProduct() {
    return (
        <>
            <h1>THIS IS ADD PRODUCT</h1><br/>
            <Link to="/home">Home</Link><br />
            <Link to="/productDetail">Product Detail</Link><br/>
            <Link to="/productList">Product List</Link><br/>
            <Link to="/addProduct">Add Product</Link><br/>
        </>
    )
}

export default AddProduct