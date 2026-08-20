import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import api from "../api/axios";


function Login() {

  const navigate=useNavigate();


 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {

  e.preventDefault();
    try {


    const response = await api.post("/auth/login", {

      email,
      password

    });

    console.log(response.data);
    localStorage.setItem("token",response.data.token);


    console.log("Token Saved:", response.data.token);

     navigate("/dashboard");

  } catch (error) {

    console.log(error.response.data);

  }
  


};



  return (

    // ================= MAIN BACKGROUND =================

    <div className="min-h-screen w-full bg-[#F5F7FA] flex items-center justify-center px-4 py-10 sm:px-6">


      {/* LOGIN CARD SECTION */}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] px-6 py-8">


        {/* LOGO SECTION */}

        <div className="flex flex-col items-center">


          <img
            src={logo}
            alt="PrepTrack Logo"
            className="h-18 w-18 object-contain"
          />

              <h1>Track your DSA preparation and interview progress</h1>
          


        </div>



        {/* FORM SECTION */}

       <form 
  className="mt-8 space-y-5"
  onSubmit={handleSubmit}
>



          {/* EMAIL */}

          <div className="relative">

            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />


            <input

              type="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full rounded-xl border py-3 pl-11"

            />

          </div>



          {/* PASSWORD */}

          <div className="relative">

            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />


            <input

              type="password"

              placeholder="Enter your password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              className="w-full rounded-xl border py-3 pl-11"

            />


            <Eye
              className="absolute right-3 top-1/2 -translate-y-1/2"
              size={20}
            />


          </div>




    <button
  type="submit"
  onClick={() => console.log("Button Clicked")}
  className="w-full bg-blue-600 text-white py-3 rounded-xl cursor-pointer"
>
  Login
</button>


        </form>



      </div>


    </div>

  );


}



export default Login;