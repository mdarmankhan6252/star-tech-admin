
const Login = ({ setUser, user }) => {
   return (
      <div className={`w-full flex flex-col items-center justify-center h-screen fixed bg-black/70 top-0 left-0 z-50 ${user ? 'hidden' : 'block'} `}>

         <form className="bg-white p-6 rounded-md w-md flex flex-col gap-y-5">
            <h2 className="font-semibold text-gray-900/80 text-center text-xl">ADMIN LOGIN</h2>
            <div className="flex flex-col gap-1">
               <label>Email</label>
               <input type="email" name="email" placeholder="Email" className="p-2.5 border border-gray-200 rounded-sm outline-0" />
            </div>
            <div className="flex flex-col gap-1">
               <label>Password</label>
               <input type="password" name="password" placeholder="********" className="p-2.5 border border-gray-200 rounded-sm outline-0" />
            </div>

            <button type="submit" className="bg-amber-500 text-white p-2.5 rounded-sm font-semibold cursor-pointer hover:bg-amber-600">
               <span>LOGIN</span>
            </button>
         </form>



      </div>
   );
};

export default Login;