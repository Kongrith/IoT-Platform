import { redirect } from "react-router-dom";
import { GetOut } from "../services/GetOut";

function AppLogOut() {
  const handleSubmit = ():void => {
    GetOut();
    redirect('/')
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <button type='submit' style={{color: "blue", fontSize: 40}}>Need Log Out ?</button>
      </form>
    </div>
  );
}

export default AppLogOut;