import { Link } from 'react-router-dom';
import '../style/Home.css';
import '../style/General.css';
import '@fontsource/roboto/400.css';
import { 
    HeaderMenuBtn, 
    ShoppingBtn, 
    SearchBtn, 
    AccountBtn 
} from './MUI_Components/MUI_Buttons.jsx'
import AdjustIcon from '@mui/icons-material/Adjust';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ButtonGroup } from '@mui/material';


function Home() {
    return (
        <>
            <div className="home">
                <section className="home__header">
                    <HeaderMenuBtn />

                    <div className="home__header-title">
                        H <AdjustIcon size="large" /> M E
                    </div>
                    <ButtonGroup
                        variant="text"
                        aria-label="home button group"
                        className="home__header-buttons"
                    >
                        <ShoppingBtn />
                        <SearchBtn />
                        <AccountBtn />
                    </ButtonGroup>
                </section>

                <section className="home__body">
                    <div className="home__body-title">
                        <p>PRO</p>
                        <p className="home__body-title-bottom">DUCTS</p>
                    </div>
                </section>

                <div className="home__body-container -flexRow">
                    <p className="home__body-info">
                        Welcome to HOME, where you'll find high-quality
                        products that combine design, comfort, and
                        affordability. Transform your experiences with our
                        curated selections
                    </p>
                    <Link to="/productList" className="home__body-link">
                        Product List{' '}
                        <ArrowForwardIcon sx={{ fontSize: 20 }} />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home

