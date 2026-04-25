import { useState } from 'react';
import { useGetProductsQuery } from '../redux/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Search } from 'lucide-react';

const Shop = () => {
  const [keyword, setKeyword] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setPageNumber(1); // reset pagination on search
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Shop All Products
        </h1>

        {/* SEARCH */}
        <form onSubmit={submitHandler} className="max-w-md relative">
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </form>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* LOAD MORE BUTTON */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={data?.products?.length < 8}
              className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
            >
              Load More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;