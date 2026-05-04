import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fffcf9' }}>
      <Header />
      <main style={{ flex: 1, padding: '40px', fontFamily: 'sans-serif', color: '#5c4d4c' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;