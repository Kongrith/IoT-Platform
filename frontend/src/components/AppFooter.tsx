function AppFooter():JSX.Element {
    return (
    <>
        <hr />
        <p style={{color: 'blue'}}>Created by Dr.Kongrith Komasatid</p>
        <p>{new Date().toLocaleString()}</p>
    </>);
}

export default AppFooter;