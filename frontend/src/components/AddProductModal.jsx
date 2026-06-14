import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const AddProductModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: '',
    quantity: '',
    mrp: '',
    price: '',
    brand: '',
    images: [], // array of image URLs
    exchange: 'yes'
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: '',
        name: '',
        type: '',
        quantity: '',
        mrp: '',
        price: '',
        brand: '',
        images: [],
        exchange: 'yes'
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    if (formData.images.length + files.length > 3) {
      alert('You can only upload a maximum of 3 images.');
      return;
    }

    const base64Promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    });

    try {
      const base64Images = await Promise.all(base64Promises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images].slice(0, 3)
      }));
    } catch (error) {
      console.error("Error converting images to base64", error);
      alert("Error processing images");
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave({
      ...formData,
      id: formData.id || Date.now().toString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6c7b91]/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-[500px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? 'Edit Product' : 'Add Product'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="CakeZone Walnut Brownie" 
              className="w-full border border-[#0D1B7E]/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D1B7E] focus:border-[#0D1B7E] text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Type</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D1B7E] focus:border-[#0D1B7E] text-gray-700 appearance-none bg-white"
            >
              <option value="">Select product type</option>
              <option value="Foods">Foods</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothes</option>
              <option value="Beauty Products">Beauty Products</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity Stock</label>
            <input 
              type="text" 
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Total numbers of Stock available" 
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D1B7E] focus:border-[#0D1B7E] placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">MRP</label>
            <input 
              type="text" 
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              placeholder="MRP value" 
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D1B7E] focus:border-[#0D1B7E] placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Selling Price</label>
            <input 
              type="text" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Selling price" 
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D1B7E] focus:border-[#0D1B7E] placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand Name</label>
            <input 
              type="text" 
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand name" 
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D1B7E] focus:border-[#0D1B7E] placeholder-gray-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-gray-700">Upload Product Images</label>
              <span className="text-xs text-gray-400">{formData.images.length}/3 Images</span>
            </div>
            
            {/* Upload Area */}
            {formData.images.length < 3 && (
              <div 
                className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-3"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="text-gray-400 text-sm mb-1">Enter Description</span>
                <span className="text-gray-800 text-sm font-medium">Browse</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            )}

            {/* Scrollable Preview Area */}
            {formData.images.length > 0 && (
              <div className="flex overflow-x-auto gap-3 pb-2 snap-x">
                {formData.images.map((imgUrl, idx) => (
                  <div key={idx} className="relative shrink-0 snap-start w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                    <img src={imgUrl} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Exchange or return eligibility</label>
            <select 
              name="exchange"
              value={formData.exchange}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D1B7E] focus:border-[#0D1B7E] text-gray-700 appearance-none bg-white"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <Button onClick={handleSave} className="w-auto px-8 py-2 text-sm rounded-md bg-[#0D1B7E] hover:bg-[#0A1560]" disabled={!formData.name}>
            {initialData ? 'Save' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
