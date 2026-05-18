import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#111' }}>
      <Header />
      <main style={{ flex: 1, padding: '40px', fontFamily: 'sans-serif', color: '#eee' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;