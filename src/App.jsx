import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import logo from './assets/logo.png'
import Statistics from './components/Statistics';
import { ToastContainer } from 'react-toastify';
import AddProduct from './components/AddProduct';
import ManageProduct from './components/ManageProduct';

const App = () => {
  const location = useLocation();

  const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: <MdOutlineDashboard /> },
    { name: "Add Product", path: "/add-product", icon: <IoIosAddCircleOutline /> },
    { name: "Manage Products", path: "/manage", icon: <CiCircleList /> },
  ];

  return (
    <>
      
      <ToastContainer />

      {/* Navbar */}

      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to='/' >
          <img className="h-9" src={logo} />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button className='border rounded-full text-sm px-4 py-1 cursor-pointer hover:bg-red-500/20 hover:border-red-600/40 hover:text-red-600'>Logout</button>
        </div>
      </div>

      <div className="flex pt-[61px]"> {/* Push everything below navbar */}
        
        {/* Sidebar */}
        <div className="fixed top-[61px] left-0 md:w-64 w-16 border-r h-[calc(100vh-61px)] bg-white text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item, index) => (
            <Link to={`${item.path}`} key={index}
              className={`flex items-center py-3 px-4 border-l-4 md:border-l-[6px] gap-3 
              ${location.pathname === item.path
                  ? " bg-amber-500/10 border-amber-500 text-amber-500"
                  : "hover:bg-gray-100/90 border-white text-gray-700"
                }`
              }
            >
              <span className='text-xl'>{item.icon}</span>
              <p className="md:block hidden text-center">{item.name}</p>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="ml-16 md:ml-64 p-6 w-full max-w-7xl"> 
          <Routes>
            <Route path='/' element={<Statistics />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/manage' element={<ManageProduct />} />            
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
