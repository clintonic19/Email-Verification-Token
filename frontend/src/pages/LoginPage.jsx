import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import FormInput from "../components/FormInput";
import { Lock, Mail, Loader } from "lucide-react";
import { useState } from "react";

import { useStore } from "../authMiddleware/authApi";
import { toast } from "react-hot-toast";

const LoginPage = () => {

  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const navigate = useNavigate();
  // const isLoading = false;

  const {login, isLoading, error} = useStore();

  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      toast.success("Login Successful");
      setTimeout(() => {
      }, 1100);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Error Logging In User");     
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
        <h2 className="text-3xl font-bold m-6 text-center bg-gradient-to-r bg-clip-text text-white">
          Login 
        </h2>        
        {/* FORM TO SIGN UP USER */}
        <form onSubmit={handleLogin} >             
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

        {/* FORGOT PASSWORD SECTION */}
        <div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-white hover:underline'>
							Forgot Password?
						</Link>
				</div>

           {/* ERROR MESSAGE  */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-blue-600
         text-white font-bold rounded-lg shadow-lg hover:from-orange-600
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
            disabled={isLoading}
						>
              {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto"/> : "Login"}
            </motion.button>
        </form>
    </div>

    <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
      <p className='text-sm text-gray-400'>Don&apos;t have an Account? {""}
        <Link to={"/signup"} className='text-red-400 hover:underline'>
						 Sign Up
				</Link>
      </p> 
    </div>
    </motion.div>
    
    </>
  )
}

export default LoginPage
