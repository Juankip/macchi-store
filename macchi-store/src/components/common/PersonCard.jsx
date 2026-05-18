const PersonCard = ({ name, role }) => {
  return (
    <div style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px', backgroundColor: '#222', minWidth: '150px' }}>
      <h4 style={{ margin: '0 0 5px 0', fontFamily: 'sans-serif', color: '#eee', textTransform: 'uppercase' }}>{name}</h4>
      <p style={{ margin: 0, fontSize: '0.9em', color: '#aaa', fontFamily: 'sans-serif' }}>{role}</p>
    </div>
  );
};

export default PersonCard;