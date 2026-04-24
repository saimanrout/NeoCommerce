import { useGetProductsQuery } from '../redux/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { Search } from 'lucide-react';

const Shop = () => {
  const [keyword, setKeyword] = useState('');
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber: 1 });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Shop All Products</h1>
        <form onSubmit={submitHandler} className="max-w-md relative">
          <input
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </form>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      
      {/* Pagination could go here */}
    </div>
  );
};

export default Shop;
