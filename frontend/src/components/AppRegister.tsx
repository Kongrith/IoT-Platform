import '../styles/about.css'

import { useState, ChangeEvent, FormEvent } from 'react'
import { getData, getRegister } from '../services/getdata.service'
// import { useAppDispatch, useAppSelector } from '../redux-toolkit/hooks'
// import { loginThunk } from '../redux-toolkit/authSlice'
// import { selectCounterState } from '../redux-toolkit/counterSlice'
// import { redirect, useNavigate } from 'react-router-dom'
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


interface NeedLoginProps {
  status: boolean,
  updateStatus: (arg: boolean) => void
}

function AppRegister(props: NeedLoginProps) {
  const toast = useToast()
  // const dispatch = useAppDispatch()                                // ทั้ง reducer และ asynch thunk 👈
  // const navigate = useNavigate()

  // react hooks สำหรับ state
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { username, email, password } = formFields

  // สำหรับ error state
  const [errorUserName, setErrorUserName] = useState(""); // กรุณาป้อนชื่อผู้ใช้
  const [errorEmail, setErrorEmail] = useState("");       // รูปแบบอีเมลไม่ถูกต้อง
  const [errorPassword, setErrorPassword] = useState(""); // รหัสผ่านต้องมีจำนวนมากกว่า 4 ตัวอักษร

  // สำหรับแสดงผล
  const [userNameColor, setUserNameColor] = useState("");
  const [emailColor, setEmailColor] = useState("");
  const [passwordColor, setPasswordColor] = useState("");

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    // console.log(`${name}: ${value}`)                ////
    setFormFields({ ...formFields, [name]: value })

    switch (name) {
      case 'username':
        // ชื่อผู้ใข้ต้องไม่ว่างเปล่า
        if (username.trim().length >= 2) {
          
          setErrorUserName("");
          setUserNameColor("green");
        } else {
          setErrorUserName("กรุณาป้อนชื่อผู้ใช้ตั้งแต่ 3 ตัวอักษรและต้องไม่มีช่องว่าง");
          setUserNameColor("red");
        }
        break;
      case 'email':
        if (validateEmail(email)) {
          setErrorEmail("");
          setEmailColor("green");
        } else {
          setErrorEmail("รูปแบบอีเมลไม่ถูกต้อง");
          setEmailColor("red");
        }
        break;
      case 'password':
        if (password.trim().length >= 3) {
          
          setErrorPassword("");
          setPasswordColor("green");
        } else {
          setErrorPassword("รหัสผ่านต้องมีจำนวน 4 ตัวอักษรขึ้นไป");
          setPasswordColor("red");
        }
        break;
      default: {
        console.log('Error Case')
      }
    }
  }
  
  // กรณีกดปุ่ม submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      console.log(registerPath)
      // make the API call
      const res: User = await getRegister(registerPath, username, email, password)
      // setUser(username);                                               // จะได้ id, name, email, password
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
              <input name="username" type="input" style={{ borderColor: emailColor }} required value={username} onChange={handleChange} />
              <label>Username</label>
              <small style={{ borderColor: userNameColor, color: userNameColor}}>{errorUserName}</small>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-regular fa-envelope"></i></span>
              <input name="email" type="email" style={{ borderColor: emailColor }} required value={email} onChange={handleChange}  />
              <label>Email</label>
              <small style={{ borderColor: emailColor, color: emailColor}}>{errorEmail}</small>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-lock"></i></span>
              <input name="password" type="password" style={{ borderColor: emailColor }} required value={password} onChange={handleChange}/>
              <label>Password</label>
              <small style={{ borderColor: passwordColor, color: passwordColor }}>{errorPassword}</small>
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