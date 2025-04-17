import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store';
import { toast, ToastContainer } from 'react-toastify';

const SignIn = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
      username: "",
      password: ""
    })
  
    const change = (event) => {
      const { name, value } = event.target;
      setInputs((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  
    const submit = async (event) => {
      event.preventDefault();
      if(Inputs.username.length==0 || Inputs.password.length===0){
        toast.error("Username or Password can not be empty!");
        return;
      }
      try {
        await axios.post(`${window.location.origin}/api/v1/signin`,
          {
            username: Inputs.username,
            password: Inputs.password
          }
        )
        .then((response) => {
          // console.log(response.data.others._id);
          if(response.data.message==='loged in'){
            dispatch(authActions.login());
          sessionStorage.setItem("id", response.data.others._id);
          history('/');
          }else {
            toast.error(response.data.message);
          }
        })
      } catch (error) {
        toast.error("Something went wrong!")
      }
    }

  return (
    <div className='signup flex justify-center items-center'>
      <ToastContainer />
      <div className="container flex justify-center items-center">
        <div className="w-200 h-100 bg-zinc-800 flex flex-col justify-center">

          <div className="left-div mb-5 sm:mb-0 flex flex-col justify-center items-center">
            <h2 className="headline-2 lg:max-w-[12ch] mb-5">
              SignIn
            </h2>
            <div className="flex flex-col w-3/4 mx-auto">

              <form action="">
                <label htmlFor="" className='label'>Username</label>

                <input
                  type="text"
                  name="username"
                  id="username"
                  value={Inputs.username}
                  className='text-field '
                  placeholder='Username'
                  onChange={change}
                />

                <label htmlFor="" className='label'>Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={Inputs.password}
                  autoComplete='off'
                  placeholder='Password'

                  className='text-field '
                  onChange={change}
                />

                <button 
                type="submit" 
                className='btn btn-primary btn-primary-submit w-full justify-center mt-3'
                onClick={submit}
                >
                  SignIn
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default SignIn