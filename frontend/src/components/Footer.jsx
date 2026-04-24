const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p>&copy; {currentYear} NeoCommerce. All rights reserved.</p>
        <p className="mt-2 text-xs">Premium E-Commerce Experience</p>
      </div>
    </footer>
  );
};
export default Footer;
