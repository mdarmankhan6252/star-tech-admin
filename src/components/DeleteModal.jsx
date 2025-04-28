import { RxCross1 } from "react-icons/rx";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from 'react-toastify'

const DeleteModal = ({ deleteModal, setDeleteModal, deleteId, refetch }) => {

   const axiosPublic = useAxiosPublic();

   const handleDelete = async () => {
      try {
         const res = await axiosPublic.delete(`/product/${deleteId}`);
         if (res.status === 200) {
            toast.success(res.data.message || 'Product deleted successfully!');
            refetch()
            setDeleteModal(false)
            
         }
      } catch (error) {
         toast.error(error.message || 'Delete Unsuccessful!')
      }
   }


   return (
      <div onClick={() => setDeleteModal(false)} className={`w-full h-screen fixed ${deleteModal ? 'flex' : 'hidden'}  items-center justify-center flex-col bg-black/60 left-0 top-0 z-50 `}>
         <div onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-sm space-y-2 text-center">
            <span className="text-3xl text-red-600 inline-flex items-center justify-center border p-1.5 rounded-full border-red-500/30">
               <RxCross1 />
            </span>
            <h3 className="text-xl font-semibold">Are you sure ?</h3>
            <p className="text-gray-700/90">You can never revert it.</p>
            <div className="*:py-2 *:px-6 *:text-sm *:font-semibold *:rounded-sm text-white flex gap-4 pt-4 *:cursor-pointer">
               <button onClick={() => setDeleteModal(false)} className="bg-gray-500 hover:bg-gray-600">Cancel</button>
               <button onClick={() => handleDelete()} className="bg-amber-500 hover:bg-amber-600">Delete</button>
            </div>
         </div>

      </div>
   );
};

export default DeleteModal;