const PersonCard = ({ name, role }) => {
  return (
    <div style={{ border: '1px solid #f2e8e3', padding: '15px', borderRadius: '8px', backgroundColor: '#faf6f3', minWidth: '150px' }}>
      <h4 style={{ margin: '0 0 5px 0', fontFamily: 'serif', color: '#5c4d4c' }}>{name}</h4>
      <p style={{ margin: 0, fontSize: '0.9em', color: '#8a7977', fontFamily: 'sans-serif' }}>{role}</p>
    </div>
  );
};

export default PersonCard;