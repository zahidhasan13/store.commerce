"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  Clock,
  CheckCircle2,
  Edit3,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

// Demo Orders Data
const mockOrders = [
  {
    id: "ORD-98234",
    date: "Oct 01, 2026",
    status: "Delivered",
    total: 124.5,
    itemsCount: 3,
  },
  {
    id: "ORD-97112",
    date: "Sep 24, 2026",
    status: "Processing",
    total: 49.0,
    itemsCount: 1,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "addresses" | "settings"
  >("profile");

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const handleLogout = () => {
    // Tell ProtectedRoute this is a manual logout
    sessionStorage.setItem("manualLogout", "true");

    // Remove old redirect
    localStorage.removeItem("redirectAfterLogin");

    // Logout
    dispatch(logout());

    // Remove user
    localStorage.removeItem("user");

    router.push("/login");
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Account
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Manage your personal information, order status, and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-500/20 shadow-inner">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={fullName || user.username}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <User size={36} className="text-slate-400" />
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  {fullName || user?.username}
                </h2>

                <p className="text-xs text-slate-500 mb-4">{user?.email}</p>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                  <ShieldCheck size={14} />
                  Verified Member
                </span>
              </div>

              {/* Navigation */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-2 shadow-sm space-y-1">
                {/* Personal Info */}
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === "profile"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User size={18} />
                    Personal Info
                  </div>

                  <ChevronRight size={16} className="opacity-50" />
                </button>

                {/* Orders */}
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === "orders"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={18} />
                    My Orders
                  </div>

                  <ChevronRight size={16} className="opacity-50" />
                </button>

                {/* Addresses */}
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === "addresses"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    Shipping Addresses
                  </div>

                  <ChevronRight size={16} className="opacity-50" />
                </button>

                {/* Settings */}
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === "settings"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings size={18} />
                    Settings
                  </div>

                  <ChevronRight size={16} className="opacity-50" />
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all mt-4"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Personal Info */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        Personal Information
                      </h3>

                      <p className="text-xs text-slate-500 mt-0.5">
                        Your account details and information.
                      </p>
                    </div>

                    <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition">
                      <Edit3 size={14} />
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Full Name
                      </span>

                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <User size={16} className="text-amber-500" />
                        {fullName || user?.username}
                      </p>
                    </div>

                    {/* Username */}
                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Username
                      </span>

                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <User size={16} className="text-amber-500" />
                        {user?.username}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Email Address
                      </span>

                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Mail size={16} className="text-amber-500" />
                        {user?.email}
                      </p>
                    </div>

                    {/* Account Type */}
                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Account Type
                      </span>

                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-amber-500" />
                        Customer
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders */}
              {activeTab === "orders" && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="pb-6 border-b border-slate-100">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Order History
                    </h3>

                    <p className="text-xs text-slate-500 mt-0.5">
                      View and track your previous purchases.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/50 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-extrabold text-slate-900">
                              {order.id}
                            </span>

                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                order.status === "Delivered"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {order.status === "Delivered" ? (
                                <CheckCircle2 size={12} />
                              ) : (
                                <Clock size={12} />
                              )}

                              {order.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500">
                            Placed on {order.date} • {order.itemsCount} Items
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span className="text-base font-black text-slate-900">
                            ${order.total.toFixed(2)}
                          </span>

                          <Link
                            href={`/orders/${order.id}`}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses */}
              {activeTab === "addresses" && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        Saved Addresses
                      </h3>

                      <p className="text-xs text-slate-500 mt-0.5">
                        Manage your delivery locations.
                      </p>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition">
                      + Add New
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border-2 border-amber-500/50 bg-amber-50/20 relative space-y-2">
                      <span className="absolute top-4 right-4 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                        Default
                      </span>

                      <h4 className="text-sm font-extrabold text-slate-900">
                        Home Address
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        House 42, Road 11, Block D
                        <br />
                        Banani, Dhaka - 1213
                        <br />
                        Bangladesh
                      </p>

                      <div className="pt-2 flex gap-3 text-xs font-bold">
                        <button className="text-amber-600 hover:underline">
                          Edit
                        </button>

                        <button className="text-rose-600 hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="pb-6 border-b border-slate-100">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Account Settings
                    </h3>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Security and preference settings.
                    </p>
                  </div>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                        Current Password
                      </label>

                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                        New Password
                      </label>

                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-amber-500 hover:text-slate-950 transition">
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
