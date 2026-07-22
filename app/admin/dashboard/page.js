'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingCart, IndianRupee, MessageSquare, Plus, Edit2, LogOut, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState('inventory');

  // Mock initial orders for dashboard
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900/50 border border-emerald-800 rounded-3xl p-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Eila Admin Control Center</h1>
          <p className="text-xs text-emerald-300">Live store performance & inventory management</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inventory' ? 'bg-emerald-500 text-emerald-950' : 'bg-emerald-950 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders' ? 'bg-emerald-500 text-emerald-950' : 'bg-emerald-950 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors ml-2"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Total Store Sales</span>
          <span className="text-3xl font-extrabold text-white">₹{totalRevenue.toFixed(2)}</span>
        </div>

        <div className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Orders Processed</span>
          <span className="text-3xl font-extrabold text-amber-400">{orders.length}</span>
        </div>

        <div className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Active Products</span>
          <span className="text-3xl font-extrabold text-emerald-300">
            {products.filter((p) => p.active).length} / {products.length}
          </span>
        </div>

        <div className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Low Stock Alerts</span>
          <span className="text-3xl font-extrabold text-teal-300">
            {products.filter((p) => p.stock < 100).length}
          </span>
        </div>

      </div>

      {/* Tab 1: Inventory Management Table */}
      {activeTab === 'inventory' && (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-3xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-white">Product Catalog & Inventory</h3>
            <button
              onClick={() => alert('New product creation modal ready for Supabase sync!')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-emerald-200">
              <thead className="bg-emerald-950 text-emerald-400 font-bold uppercase tracking-wider border-b border-emerald-800">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Price (₹)</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Visibility</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-800/60">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-900/40">
                    <td className="p-3 font-semibold text-white flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-emerald-950" />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-3 font-mono text-emerald-300">{p.sku}</td>
                    <td className="p-3 font-bold text-white">₹{p.price.toFixed(2)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateProductStock(p.id, parseInt(e.target.value, 10))}
                          className="w-20 bg-emerald-950 border border-emerald-700/60 rounded-lg px-2 py-1 text-white font-bold text-xs"
                        />
                        {p.stock < 100 && (
                          <span className="text-[10px] text-amber-400 font-bold">Low</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleProductActive(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {p.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => alert(`Editing settings for ${p.name}`)}
                        className="p-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-emerald-200"
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

      {/* Tab 2: Orders Management Table */}
      {activeTab === 'orders' && (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-3xl p-6 space-y-6">
          <h3 className="font-extrabold text-lg text-white">Customer Orders</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-emerald-200">
              <thead className="bg-emerald-950 text-emerald-400 font-bold uppercase tracking-wider border-b border-emerald-800">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-800/60">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-emerald-900/40">
                    <td className="p-3 font-mono font-bold text-amber-300">{o.order_number}</td>
                    <td className="p-3">
                      <span className="font-semibold text-white block">{o.customer_name}</span>
                      <span className="text-emerald-400 text-[11px]">{o.customer_email}</span>
                    </td>
                    <td className="p-3 font-bold text-white">₹{o.total_amount.toFixed(2)}</td>
                    <td className="p-3 text-emerald-300">{o.created_at}</td>
                    <td className="p-3">
                      <select
                        value={o.order_status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="bg-emerald-950 border border-emerald-700/60 rounded-lg px-2 py-1 text-xs text-white font-semibold focus:outline-none"
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
