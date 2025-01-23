// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useStore } from "../authMiddleware/authApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";




// const VerifyEmail = () => {
//     const [token, setToken] = useState(["", "", "", "", "", ""]);
//     const inputRefs = useRef([]);
//     const navigate = useNavigate();

//     const {verifyEmail, error, isLoading} = useStore();
//     // const isLoading = false;
    
//     // FUNCTION TO HANDLE KEY DOWN
//     const handleKeyDown = async(index, e)=>{
//         e.preventDefault();
//         // IF BACKSPACE IS PRESSED
//         if(e.key ==="Backspace" && !token[index] && index > 0){
//             inputRefs.current[index - 1].focus();
//         }
//     }

//     // FUNCTION TO HANDLE CHANGE
//     const handleChange = async(index, value) =>{
        
//         const newToken = [...token];

//         //TOKEN PASTED FROM EMAIL HERE
//         /**
//          * CHECK IF A USER PASTED A TOKEN LONGER THAN 1
//          * IF YES, SPLIT THE TOKEN AND ASSIGN TO THE TOKEN ARRAY
//          * ELSE, ASSIGN THE VALUE TO THE TOKEN ARRAY
//          */
//         if(value.length > 1){
//             // SPLIT THE TOKEN
//             const pastedToken = value.slice(0, 6).split("");
//             for (let i = 0; i < 6; i++) {
//                 newToken[i] = pastedToken[i] || "";
//             };
//             setToken (newToken);
                    
//             /**
//              * CONDITION FOCUS ON LAST NON-EMPTY INPUT OR THE FIRST EMPTY INPUT
//              * 
//              */
//             const lastFillDigit = newToken.findLastIndex((digit) => digit !=="");
//             const focusIndex = lastFillDigit < 5 ? lastFillDigit + 1 : 5;
//             inputRefs.current[focusIndex].focus();

//         }else{
//             newToken[index] = value;
//             setToken(newToken);

//             /**
//              * This condition allows focus to be on the next Input field
//              * Move to the next Input field if value is entered 
//              */
//             if(value && index < 5){
//                 inputRefs.current[index + 1].focus();
//             }
//         }
       
//     }

//     // FUNCTION TO HANDLE VERIFY EMAIL SUBMIT
//     const handleVerifyEmailSubmit = async(e)=>{
//         e.preventDefault();
// 		const verificationCode = token.join("");
//         // alert(`Token Submitted Successfully: ${verificationCode}`)
//         console.log(`Token Submitted Successfully: ${verificationCode}`);
// 		try {
// 			await verifyEmail(verificationCode);
// 			navigate("/");
// 			toast.success("Email verified successfully");
// 		} catch (error) {
// 			console.log(error);
//             toast.error(error.response.data.message || "Error Verifying  User or Expired Token");    
// 		} 
//     };

//     // Auto submit when all fields are filled
// 	useEffect(() => {
// 		if (token.every((digit) => digit !== "")) {
// 			handleVerifyEmailSubmit(new Event("submit"));
// 		}
// 	}, [token]);

//   return (
//     <>
//         <div className='max-w-md w-full bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
//         <motion.div
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ duration: 0.5 }}
// 			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
// 			overflow-hidden'
// 		>
//            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r text-white bg-clip-text pt-5'>
// 				Verify Your Email
// 			</h2>
// 			<p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

//             <form onSubmit={handleVerifyEmailSubmit} className="space-y-6">
//                 <div className="flex justify-between pr-5 pl-5">
//                 {token.map((digit, index) => (
// 							<input
// 								key={index}
// 								ref={(el) => (inputRefs.current[index] = el)}
// 								type='text'
// 								maxLength='6'
// 								value={digit}
// 								onChange={(e) => handleChange(index, e.target.value)}
// 								onKeyDown={(e) => handleKeyDown(index, e)}
// 								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg
//                                  focus:border-orange-500 focus:outline-none'
// 							/>
// 						))}

//                 </div>
                
//                 {/* ERROR MESSAGE */}
//                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//                 {/* SUBMIT HANDLE FOR VERIFY EMAIL */}

//                 <motion.button
// 						whileHover={{ scale: 1.05 }}
// 						whileTap={{ scale: 0.95 }}
// 						type='submit'
// 						disabled={isLoading || token.some((digit) => !digit)}
// 						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-blue-600
//                                 text-white font-bold rounded-lg shadow-lg hover:from-orange-600
// 						        hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
// 						        focus:ring-offset-gray-900 transition duration-200'
// 					>
// 						{isLoading ? "Verifying Email, Please Wait....." : "Verify Email"}
// 					</motion.button>

//             </form>
        
//         </motion.div>

//         </div>
//     </>
//   )
// }

// export default VerifyEmail

