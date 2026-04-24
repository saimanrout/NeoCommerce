import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../redux/productsApiSlice';
import { addToCart } from '../redux/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Star, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart');
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-slate-800"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="text-sm text-primary-500 font-bold tracking-wider uppercase mb-2">
              {product.brand}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 px-3 py-1 rounded-full text-sm font-bold">
                <Star className="w-4 h-4 fill-current" />
                {product.rating}
              </div>
              <span className="text-gray-500 text-sm">
                {product.numReviews} Reviews
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="text-4xl font-bold mb-8">${product.price.toFixed(2)}</div>

            {/* Action Area */}
            <div className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Status</span>
                <span className={`font-bold ${product.countInStock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Quantity</span>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
                className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-colors"
              >
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Truck className="w-5 h-5 text-primary-500" /> Free Shipping
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <ShieldCheck className="w-5 h-5 text-primary-500" /> 1 Year Warranty
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <RotateCcw className="w-5 h-5 text-primary-500" /> 30 Day Returns
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
