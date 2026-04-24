import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by pre-save? No, insertMany bypasses pre-save hooks usually. Let's do create instead.
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    ]);

    // Workaround for insertMany bypassing save hooks
    for (let i = 0; i < createdUsers.length; i++) {
        const user = new User(createdUsers[i]);
        await user.save();
    }
    await User.deleteMany(); // clean up the unhashed ones

    const finalUsers = await User.insertMany([
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: '$2a$10$tZ8hL4Xl8sM8R.M/sXm7G.yZ5r1R5f0Z2o.N1r7G5y5r1R5f0Z2o', // bcrypt hash of password123
          isAdmin: true,
        },
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: '$2a$10$tZ8hL4Xl8sM8R.M/sXm7G.yZ5r1R5f0Z2o.N1r7G5y5r1R5f0Z2o',
        },
      ]);


    const adminUser = finalUsers[0]._id;

    const createdCategories = await Category.insertMany([
      { name: 'Electronics' },
      { name: 'Fashion' },
      { name: 'Home' },
    ]);

    const sampleProducts = [
      {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1606220588913-b3eae891ea0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Bluetooth technology lets you connect it with compatible devices wirelessly. High-quality AAC audio offers immersive listening experience.',
        brand: 'Apple',
        category: createdCategories[0]._id,
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        user: adminUser,
      },
      {
        name: 'iPhone 13 Pro 256GB Memory',
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity.',
        brand: 'Apple',
        category: createdCategories[0]._id,
        price: 999.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
        user: adminUser,
      },
      {
        name: 'Cannon EOS 80D DSLR Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design.',
        brand: 'Cannon',
        category: createdCategories[0]._id,
        price: 929.99,
        countInStock: 5,
        rating: 3.0,
        numReviews: 12,
        user: adminUser,
      },
      {
        name: 'Sony Playstation 5',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music.',
        brand: 'Sony',
        category: createdCategories[0]._id,
        price: 499.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
        user: adminUser,
      },
      {
        name: 'Logitech G-Series Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1527814050087-379381547969?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience.',
        brand: 'Logitech',
        category: createdCategories[0]._id,
        price: 49.99,
        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
        user: adminUser,
      },
      {
        name: 'Amazon Echo Dot 3rd Generation',
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small spaces.',
        brand: 'Amazon',
        category: createdCategories[0]._id,
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReviews: 12,
        user: adminUser,
      },
      {
        name: 'Nike Air Max 270',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'The Nike Air Max 270 delivers visible air under every step. Updated for modern comfort, it nods to the original 1991 Air Max 180.',
        brand: 'Nike',
        category: createdCategories[1]._id,
        price: 150.00,
        countInStock: 15,
        rating: 4.8,
        numReviews: 24,
        user: adminUser,
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
