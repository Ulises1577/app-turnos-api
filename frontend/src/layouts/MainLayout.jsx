import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

export default function MainLayout({ 
    children,  
}) {

    return <div 
    style={{ 
        minHeight: '100vh',
        flexDirection: 'column',
        display: 'flex',
    }}> 
        <Header />

        <div className="body"
        style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Menu />

            <main 
            style={{ 
                backgroundColor: 'lightgreen',
                flex: 1,}}>

                {children}
            </main>
        </div>
        <Footer/>
    </div>;
}