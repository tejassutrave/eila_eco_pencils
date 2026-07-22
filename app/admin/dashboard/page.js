'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp, ShoppingBag, Package, Users, Building2, ShieldCheck, LogOut, Plus, Edit2, CheckCircle2, Clock, AlertTriangle, ArrowUpRight, DollarSign, RefreshCw, Filter } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'inventory' | 'orders' | 'inquiries' | 'profile'

  // Admin Profile Info
  const adminInfo = {
    adminCode: 'ADM-SUPER-01',
    fullName: 'Eila Executive Admin',
    email: 'admin@eilaecopencils.com',
    role: 'super_admin',
    department: 'Executive Operations',
    permissions: ['analytics', 'inventory', 'orders', 'inquiries', 'revenue_reports', 'admin_management']
  };

  // Mock Orders Data
  const [orders, setOrders] = useState([
    {
      id: 'ord-101',
      order_number: 'EILA-849201',
      customer_name: 'Priya Sharma',
      customer_email: 'priya@example.com',
      total_amount: 498.00,
      payment_status: 'paid',
      order_status: 'processing',
      created_at: '2026-07-22 10:15 AM'
    },
    {
      id: 'ord-102',
      order_number: 'EILA-849198',
      customer_name: 'Greenwood International School',
      customer_email: 'admin@greenwood.edu.in',
      total_amount: 2490.00,
      payment_status: 'paid',
      order_status: 'shipped',
      created_at: '2026-07-21 04:30 PM'
    },
    {
      id: 'ord-103',
      order_number: 'EILA-849185',
      customer_name: 'Aarav Patel',
      customer_email: 'aarav@techfirm.com',
      total_amount: 199.00,
      payment_status: 'paid',
      order_status: 'delivered',
      created_at: '2026-07-20 02:10 PM'
    }
  ]);

  // Mock Corporate Inquiries Pipeline Data
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-01',
      name: 'Vikram Mehta',
      email: 'vikram@acmetech.com',
      phone: '+91 98765 12345',
      company: 'Acme Tech Pvt. Ltd.',
      quantity_needed: 2500,
      message: 'Need 2,500 seed pencils with company logo screen printed for annual tech conference in August.',
      status: 'new',
      created_at: '2026-07-22'
    },
    {
      id: 'inq-02',
      name: 'Sunita Rao',
      email: 'sunita@blossomschool.edu.in',
      phone: '+91 99887 66554',
      company: 'Blossom High School',
      quantity_needed: 1000,
      message: 'Custom seed pencil packs for World Environment Day student distribution.',
      status: 'contacted',
      created_at: '2026-07-21'
    }
  ]);

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.payment_status === 'paid' ? o.total_amount : 0), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const conversionRate = 4.8; // %

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
    );
  };

  const updateInquiryStatus = (inquiryId, newStatus) => {
    setInquiries((prev) =>
      prev.map((iq) => (iq.id === inquiryId ? { ...iq, status: newStatus } : iq))
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

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e8e6da] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-[#74c69d] flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-[#0f231c]">Admin Portal</h1>
              <span className="bg-[#e8f5e9] text-[#1b4332] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#b7e4c7]">
                {adminInfo.adminCode} ({adminInfo.role.toUpperCase()})
              </span>
            </div>
            <p className="text-xs text-[#4a5e55]">{adminInfo.fullName} • {adminInfo.department}</p>
          </div>
        </div>

        {/* Dashboard View Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'analytics' ? 'bg-[#1b4332] text-white shadow-sm' : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'inventory' ? 'bg-[#1b4332] text-white shadow-sm' : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
            }`}
          >
            Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'orders' ? 'bg-[#1b4332] text-white shadow-sm' : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'inquiries' ? 'bg-[#1b4332] text-white shadow-sm' : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
            }`}
          >
            Bulk Leads ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'profile' ? 'bg-[#1b4332] text-white shadow-sm' : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
            }`}
          >
            Admin Profile
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors ml-2"
            title="Sign Out to Main Page"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 1. SALES & REVENUE ANALYTICS DASHBOARD VIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          
          {/* Executive KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-[#2d6a4f]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Sales Revenue</span>
                <TrendingUp className="w-4 h-4 text-[#52b788]" />
              </div>
              <span className="text-3xl font-black text-[#0f231c]">₹{totalRevenue.toFixed(2)}</span>
              <span className="text-[11px] text-[#52b788] font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last month
              </span>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-[#2d6a4f]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Average Order Value (AOV)</span>
                <BarChart3 className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-3xl font-black text-[#0f231c]">₹{avgOrderValue.toFixed(2)}</span>
              <span className="text-[11px] text-[#4a5e55]">Based on {orders.length} paid orders</span>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-[#2d6a4f]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Conversion Rate</span>
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-3xl font-black text-[#0f231c]">{conversionRate}%</span>
              <span className="text-[11px] text-[#52b788] font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +2.1% website traffic
              </span>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm">
              <div className="flex justify-between items-center text-[#2d6a4f]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Low Stock Warning</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-3xl font-black text-amber-600">
                {products.filter((p) => p.stock < 100).length} Items
              </span>
              <span className="text-[11px] text-[#4a5e55]">Requires restock soon</span>
            </div>

          </div>

          {/* Revenue Monthly Trend Chart (Visual Bar Chart) */}
          <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg text-[#0f231c]">Monthly Revenue Growth (2026)</h3>
                <p className="text-xs text-[#4a5e55]">Aggregated Razorpay sales performance</p>
              </div>
              <span className="text-xs font-bold text-[#1b4332] bg-[#e8f5e9] px-3 py-1 rounded-full border border-[#b7e4c7]">
                Live Data Feed
              </span>
            </div>

            {/* Simulated Chart Bars */}
            <div className="h-48 flex items-end justify-between gap-2 pt-6 border-b border-[#e8e6da] px-4">
              {[
                { month: 'Jan', revenue: 14000, height: '40%' },
                { month: 'Feb', revenue: 18500, height: '55%' },
                { month: 'Mar', revenue: 22000, height: '65%' },
                { month: 'Apr', revenue: 19000, height: '50%' },
                { month: 'May', revenue: 29000, height: '80%' },
                { month: 'Jun', revenue: 34000, height: '90%' },
                { month: 'Jul', revenue: 42000, height: '100%' }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-[#e8f5e9] group-hover:bg-[#52b788] rounded-t-xl transition-all relative overflow-hidden" style={{ height: bar.height }}>
                    <div className="absolute inset-0 bg-[#1b4332] opacity-80" />
                  </div>
                  <span className="text-[11px] font-bold text-[#4a5e55]">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. INVENTORY MANAGEMENT VIEW */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-[#0f231c]">Product Catalog & Stock Controls</h3>
            <button
              onClick={() => alert('New product modal ready!')}
              className="px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2d4036]">
              <thead className="bg-[#faf9f5] text-[#1b4332] font-extrabold uppercase tracking-wider border-b border-[#e8e6da]">
                <tr>
                  <th className="p-3">Product</th>
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
                        onClick={() => alert(`Editing ${p.name}`)}
                        className="p-1.5 bg-[#f4f3ed] hover:bg-[#e8e6da] rounded-lg text-[#1b4332]"
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

      {/* 3. CUSTOMER ORDERS VIEW */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-6 shadow-sm">
          <h3 className="font-extrabold text-lg text-[#0f231c]">Customer Orders & Fulfillment</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2d4036]">
              <thead className="bg-[#faf9f5] text-[#1b4332] font-extrabold uppercase tracking-wider border-b border-[#e8e6da]">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0efe6]">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#faf9f5]">
                    <td className="p-3 font-mono font-bold text-[#1b4332]">{o.order_number}</td>
                    <td className="p-3">
                      <span className="font-bold text-[#0f231c] block">{o.customer_name}</span>
                      <span className="text-[#4a5e55] text-[11px]">{o.customer_email}</span>
                    </td>
                    <td className="p-3 font-black text-[#0f231c]">₹{o.total_amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f5e9] text-[#1b4332]">
                        PAID (Razorpay)
                      </span>
                    </td>
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

      {/* 4. BULK INQUIRIES VIEW */}
      {activeTab === 'inquiries' && (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-6 shadow-sm">
          <h3 className="font-extrabold text-lg text-[#0f231c]">Corporate & School Bulk Leads Pipeline</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2d4036]">
              <thead className="bg-[#faf9f5] text-[#1b4332] font-extrabold uppercase tracking-wider border-b border-[#e8e6da]">
                <tr>
                  <th className="p-3">Contact Person</th>
                  <th className="p-3">Company / Institution</th>
                  <th className="p-3">Qty Needed</th>
                  <th className="p-3">Requirements Note</th>
                  <th className="p-3">Lead Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0efe6]">
                {inquiries.map((iq) => (
                  <tr key={iq.id} className="hover:bg-[#faf9f5]">
                    <td className="p-3">
                      <span className="font-bold text-[#0f231c] block">{iq.name}</span>
                      <span className="text-[#4a5e55] text-[11px]">{iq.email} • {iq.phone}</span>
                    </td>
                    <td className="p-3 font-bold text-[#1b4332]">{iq.company}</td>
                    <td className="p-3 font-black text-[#0f231c]">{iq.quantity_needed.toLocaleString()} Pencils</td>
                    <td className="p-3 max-w-xs truncate text-[#4a5e55]">{iq.message}</td>
                    <td className="p-3">
                      <select
                        value={iq.status}
                        onChange={(e) => updateInquiryStatus(iq.id, e.target.value)}
                        className="bg-[#faf9f5] border border-[#e8e6da] rounded-lg px-2 py-1 text-xs text-[#0f231c] font-bold focus:outline-none"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed Deal</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. ADMIN PROFILE & SECURITY CREDENTIALS VIEW */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 space-y-6 shadow-sm max-w-2xl">
          <h3 className="font-extrabold text-xl text-[#0f231c] border-b border-[#e8e6da] pb-3">Admin Security Profile</h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-[#faf9f5] p-4 rounded-2xl border border-[#e8e6da]">
              <div>
                <span className="text-[#4a5e55] block">Admin Code</span>
                <span className="font-mono font-black text-base text-[#1b4332]">{adminInfo.adminCode}</span>
              </div>
              <div>
                <span className="text-[#4a5e55] block">Role Privilege</span>
                <span className="font-bold text-amber-700 uppercase bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  {adminInfo.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#4a5e55] block font-bold">Full Name</span>
                <span className="font-semibold text-[#0f231c]">{adminInfo.fullName}</span>
              </div>
              <div>
                <span className="text-[#4a5e55] block font-bold">Department</span>
                <span className="font-semibold text-[#0f231c]">{adminInfo.department}</span>
              </div>
            </div>

            <div>
              <span className="text-[#4a5e55] block font-bold mb-2">Granted Admin Permissions</span>
              <div className="flex flex-wrap gap-2">
                {adminInfo.permissions.map((perm, idx) => (
                  <span key={idx} className="bg-[#e8f5e9] text-[#1b4332] font-bold px-3 py-1 rounded-full border border-[#b7e4c7]">
                    ✓ {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
