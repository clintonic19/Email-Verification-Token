//
import { useState } from "react"
import {User, Mail, Lock, Loader} from "lucide-react"
import {motion} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import { toast } from "react-hot-toast";

import FormInput from "../components/FormInput"
import PasswordMeter from "../components/PasswordMeter";
import {useStore} from "../authMiddleware/authApi";

const SignUpPage = () => {

  // STATE TO STORE USER NAME
  const [name, setName] = useState('')
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const navigate = useNavigate();
  // const isLoading = false;

  // FUNCTION TO HANDLE SIGN UP
  const {signup, error, isLoading} = useStore();

  // FUNCTION TO HANDLE SIGN UP
  const handleSignUP = async(e) =>{
    e.preventDefault();
    try {
      await signup(name, email, password); // SIGN UP USER
      navigate("/verify") // NAVIGATE TO VERIFY EMAIL PAGE
      toast.success("User Created Successfully, Please Verify Your Email"); // TOAST MESSAGE
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Error Creating User");     
    }
  }

  return (
    <>
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
		>
      <div className="p-8" >
      {/* <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center"> */}
      <h2 className="text-3xl font-bold m-6 text-center bg-gradient-to-r bg-clip-text text-white">
          Create Account
        </h2>
        
        {/* FORM TO SIGN UP USER */}
        <form onSubmit={handleSignUP} >          
        <FormInput
          icon={User}
          type="text"
          name="username"
          id="username"
          placeholder="Enter Your Full Name"
          value = {name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormInput
          icon={Mail}
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your email"
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          icon={Lock}
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your password"
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
        /> 

          {/* ERROR MESSAGE  */}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* PASSWORD STRENGTH SECTION */}
        <PasswordMeter password={password}/>

        <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-blue-600
         text-white font-bold rounded-lg shadow-lg hover:from-orange-600
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
            disabled ={isLoading}
						>
              {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" size={24}/> : "Sign Up"}
            </motion.button>

        </form>
    </div>
    <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
    <p className='text-sm text-gray-400'>Already have an Account? {""}

    <Link to={"/login"} className='text-red-400 hover:underline'>
						Login
					</Link>
      
      </p> 
    </div>

    
    
    </motion.div>

    </>
  )
}

export default SignUpPage
