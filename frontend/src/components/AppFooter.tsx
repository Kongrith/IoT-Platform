import '../styles/footer.css'

function AppFooter():JSX.Element {
    return (
    <div className='footer'>
        <p style={{color: 'grey', display: 'inline-block', width: '20%'}}>Developed by Dr.Kongrith Komasatid</p>
        <p style={{color: 'grey', display: 'inline-block', marginLeft: '65%'}}>{new Date().toLocaleString()}</p>
    </div>
    );
}

export default AppFooter;