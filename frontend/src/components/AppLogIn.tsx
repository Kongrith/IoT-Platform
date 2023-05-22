import { useState, ChangeEvent, FormEvent } from 'react'
import { getData } from '../services/getdata.service'
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks'
// import { loginThunk } from '../redux-toolkit/authSlice'
import { selectCounterState } from '../redux-toolkit/counterSlice'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { login } from '../redux-toolkit/authSlice'
// import { updateProfileAction } from '../redux-toolkit/auth/auth-slice'
// import { Link } from 'react-router-dom'
// import '../styles/loginpage.css'

//
const loginPath = 'http://localhost:5500/login'

// type ของ User Profile
// type User = {
//   id: number,
//   name: string,
//   email: string,
//   password: string
// }

type User = {
  message: string,
  access_token: string,
  token_type: string,
  expires_in: number
}

// กำหนดค่าเริ่มต้นของ Login Form
const defaultFormFields = {
  username: '',
  password: '',
}

interface NeedLoginProps {
  status: boolean,
  updateStatus: (arg: boolean) => void
}

function AppLogIn(props: NeedLoginProps) {
  const toast = useToast()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()        // ทั้ง reducer และ asynch thunk

  const [user, setUser] = useState<string | null>()
  const [formFields, setFormFields] = useState(defaultFormFields)

  //
  const { username, password } = formFields
  
  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    console.log(`${name}: ${value}`)                ////
    setFormFields({ ...formFields, [name]: value })
  }

  // กรณีกดปุ่ม submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // make the API call
      console.log(username, password)
      const res:User = await getData(loginPath, username, password)
      //const res = await dispatch(loginThunk({username, password})).unwrap()

      // ถ้ามี token (login สำเร็จ ให้เซฟลง local storage)
      if (res.access_token) {
        // alert(res.message);
        setUser(username);
        resetFormFields()
        sessionStorage.setItem("token", JSON.stringify(res.access_token));
        
        dispatch(login({profile: username}))
        navigate('/dashboard')

        toast({
          title: 'ผลการทำงาน',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })

      } else {
        toast({
          title: 'ผลการทำงาน',
          description: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      }
      
    } catch (error) {
      toast({
        title: 'ผลการทำงาน',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }

    // try {
    //   // วิธีที่ 1
    //   // dispatch(loginThunk(data))

    //   // วิธีที่ 2
    //   const result = await dispatch(loginThunk(data)).unwrap()
    //   // console.log(result.access_token)

    //   // ถ้ามี token (login แล้ว)
    //   if (result.access_token) {
    //     navigate('/dashboard')
    //   }

    // } catch (error: any) {
    //   // cast type
    //   const err: LoginErrorResponse = error
    //   // message จาก backend มาแสดงตรงนี้
    //   toast({
    //     title: 'ผลการทำงาน',
    //     description: err.message,
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //     position: 'top-right',
    //   })
    // }
  };

  const reload = (): void => {
    setUser(null);
    resetFormFields()
  };

  const {value} = useAppSelector(selectCounterState)
  
  return (
    <div className='container'>
      {/* {JSON.stringify(formFields.username)} */}
      <div className="wrapper">
        <span className="icon-close"><i className="fa-solid fa-xmark"></i></span>
        <div className="form-box login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-circle-user"></i></span>
              <input name="username" type="input" required value={username} onChange={handleChange} />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-lock"></i></span>
              <input name="password" type="password" required value={password} onChange={handleChange} />
              <label>Password</label>
            </div>
            {/* <div className="remember-forgot">
              <label><input type="checkbox" />Remember Me</label>
              <a href="#">Forgot Password?</a>
            </div> */}
            <button type="submit" className="btn">Login</button>
            <div className="login-register">
              <p>
                Don't have an account?&nbsp;&nbsp;
                <a href="#" className="register-link" onClick={() => props.updateStatus(props.status)}>Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    

  );
}

export default AppLogIn;