import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../redux/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductManagement = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({ keyword: '', pageNumber: 1 });
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Product created. Please edit details.');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-bold transition-colors"
        >
          <Plus className="w-5 h-5" /> Create Product
        </button>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/50">
                <th className="py-4 px-6 font-semibold">ID</th>
                <th className="py-4 px-6 font-semibold">NAME</th>
                <th className="py-4 px-6 font-semibold">PRICE</th>
                <th className="py-4 px-6 font-semibold">CATEGORY</th>
                <th className="py-4 px-6 font-semibold">BRAND</th>
                <th className="py-4 px-6 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id} className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 px-6 text-sm">{product._id}</td>
                  <td className="py-4 px-6 text-sm font-medium line-clamp-1">{product.name}</td>
                  <td className="py-4 px-6 text-sm">${product.price}</td>
                  <td className="py-4 px-6 text-sm">{product.category?.name || product.category}</td>
                  <td className="py-4 px-6 text-sm">{product.brand}</td>
                  <td className="py-4 px-6 text-sm text-right">
                    <button className="text-primary-500 hover:text-primary-600 p-2">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-600 p-2 ml-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
