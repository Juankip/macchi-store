import PersonCard from '../common/PersonCard';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1a1a1a', padding: '40px', borderTop: '1px solid #333', fontFamily: 'sans-serif', color: '#eee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ maxWidth: '300px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', textTransform: 'uppercase', color: '#c1121f' }}>Gen Rockero</h3>
          <p style={{ margin: '0 0 5px 0', color: '#aaa', lineHeight: '1.5' }}>Tienda online de remeras de las mejores bandas de rock. Diseños pensados para llevar la música en los genes.</p>
          <p style={{ margin: 0, color: '#aaa', fontWeight: 'bold' }}>Buenos Aires, Argentina.</p>
        </div>
        <div>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '18px', textTransform: 'uppercase' }}>El Crew</h4>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <PersonCard name="Mercedes Arévalo" role="Fundadora y Dirección" />
            <PersonCard name="JuanSe Macchi" role="Desarrollador Web" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;