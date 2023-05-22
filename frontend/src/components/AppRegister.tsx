import '../styles/about.css'

import { useState, ChangeEvent, FormEvent } from 'react'
import { getData, getRegister } from '../services/getdata.service'
import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks'
import { loginThunk } from '../redux-toolkit/authSlice'
import { selectCounterState } from '../redux-toolkit/counterSlice'
import { redirect, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
// import '../styles/loginpage.css'

const registerPath = 'http://localhost:5500/register'

// type ของ User Profile
type User = {
  message: string,
}

// กำหนดค่าเริ่มต้นของ Login Form
const defaultFormFields = {
  username: '',
  email: '',
  password: '',
}

//
interface NeedLoginProps {
  status: boolean,
  updateStatus: (arg: boolean) => void
}

function AppRegister(props: NeedLoginProps) {
  const toast = useToast()
  // const dispatch = useAppDispatch()                                // ทั้ง reducer และ asynch thunk 👈
  const navigate = useNavigate()

  // react hooks
  const [user, setUser] = useState<string | null>()
  const [formFields, setFormFields] = useState(defaultFormFields)

  //
  const { username, email, password } = formFields
  
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
      console.log(registerPath)
      // make the API call
      const res: User = await getRegister(registerPath, username, email, password)
      setUser(username);                                               // จะได้ id, name, email, password
      resetFormFields()
      
      toast({
        title: 'ผลการทำงาน',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      props.updateStatus(false)
      
    } catch (error) {
      toast({
        title: 'ผลการทำงาน',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  };

  // const reload = (): void => {
  //   setUser(null);
  //   resetFormFields()
  // };

  // const {value} = useAppSelector(selectCounterState)
  
  return (
    <div className='container'>
      {/* {JSON.stringify(formFields.username)} */}
      <div className="wrapper">
        <div className="form-box register" >
          <h2>Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-circle-user"></i></span>
              <input name="username" type="input" required value={username} onChange={handleChange} />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-regular fa-envelope"></i></span>
              <input name="email" type="email" required value={email} onChange={handleChange}  />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-lock"></i></span>
              <input name="password" type="password" required value={password} onChange={handleChange}/>
              <label>Password</label>
            </div>
            <button type="submit" className="btn" >Register</button>
            <div className="login-register">
              <p>
                Already have an account?&nbsp;&nbsp;
                <a href="#" className="login-link" onClick={() => props.updateStatus(props.status)} >Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    

  );
}

export default AppRegister;