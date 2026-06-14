import React, { useState, useEffect } from 'react';
import { Infinity, Search, Home, Plus, ShoppingBag as ShoppingBagIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddProductModal from '../components/AddProductModal';
import ProductCard from '../components/ProductCard';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Button from '../components/Button';
import Toast from '../components/Toast';
import { productService } from '../services/productService';
import { authService } from '../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSidebarTab, setActiveSidebarTab] = useState('products'); // 'home' | 'products'
  const [homeSubTab, setHomeSubTab] = useState('published'); // 'published' | 'unpublished'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      // data corresponds to the array of products from backend
      // map _id to id for frontend compatibility if needed
      const mappedData = data.map(p => ({ ...p, id: p._id }));
      setProducts(mappedData);
    } catch (error) {
      setToastMessage(error.message);
    }
  };

  const handleSaveProduct = async (productData) => {
    const completeProductData = {
      ...productData,
      published: productData.published !== undefined ? productData.published : false
    };

    try {
      if (productToEdit) {
        const updated = await productService.updateProduct(productToEdit.id || productToEdit._id, completeProductData);
        setProducts(prev => prev.map(p => p.id === (updated._id || updated.id) ? { ...updated, id: updated._id } : p));
        setToastMessage('Product updated Successfully');
      } else {
        // remove any dummy ID
        const { id, _id, ...dataToCreate } = completeProductData;
        const created = await productService.createProduct(dataToCreate);
        setProducts(prev => [...prev, { ...created, id: created._id }]);
        setToastMessage('Product added Successfully');
      }
      setProductToEdit(null);
    } catch (error) {
      setToastMessage(error.message);
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await productService.deleteProduct(productToDelete.id || productToDelete._id);
        setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
        setToastMessage('Product deleted');
        setProductToDelete(null);
      } catch (error) {
        setToastMessage(error.message);
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const updated = await productService.togglePublish(id);
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...updated, id: updated._id } : p
      ));
      setToastMessage('Product status updated');
    } catch (error) {
      setToastMessage(error.message);
    }
  };

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    authService.logout();
    // Navigate back to login screen
    navigate('/');
  };

  // 1. Filter by search term first
  const searchedProducts = products.filter(p => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.brand && p.brand.toLowerCase().includes(term))
    );
  });

  // 2. Filter for Home View (Publish status)
  const homeFilteredProducts = searchedProducts.filter(p => 
    homeSubTab === 'published' ? p.published : !p.published
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Sidebar */}
      <div className="w-[240px] bg-[#1a1c23] text-white flex flex-col shrink-0 relative z-10">
        <div className="h-16 flex items-center px-6">
          <span className="font-bold text-xl tracking-tight">Productr</span>
          <Infinity className="w-5 h-5 ml-1 text-[#f97316]" strokeWidth={3} />
        </div>
        
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#272934] text-sm text-gray-200 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder-gray-500"
            />
          </div>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          <button 
            onClick={() => setActiveSidebarTab('home')}
            className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
              activeSidebarTab === 'home' ? 'text-white bg-[#272934]' : 'text-gray-400 hover:text-white hover:bg-[#272934]'
            }`}
          >
            <Home className="w-4 h-4 mr-3" />
            Home
          </button>
          <button 
            onClick={() => setActiveSidebarTab('products')}
            className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
              activeSidebarTab === 'products' ? 'text-white bg-[#272934]' : 'text-gray-400 hover:text-white hover:bg-[#272934]'
            }`}
          >
            <ShoppingBagIcon className="w-4 h-4 mr-3" />
            Products
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-gradient-to-r from-red-50/50 via-yellow-50/50 to-blue-50/50 border-b border-gray-100 bg-white">
          
          <div className="flex items-center text-gray-600 font-medium">
            {activeSidebarTab === 'products' ? (
              <>
                <ShoppingBagIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">Products</span>
              </>
            ) : (
              <span className="text-sm">Home</span>
            )}
          </div>

          <div className="flex-1 max-w-xl mx-8 relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search Services, Products" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#e8ecf4]/50 border-none text-sm text-gray-600 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
              />
          </div>

          <div className="relative">
            <div 
              className="flex items-center cursor-pointer select-none"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
               <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                 <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
               </div>
               <svg className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
               </svg>
            </div>
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50 animate-fade-in">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        {activeSidebarTab === 'home' ? (
          /* HOME VIEW */
          <div className="flex-1 flex flex-col overflow-hidden" onClick={() => setIsProfileOpen(false)}>
            {/* Tabs */}
            <div className="px-8 border-b border-gray-200 bg-white">
              <nav className="flex space-x-8">
                <button 
                  onClick={() => setHomeSubTab('published')}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    homeSubTab === 'published' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Published
                </button>
                <button 
                  onClick={() => setHomeSubTab('unpublished')}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    homeSubTab === 'unpublished' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Unpublished
                </button>
              </nav>
            </div>
            
            <main className="flex-1 overflow-y-auto p-8">
              {homeFilteredProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center animate-fade-in text-center">
                  <div className="inline-flex items-center justify-center text-[#0D1B7E] mb-6">
                    <div className="grid grid-cols-2 gap-1.5 p-2">
                      <div className="w-8 h-8 border-[2.5px] border-[#0D1B7E] rounded-md"></div>
                      <div className="w-8 h-8 border-[2.5px] border-[#0D1B7E] rounded-md"></div>
                      <div className="w-8 h-8 border-[2.5px] border-[#0D1B7E] rounded-md"></div>
                      <div className="w-8 h-8 flex items-center justify-center text-[#0D1B7E]">
                        <Plus className="w-8 h-8" strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No {homeSubTab === 'published' ? 'Published' : 'Unpublished'} Products</h3>
                  <p className="text-xs text-gray-400 mb-8 px-4 leading-relaxed">
                    {searchTerm ? 'No products match your search query.' : `Your ${homeSubTab === 'published' ? 'Published' : 'Unpublished'} Products will appear here`}<br/>
                    {!searchTerm && 'Create your first product to publish'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                  {homeFilteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onEdit={handleEdit} 
                      onDeleteClick={handleDeleteClick} 
                      onTogglePublish={handleTogglePublish}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        ) : (
          /* PRODUCTS VIEW */
          <main className="flex-1 overflow-y-auto p-8" onClick={() => setIsProfileOpen(false)}>
            {searchedProducts.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-sm flex flex-col items-center">
                  <div className="inline-flex items-center justify-center text-[#0D1B7E] mb-6">
                    <div className="grid grid-cols-2 gap-1.5 p-2">
                      <div className="w-8 h-8 border-[2.5px] border-[#0D1B7E] rounded-md"></div>
                      <div className="w-8 h-8 border-[2.5px] border-[#0D1B7E] rounded-md"></div>
                      <div className="w-8 h-8 border-[2.5px] border-[#0D1B7E] rounded-md"></div>
                      <div className="w-8 h-8 flex items-center justify-center text-[#0D1B7E]">
                        <Plus className="w-8 h-8" strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Feels a little empty over here...</h3>
                  <p className="text-xs text-gray-400 mb-8 px-4 leading-relaxed">
                    {searchTerm ? 'No products match your search query.' : 'You can create products without connecting store'}<br/>
                    {!searchTerm && 'you can add products to store anytime'}
                  </p>

                  {!searchTerm && (
                    <Button 
                      className="w-auto px-8 py-2.5 text-sm rounded-lg bg-[#0D1B7E] hover:bg-[#0A1560]"
                      onClick={handleOpenAddModal}
                    >
                      Add your Products
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#4a5568]">Products</h2>
                  <button 
                    onClick={handleOpenAddModal}
                    className="text-[#4a5568] font-medium text-sm flex items-center hover:text-[#0D1B7E] transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Products
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onEdit={handleEdit} 
                      onDeleteClick={handleDeleteClick}
                      onTogglePublish={handleTogglePublish}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProduct}
        initialData={productToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={!!productToDelete} 
        onClose={() => setProductToDelete(null)} 
        onConfirm={confirmDelete}
        productName={productToDelete?.name}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default Dashboard;
