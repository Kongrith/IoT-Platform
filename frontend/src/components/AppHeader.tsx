import { selectAuthState } from '../redux-toolkit/authSlice';
import { useAppSelector } from '../redux-toolkit/hooks';
import '../styles/header.css'
import { Link, useLocation } from 'react-router-dom';

interface NeedLoginProps {
    status: boolean,
    updateStatus: (arg: boolean) => void
}

function AppHeader(props: NeedLoginProps) {
    const {isLogin} = useAppSelector(selectAuthState)
    const location = useLocation() 
    let isAboutPage = false
    if (location.pathname === "/about") {
        isAboutPage = true
    }

    return (
    <>
        <header>
            <div>
                <h2 className="logo">CJ</h2>
                <h6>express</h6>
            </div>
            <nav className='navigation'>
                <ul className="nav nav-tabs">
                {isLogin && <li className="nav-item pr-3 pt-3 pb-3"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>}
                {!isLogin && props.status && <li className="nav-item pr-3 pt-3 pb-3"><Link to="/login" className="nav-link" onClick={() => props.updateStatus(props.status)}>Register</Link></li>}
                {!isLogin && !props.status && <li className="nav-item pr-3 pt-3 pb-3"><Link to="/login" className="nav-link" onClick={() => props.updateStatus(props.status)}>Login</Link></li>}
                {!isAboutPage && <li className="nav-item pr-3 pt-3 pb-3"><Link to="/about" className="nav-link">About</Link></li>}
                </ul>
            </nav>
        </header>
    </>    
    );
}

export default AppHeader;