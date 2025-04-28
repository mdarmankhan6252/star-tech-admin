import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from 'react-toastify'
import axios from 'axios'
import { ImSpinner10 } from "react-icons/im";
import useAxiosPublic from "../hooks/useAxiosPublic";


const AddProduct = () => {
   const [inStock, setInStock] = useState(false);
   const [features, setFeatures] = useState([]);
   const [featureInput, setFeatureInput] = useState("");
   const axiosPublic = useAxiosPublic();
   const [loading, setLoading] = useState(false)

   const imageUpload = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_api_key}`

   const handleAddFeature = () => {
      if (featureInput.trim() !== "") {
         setFeatures([...features, featureInput.trim()]);
         setFeatureInput("");
      }
   };

   const handleProductPost = async (e) => {
      e.preventDefault();
      try {
         const form = e.target;
         setLoading(true)
         const title = form.title.value;
         const prevPrice = parseInt(form.prevPrice.value);
         const currentPrice = parseInt(form.currentPrice.value);
         const category = form.category.value;


         const currentPhoto = form.photoUrl.files[0];


         if (!currentPhoto) {
            return toast.error('Please upload a photo.')
         }

         const formData = new FormData();
         formData.append("image", currentPhoto);



         const res = await axios.post(imageUpload, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });

         const photoUrl = res.data.data.display_url


         const postedProduct = {
            title,
            photoUrl,
            prevPrice,
            currentPrice,
            category,
            inStock,
            features,
         }


         if (res.data.data.display_url) {
            const res = await axiosPublic.post('/product', postedProduct);
            if (res.status === 200) {
               toast.success(res.data.message || 'Product has been added successfully!')
               setFeatures([])
               setFeatureInput('')
               setInStock(false)
               form.reset()
               setLoading(false)
            }
         }

      } catch (error) {
         toast.error(error.message || 'Something went wrong!')
         setLoading(false)
      }

   }



   return (
      <div>
         <h2 className="font-semibold text-xl text-gray-900/80 pb-6">ADD PRODUCT</h2>
         <form onSubmit={handleProductPost} className="p-6 border border-gray-300 rounded-md max-w-3xl flex flex-col gap-6">
            <div className="border border-gray-200 rounded-sm relative flex items-center justify-center">
               <input type="file" name="photoUrl" id="" className="p-10 opacity-0 w-full z-10 cursor-pointer " />
               <span className=" text-5xl items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <AiOutlineCloudUpload />
               </span>
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-gray-950/80">Product's Title</label>
               <input type="text" name="title" className="border p-2.5 border-gray-200 outline-0 rounded-sm focus:ring focus:ring-amber-500/40" placeholder="Product title" />
            </div>

            <div className="grid-cols-2 grid gap-6">
               <div className="flex flex-col gap-1">
                  <label className="text-gray-950/80">Previous Price</label>
                  <input type="number" name="prevPrice" className="border p-2.5 border-gray-200 outline-0 rounded-sm focus:ring focus:ring-amber-500/40" placeholder="Product title" />
               </div>
               <div className="flex flex-col gap-1">
                  <label className="text-gray-950/80">Current Price</label>
                  <input type="number" name="currentPrice" className="border p-2.5 border-gray-200 outline-0 rounded-sm focus:ring focus:ring-amber-500/40" placeholder="Product title" />
               </div>
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-gray-950/80">Product's Category</label>
               <select required className="border p-2.5 border-gray-200 outline-0 rounded-sm focus:ring focus:ring-amber-500/40" name="category">
                  <option hidden>Select Category</option>
                  <option value="drone">Drone</option>
                  <option value="gimbal">Gimbal</option>
                  <option value="fan">Fan</option>
                  <option value="scale">Weight Scale</option>
                  <option value="tv">TV</option>
                  <option value="mobile">Mobile Phone</option>
                  <option value="accessories">Phone Accessories</option>
                  <option value="ssd">Portable SSD</option>
                  <option value="camera">Camera</option>
                  <option value="trimmer">Trimmer</option>
                  <option value="watch">Watch</option>
                  <option value="earphone">Earphone</option>
               </select>
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-gray-950/80">Stock Status</label>
               <div
                  className={`${inStock ? "!bg-amber-500" : "bg-[#f0f0f0]"
                     } w-[65px] h-[36px] p-[0.180rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-sm relative`}
                  onClick={() => setInStock(!inStock)}
               >
                  <div
                     className={`${inStock ? "translate-x-[28px] !bg-white" : "translate-x-[2px]"
                        } w-[28px] h-[28px] pb-1 transition-all duration-500 rounded-sm bg-[#fff]`}
                     style={{ boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)" }}
                  ></div>
               </div>
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-gray-950/80">Product Features</label>
               <div className="flex gap-2">
                  <input
                     type="text"
                     name="feature"
                     placeholder="Enter a feature"
                     className="border p-2.5 border-gray-200 outline-0 rounded-sm focus:ring focus:ring-amber-500/40 w-full"
                     value={featureInput}
                     onChange={(e) => setFeatureInput(e.target.value)}
                  />
                  <button
                     type="button"
                     onClick={handleAddFeature}
                     className="px-4 rounded-sm bg-amber-500 text-white"
                  >
                     Add
                  </button>
               </div>
               <ul className="list-disc list-inside mt-2 text-gray-700">
                  {features.map((feature, index) => (
                     <li key={index}>{feature}</li>
                  ))}
               </ul>
            </div>


            <div>
               <button className="bg-amber-500 py-2.5 px-8 rounded-full text-white font-semibold hover:bg-amber-600 cursor-pointer w-48">
                  {
                     loading ?
                        <span>
                           <ImSpinner10 className="text-2xl mx-auto animate-spin" />
                        </span>
                        :
                        <span>
                           ADD PRODUCT
                        </span>
                  }
               </button>
            </div>





         </form>
      </div>
   );
};

export default AddProduct;