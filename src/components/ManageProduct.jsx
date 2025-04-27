import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { MoonLoader } from "react-spinners";
import { toast } from 'react-toastify';

const ManageProduct = () => {
   const axiosPublic = useAxiosPublic();

   const { data: products, isLoading, isPending,refetch } = useQuery({
      queryKey: ['products'],
      queryFn: async () => {
         const res = await axiosPublic('/product');
         return res.data;
      }
   })

   if (isLoading || isPending) {
      return <div className='absolute left-0 top-0 w-full h-screen z-50 border flex items-center justify-center'>
         <MoonLoader color="#fa8001" />

      </div>
   }

   //delete handler

   const deleteProduct = async(id) =>{
      console.log(id);
      const res = await axiosPublic.delete(`/product/${id}`);
      if(res.status === 200){
         toast.success(res.data.message)
         refetch();
      }
   }




   return products && (
      <div>
         <h2 className="font-semibold text-xl text-gray-900/80 pb-6">MANAGE PRODUCTS</h2>

         <div className="flex flex-col justify-between">
            <div className="w-full">
               <div className="flex flex-col items-center max-w-3xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                  <table className="md:table-auto table-fixed w-full overflow-hidden">
                     <thead className="text-gray-900 text-sm text-left">
                        <tr>
                           <th className="px-4 py-3 font-semibold truncate">Product</th>
                           <th className="px-4 py-3 font-semibold truncate">Category</th>
                           <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                           <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                           <th className="px-4 py-3 font-semibold truncate">DELETE</th>
                        </tr>
                     </thead>
                     <tbody className="text-sm text-gray-500">
                        {products.map((product, index) => (
                           <tr key={index} className="border-t border-gray-500/20">
                              <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                 <div className="border border-gray-300 rounded p-2">
                                    <img src={product.photoUrl} alt="Product" className="w-16" />
                                 </div>
                                 <span className="truncate max-sm:hidden w-full">{product.name}</span>
                              </td>
                              <td className="px-4 py-3">{product.category}</td>
                              <td className="px-4 py-3 max-sm:hidden">{product.currentPrice}৳</td>
                              <td className="px-4 py-3">
                                 <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={product.inStock} />
                                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-amber-600 transition-colors duration-200"></div>
                                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                 </label>
                              </td>
                              <td>
                                 <button onClick={() => deleteProduct(product._id)} className='bg-amber-600 hover:bg-red-600 text-white p-1.5 px-3 rounded-sm cursor-pointer'>DELETE</button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ManageProduct;