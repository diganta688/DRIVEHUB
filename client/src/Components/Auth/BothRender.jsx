// import React, { useState } from "react";
// import { ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
// import Login from "./Login";
// import Signup from "./Signup";
// import { useNavigate } from "react-router-dom";

// function BothRender({ setChange }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setChange((s) => !s);
//     setIsLogin((prev) => !prev);
//     navigate(isLogin ? "/sign-up" : "/log-in");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden bg-white">
//         {/* Left side - Image */}
//         <div
//           className="hidden md:block w-1/2 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')",
//           }}
//         >
//           <div className="h-full w-full bg-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center items-center text-white p-8">
//             <h2 className="text-3xl font-bold mb-6">
//               {isLogin ? "Welcome Back!" : "Join Our Community"}
//             </h2>
//             <p className="text-center mb-8">
//               {isLogin
//                 ? "Log in to access your personalized dashboard and continue your journey with us."
//                 : "Create an account to unlock all features and start your amazing experience today."}
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
//               >
//                 <Github size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
//               >
//                 <Twitter size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
//               >
//                 <Linkedin size={20} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-12">
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               {isLogin ? "Sign In" : "Create Account"}
//             </h1>
//             <p className="text-gray-600">
//               {isLogin
//                 ? "Sign in to continue to your account"
//                 : "Fill in your details to get started"}
//             </p>
//           </div>

//           <div className="transition-all duration-500 transform">
//             {isLogin ? <Login /> : <Signup />}
//           </div>

//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <button
//                 onClick={toggleForm}
//                 className="ml-2 text-indigo-600 font-medium hover:text-indigo-500 inline-flex items-center group"
//               >
//                 {isLogin ? "Sign up" : "Sign in"}
//                 <ArrowRight
//                   size={16}
//                   className="ml-1 group-hover:translate-x-1 transition-transform"
//                 />
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BothRender;
