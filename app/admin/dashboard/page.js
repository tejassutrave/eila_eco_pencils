'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Edit2 } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState('inventory');

  const [orders, setOrders] = useState([
    {
      id: 'ord-101',
      order_number: 'EILA-849201',
      customer_name: 'Priya Sharma',
      customer_email: 'priya@example.com',
      total_amount: 498.00,
      order_status: 'processing',
      created_at: '2026-07-22 10:15 AM'
    },
    {
      id: 'ord-102',
      order_number: 'EILA-849198',
      customer_name: 'Greenwood International School',
      customer_email: 'admin@greenwood.edu.in',
      total_amount: 2490.00,
      order_status: 'shipped',
      created_at: '2026-07-21 04:30 PM'
    }
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
    );
  };

  const updateProductStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  const toggleProductActive = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, active: !p.active } : p))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('eila_admin_session');
    router.push('/admin/login');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e8e6da] rounded-3xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f231c]">Eila Admin Control Center</h1>
          <p className="text-xs text-[#4a5e55]">Live store performance & inventory management</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'inventory' ? 'bg-[#1b4332] text-white' : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
            }`}
          >
            Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'orders' ? 'bg-[#1b4332] text-white' : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors ml-2"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#2d6a4f] font-bold uppercase tracking-wider block">Total Store Sales</span>
          <span className="text-3xl font-black text-[#0f231c]">₹{totalRevenue.toFixed(2)}</span>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#2d6a4f] font-bold uppercase tracking-wider block">Orders Processed</span>
          <span className="text-3xl font-black text-amber-600">{orders.length}</span>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#2d6a4f] font-bold uppercase tracking-wider block">Active Products</span>
          <span className="text-3xl font-black text-[#1b4332]">
            {products.filter((p) => p.active).length} / {products.length}
          </span>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-1 shadow-sm">
          <span className="text-[10px] text-[#2d6a4f] font-bold uppercase tracking-wider block">Low Stock Alerts</span>
          <span className="text-3xl font-black text-teal-700">
            {products.filter((p) => p.stock < 100).length}
          </span>
        </div>

      </div>

      {/* Tab 1: Inventory */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-[#0f231c]">Product Catalog & Inventory</h3>
            <button
              onClick={() => alert('New product creation modal ready for Supabase sync!')}
              className="px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2d4036]">
              <thead className="bg-[#faf9f5] text-[#1b4332] font-extrabold uppercase tracking-wider border-b border-[#e8e6da]">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Price (₹)</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Visibility</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0efe6]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#faf9f5]">
                    <td className="p-3 font-semibold text-[#0f231c] flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover bg-[#f4f3ed]" />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-3 font-mono text-[#2d6a4f] font-bold">{p.sku}</td>
                    <td className="p-3 font-black text-[#0f231c]">₹{p.price.toFixed(2)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateProductStock(p.id, parseInt(e.target.value, 10))}
                          className="w-20 bg-[#faf9f5] border border-[#e8e6da] rounded-lg px-2 py-1 text-[#0f231c] font-bold text-xs"
                        />
                        {p.stock < 100 && (
                          <span className="text-[10px] text-amber-600 font-bold">Low</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleProductActive(p.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                          p.active ? 'bg-[#e8f5e9] text-[#1b4332] border border-[#b7e4c7]' : 'bg-red-50 text-red-600 border border-red-200'
                        }`}
                      >
                        {p.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => alert(`Editing details for ${p.name}`)}
                        className="p-1.5 bg-[#f4f3ed] hover:bg-[#e8e6da] rounded-lg text-[#1b4332]"
                        title="Edit Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-6 shadow-sm">
          <h3 className="font-extrabold text-lg text-[#0f231c]">Customer Orders</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2d4036]">
              <thead className="bg-[#faf9f5] text-[#1b4332] font-extrabold uppercase tracking-wider border-b border-[#e8e6da]">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0efe6]">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#faf9f5]">
                    <td className="p-3 font-mono font-bold text-[#1b4332]">{o.order_number}</td>
                    <td className="p-3">
                      <span className="font-semibold text-[#0f231c] block">{o.customer_name}</span>
                      <span className="text-[#4a5e55] text-[11px]">{o.customer_email}</span>
                    </td>
                    <td className="p-3 font-black text-[#0f231c]">₹{o.total_amount.toFixed(2)}</td>
                    <td className="p-3 text-[#4a5e55]">{o.created_at}</td>
                    <td className="p-3">
                      <select
                        value={o.order_status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="bg-[#faf9f5] border border-[#e8e6da] rounded-lg px-2 py-1 text-xs text-[#0f231c] font-bold focus:outline-none"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
