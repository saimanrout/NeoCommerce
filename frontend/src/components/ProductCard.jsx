import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 dark:hover:shadow-primary-500/10"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider font-semibold">
          {product.brand}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-foreground dark:text-dark-foreground mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <Link 
            to={`/product/${product._id}`}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-medium transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
