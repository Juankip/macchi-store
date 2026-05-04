import PersonCard from '../common/PersonCard';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#fdfbf7', padding: '40px', borderTop: '1px solid #eaddd7', fontFamily: 'serif', color: '#5c4d4c' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ maxWidth: '300px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Macchi</h3>
          <p style={{ margin: '0 0 5px 0', color: '#8a7977' }}>Tienda de diseño artesanal dedicada a la creación de bolsos y collares únicos.</p>
          <p style={{ margin: 0, color: '#8a7977', fontWeight: 'bold' }}>Fundada en 2025.</p>
        </div>
        <div>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Nuestro Equipo</h4>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <PersonCard name="Ana Silva" role="Diseñadora de Bolsos" />
            <PersonCard name="Carlos Gómez" role="Artesano de Collares" />
            <PersonCard name="Lucía Torres" role="Atención al Cliente" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;