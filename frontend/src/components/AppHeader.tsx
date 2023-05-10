// type User = {
//     fullname: string,
// }

function AppHeader(props:{User:string}):JSX.Element {
    return (
    <>
        <h3>{props.User}</h3>
        
    </>
    );
}

export default AppHeader;