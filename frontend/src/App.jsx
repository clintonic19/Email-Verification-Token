import { Navigate, Route, Routes } from "react-router-dom";
import Shapes from "./components/Shapes"
import PropTypes from 'prop-types';

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

// import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmail from "./pages/EmailVerification";
// import { Toaster } from "sonner";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useStore } from "./authMiddleware/authApi";
import SpinnerLoader from "./components/SpinnerLoader";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import VerifyEmail from "./pages/VerifyEmail";

// PROTECTED ROUTE FOR AUTHENTICATED USER
const ProtectedRoute = ({children}) =>{
  const { isAuthenticated, user } = useStore();

  // IF USER IS NOT AUTHENTICATED
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  // IF USER IS NOT VERIFIED
  if(!user?.isVerified){
    return <Navigate to="/verify" replace/>
  }

  if(user?.isAuthenticated){
    return <Navigate to="/"/>
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};




  // CHECK FOR AUTHENTICATED USER AND REDIRECT TO THE HOMEPAGE
  const RedirectAuthUser = ({children}) =>{
    const { isAuthenticated, user } = useStore();
  
    if(isAuthenticated && user?.isVerified){
      return <Navigate to="/" replace/>
    }
    return children;
  
  }

  RedirectAuthUser.propTypes = {
    children: PropTypes.node.isRequired,
  };

  
function App() {
  const { checkAuth, checkStatus } = useStore();

  useEffect(()=>{
    checkStatus()
  }, [checkStatus]);

  if(checkAuth) return <SpinnerLoader/>
  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-blue-900 flex items-center justify-center overflow-hidden">

      <Shapes color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<Shapes color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<Shapes color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

{/* ROUTES FOR THE DIFFERENT PAGES */}
  <Routes>
      <Route path ="/" element={
        <ProtectedRoute>
          <HomePage/>
        </ProtectedRoute>
        } />
      
      <Route path ="/signup" element={
        // Redirect Authenticated User After User Signed Up
        <RedirectAuthUser>
          <SignUpPage/> 
        </RedirectAuthUser>
      } />

      <Route path ="/login" element={
        <RedirectAuthUser>
          <LoginPage/>
        </RedirectAuthUser>
        } />
      {/* <Route path ="/verify" element={<VerifyEmail/>} /> */}


      <Route path ="/verify" element={
        // <RedirectAuthUser>
        //   <VerifyEmail/>
        // </RedirectAuthUser>
          <VerifyEmail/>
        // <ProtectedRoute >
      // </ProtectedRoute> 
      } />

      <Route path ="/forgot-password" element={   
        <RedirectAuthUser>
          <ForgotPassword/>
        </RedirectAuthUser>
        } />

    <Route path ="/reset-password/:token" element={   
        <RedirectAuthUser>
          <ResetPassword/>
        </RedirectAuthUser>
        } /> 

         {/*All Routes  */}
        <Route path="*" element={<Navigate to="/" replace/>} />
  </Routes>

  
  <Toaster/>

</div>
    </>
  )
}

export default App
