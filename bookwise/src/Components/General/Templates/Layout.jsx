import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import '../../../css/General/Layout.css'

function Layout() {

    return (
        <div className="app-layout">

            <Header />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}

export default Layout;