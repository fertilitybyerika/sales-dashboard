'use client';

import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus,
  X,
  CreditCard,
  BarChart3,
  Target,
  Calendar,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Bell,
  AlertTriangle,
  CalendarDays,
  Filter,
  Edit2,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function SalesDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClientForPayment, setSelectedClientForPayment] = useState(null);
  const [selectedClientForEdit, setSelectedClientForEdit] = useState(null);
  const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState(null);
  const [selectedSalesForEdit, setSelectedSalesForEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [expandedClient, setExpandedClient] = useState(null);
  const [reminderFilter, setReminderFilter] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [openActionMenuType, setOpenActionMenuType] = useState(null);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [clients, setClients] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1 555-0101', productName: 'Premium Course', paymentPlan: '3-Pay', revenueSold: 8991, cashCollected: 5994, startDate: '2026-01-15', nextPaymentDate: '2026-02-15', paymentsMade: 2, status: 'Active', notes: 'Referred by Sarah' },
    { id: 2, firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', phone: '+1 555-0102', productName: 'VIP Coaching', paymentPlan: 'Full Pay', revenueSold: 14997, cashCollected: 14997, startDate: '2026-01-18', nextPaymentDate: null, paymentsMade: 1, status: 'Active', notes: '' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', phone: '+1 555-0103', productName: 'Premium Course', paymentPlan: '2-Pay', revenueSold: 5994, cashCollected: 2997, startDate: '2026-01-20', nextPaymentDate: '2026-02-20', paymentsMade: 1, status: 'Active', notes: 'Next payment Feb 20' },
    { id: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily@example.com', phone: '+1 555-0104', productName: 'Elite Program', paymentPlan: '6-Pay', revenueSold: 17982, cashCollected: 5994, startDate: '2026-01-22', nextPaymentDate: '2026-02-22', paymentsMade: 2, status: 'Active', notes: 'VIP client' },
    { id: 5, firstName: 'David', lastName: 'Wilson', email: 'david@example.com', phone: '+1 555-0105', productName: 'Premium Course', paymentPlan: 'Full Pay', revenueSold: 2997, cashCollected: 2997, startDate: '2026-01-25', nextPaymentDate: null, paymentsMade: 1, status: 'Active', notes: '' },
    { id: 6, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa@example.com', phone: '+1 555-0106', productName: 'VIP Coaching', paymentPlan: '4-Pay', revenueSold: 11988, cashCollected: 2997, startDate: '2026-01-28', nextPaymentDate: '2026-02-28', paymentsMade: 1, status: 'Active', notes: 'Corporate referral' },
    { id: 7, firstName: 'Tom', lastName: 'Martinez', email: 'tom@example.com', phone: '+1 555-0107', productName: 'Elite Program', paymentPlan: '3-Pay', revenueSold: 8991, cashCollected: 2997, startDate: '2026-01-10', nextPaymentDate: '2026-02-10', paymentsMade: 1, status: 'Active', notes: 'Payment overdue' },
    { id: 8, firstName: 'Anna', lastName: 'Garcia', email: 'anna@example.com', phone: '+1 555-0108', productName: 'Premium Course', paymentPlan: '2-Pay', revenueSold: 5994, cashCollected: 2997, startDate: '2026-01-05', nextPaymentDate: '2026-02-05', paymentsMade: 1, status: 'Active', notes: '' },
  ]);
  
  const [payments, setPayments] = useState([
    { id: 1, clientId: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', productName: 'Premium Course', amount: 2997, paymentSource: 'Stripe', date: '2026-01-15', status: 'Completed', paymentNumber: 1 },
    { id: 2, clientId: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', productName: 'Premium Course', amount: 2997, paymentSource: 'Stripe', date: '2026-01-28', status: 'Completed', paymentNumber: 2 },
    { id: 3, clientId: 2, firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', productName: 'VIP Coaching', amount: 14997, paymentSource: 'Bank Transfer', date: '2026-01-18', status: 'Completed', paymentNumber: 1 },
    { id: 4, clientId: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', productName: 'Premium Course', amount: 2997, paymentSource: 'Stripe', date: '2026-01-20', status: 'Completed', paymentNumber: 1 },
    { id: 5, clientId: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily@example.com', productName: 'Elite Program', amount: 2997, paymentSource: 'PayPal', date: '2026-01-22', status: 'Completed', paymentNumber: 1 },
    { id: 6, clientId: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily@example.com', productName: 'Elite Program', amount: 2997, paymentSource: 'PayPal', date: '2026-01-29', status: 'Completed', paymentNumber: 2 },
    { id: 7, clientId: 5, firstName: 'David', lastName: 'Wilson', email: 'david@example.com', productName: 'Premium Course', amount: 2997, paymentSource: 'Stripe', date: '2026-01-25', status: 'Completed', paymentNumber: 1 },
    { id: 8, clientId: 6, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa@example.com', productName: 'VIP Coaching', amount: 2997, paymentSource: 'Stripe', date: '2026-01-28', status: 'Completed', paymentNumber: 1 },
    { id: 9, clientId: 7, firstName: 'Tom', lastName: 'Martinez', email: 'tom@example.com', productName: 'Elite Program', amount: 2997, paymentSource: 'Stripe', date: '2026-01-10', status: 'Completed', paymentNumber: 1 },
    { id: 10, clientId: 8, firstName: 'Anna', lastName: 'Garcia', email: 'anna@example.com', productName: 'Premium Course', amount: 2997, paymentSource: 'Stripe', date: '2026-01-05', status: 'Completed', paymentNumber: 1 },
  ]);
  
  const [salesData, setSalesData] = useState([
    { id: 1, date: '2026-01-25', scScheduled: 12, scRescheduled: 2, scCompleted: 8, offerMade: 7, salesClients: 2, revenue: 5994, cashCollected: 3996 },
    { id: 2, date: '2026-01-26', scScheduled: 15, scRescheduled: 1, scCompleted: 11, offerMade: 9, salesClients: 3, revenue: 8991, cashCollected: 5994 },
    { id: 3, date: '2026-01-27', scScheduled: 10, scRescheduled: 3, scCompleted: 6, offerMade: 5, salesClients: 2, revenue: 9994, cashCollected: 4997 },
    { id: 4, date: '2026-01-28', scScheduled: 18, scRescheduled: 2, scCompleted: 14, offerMade: 12, salesClients: 4, revenue: 15988, cashCollected: 10991 },
    { id: 5, date: '2026-01-29', scScheduled: 14, scRescheduled: 1, scCompleted: 10, offerMade: 8, salesClients: 3, revenue: 12985, cashCollected: 7991 },
    { id: 6, date: '2026-01-30', scScheduled: 16, scRescheduled: 2, scCompleted: 12, offerMade: 10, salesClients: 4, revenue: 17985, cashCollected: 11988 },
    { id: 7, date: '2026-01-31', scScheduled: 20, scRescheduled: 3, scCompleted: 15, offerMade: 13, salesClients: 5, revenue: 22982, cashCollected: 14985 },
  ]);

  const getPaymentPlanDetails = (plan) => {
    const plans = {
      'Full Pay': { installments: 1 },
      '2-Pay': { installments: 2 },
      '3-Pay': { installments: 3 },
      '4-Pay': { installments: 4 },
      '6-Pay': { installments: 6 },
      '12-Pay': { installments: 12 },
      'Custom': { installments: 12 }
    };
    return plans[plan] || { installments: 1 };
  };

  const calculateNextPaymentDate = (startDate, paymentsMade) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + paymentsMade);
    return start.toISOString().split('T')[0];
  };

  const getPaymentStatus = (nextPaymentDate) => {
    if (!nextPaymentDate) return null;
    const paymentDate = new Date(nextPaymentDate);
    paymentDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'overdue', days: Math.abs(diffDays), color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle, label: `${Math.abs(diffDays)} days overdue` };
    if (diffDays === 0) return { status: 'due-today', days: 0, color: 'bg-orange-100 text-orange-800 border-orange-200', icon: AlertCircle, label: 'Due today' };
    if (diffDays <= 3) return { status: 'due-soon', days: diffDays, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}` };
    if (diffDays <= 7) return { status: 'upcoming', days: diffDays, color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Calendar, label: `Due in ${diffDays} days` };
    return { status: 'scheduled', days: diffDays, color: 'bg-gray-100 text-gray-800 border-gray-200', icon: CalendarDays, label: `Due in ${diffDays} days` };
  };

  const upcomingPayments = useMemo(() => {
    return clients
      .filter(client => {
        const planDetails = getPaymentPlanDetails(client.paymentPlan);
        return client.nextPaymentDate && client.paymentsMade < planDetails.installments;
      })
      .map(client => {
        const planDetails = getPaymentPlanDetails(client.paymentPlan);
        const remainingPayments = planDetails.installments - client.paymentsMade;
        const amountPerPayment = client.revenueSold / planDetails.installments;
        const status = getPaymentStatus(client.nextPaymentDate);
        return {
          ...client,
          remainingPayments,
          amountDue: amountPerPayment,
          totalRemaining: client.revenueSold - client.cashCollected,
          paymentStatus: status
        };
      })
      .sort((a, b) => new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate));
  }, [clients, today]);

  const overduePayments = upcomingPayments.filter(p => p.paymentStatus?.status === 'overdue');
  const dueSoonPayments = upcomingPayments.filter(p => ['due-today', 'due-soon'].includes(p.paymentStatus?.status));
  const thisWeekPayments = upcomingPayments.filter(p => p.paymentStatus?.status === 'upcoming');

  const filteredReminders = useMemo(() => {
    if (reminderFilter === 'all') return upcomingPayments;
    if (reminderFilter === 'overdue') return overduePayments;
    if (reminderFilter === 'due-soon') return dueSoonPayments;
    if (reminderFilter === 'this-week') return thisWeekPayments;
    return upcomingPayments;
  }, [upcomingPayments, reminderFilter, overduePayments, dueSoonPayments, thisWeekPayments]);

  const clientStats = useMemo(() => {
    const totalRevenueSold = clients.reduce((acc, c) => acc + c.revenueSold, 0);
    const totalCashCollected = clients.reduce((acc, c) => acc + c.cashCollected, 0);
    const totalRevenuePending = totalRevenueSold - totalCashCollected;
    const paidInFull = clients.filter(c => c.cashCollected >= c.revenueSold).length;
    const inProgress = clients.filter(c => c.cashCollected < c.revenueSold && c.cashCollected > 0).length;
    return { totalRevenueSold, totalCashCollected, totalRevenuePending, totalClients: clients.length, paidInFull, inProgress };
  }, [clients]);

  const paymentPlanBreakdown = useMemo(() => {
    const breakdown = {};
    clients.forEach(c => {
      if (!breakdown[c.paymentPlan]) breakdown[c.paymentPlan] = { count: 0, revenue: 0 };
      breakdown[c.paymentPlan].count++;
      breakdown[c.paymentPlan].revenue += c.revenueSold;
    });
    return Object.entries(breakdown).map(([name, data]) => ({ name, ...data }));
  }, [clients]);
  
  const calculateMetrics = (data) => {
    const adjustedScheduled = data.scScheduled - data.scRescheduled;
    return {
      ...data,
      showRate: adjustedScheduled > 0 ? (data.scCompleted / adjustedScheduled) * 100 : 0,
      offerRate: data.scCompleted > 0 ? (data.offerMade / data.scCompleted) * 100 : 0,
      closeRate: data.scCompleted > 0 ? (data.salesClients / data.scCompleted) * 100 : 0,
    };
  };
  
  const salesTotals = useMemo(() => {
    const sum = salesData.reduce((acc, curr) => ({
      scScheduled: acc.scScheduled + curr.scScheduled,
      scRescheduled: acc.scRescheduled + curr.scRescheduled,
      scCompleted: acc.scCompleted + curr.scCompleted,
      offerMade: acc.offerMade + curr.offerMade,
      salesClients: acc.salesClients + curr.salesClients,
      revenue: acc.revenue + curr.revenue,
      cashCollected: acc.cashCollected + curr.cashCollected
    }), { scScheduled: 0, scRescheduled: 0, scCompleted: 0, offerMade: 0, salesClients: 0, revenue: 0, cashCollected: 0 });
    return calculateMetrics(sum);
  }, [salesData]);

  const handleAddClient = (client) => {
    const planDetails = getPaymentPlanDetails(client.paymentPlan);
    const nextDate = planDetails.installments > 1 ? calculateNextPaymentDate(client.startDate, 1) : null;
    const newClient = { 
      ...client, 
      id: Math.max(...clients.map(c => c.id), 0) + 1,
      nextPaymentDate: nextDate,
      paymentsMade: 1
    };
    setClients([...clients, newClient]);
    if (client.cashCollected > 0) {
      const newPayment = {
        id: Math.max(...payments.map(p => p.id), 0) + 1,
        clientId: newClient.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        productName: client.productName,
        amount: client.cashCollected,
        paymentSource: 'Stripe',
        date: client.startDate,
        status: 'Completed',
        paymentNumber: 1
      };
      setPayments([...payments, newPayment]);
    }
    setShowClientModal(false);
    setSelectedClientForEdit(null);
  };

  const handleEditClient = (client) => {
    const planDetails = getPaymentPlanDetails(client.paymentPlan);
    const isFullyPaid = client.cashCollected >= client.revenueSold;
    const nextDate = isFullyPaid ? null : (planDetails.installments > 1 ? calculateNextPaymentDate(client.startDate, client.paymentsMade) : null);
    
    setClients(clients.map(c => 
      c.id === client.id 
        ? { ...client, nextPaymentDate: nextDate }
        : c
    ));
    
    setPayments(payments.map(p => 
      p.clientId === client.id 
        ? { ...p, firstName: client.firstName, lastName: client.lastName, email: client.email, productName: client.productName }
        : p
    ));
    
    setShowClientModal(false);
    setSelectedClientForEdit(null);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(c => c.id !== clientId));
    setPayments(payments.filter(p => p.clientId !== clientId));
    closeDeleteModal();
  };

  const handleAddPayment = (payment) => {
    const newPayment = { ...payment, id: Math.max(...payments.map(p => p.id), 0) + 1 };
    setPayments([...payments, newPayment]);
    if (payment.clientId) {
      setClients(clients.map(c => {
        if (c.id === payment.clientId) {
          const planDetails = getPaymentPlanDetails(c.paymentPlan);
          const newPaymentsMade = c.paymentsMade + 1;
          const newCashCollected = c.cashCollected + payment.amount;
          const isFullyPaid = newCashCollected >= c.revenueSold;
          const nextDate = isFullyPaid ? null : (newPaymentsMade < planDetails.installments 
            ? calculateNextPaymentDate(c.startDate, newPaymentsMade)
            : null);
          return { 
            ...c, 
            cashCollected: newCashCollected,
            paymentsMade: newPaymentsMade,
            nextPaymentDate: nextDate
          };
        }
        return c;
      }));
    }
    setShowPaymentModal(false);
    setSelectedClientForPayment(null);
    setSelectedPaymentForEdit(null);
  };

  const handleEditPayment = (payment) => {
    const oldPayment = payments.find(p => p.id === payment.id);
    const amountDiff = payment.amount - (oldPayment?.amount || 0);
    
    setPayments(payments.map(p => p.id === payment.id ? payment : p));
    
    if (payment.clientId && amountDiff !== 0) {
      setClients(clients.map(c => {
        if (c.id === payment.clientId) {
          const newCashCollected = c.cashCollected + amountDiff;
          const isFullyPaid = newCashCollected >= c.revenueSold;
          const planDetails = getPaymentPlanDetails(c.paymentPlan);
          const nextDate = isFullyPaid ? null : calculateNextPaymentDate(c.startDate, c.paymentsMade);
          return { ...c, cashCollected: newCashCollected, nextPaymentDate: nextDate };
        }
        return c;
      }));
    }
    
    setShowPaymentModal(false);
    setSelectedPaymentForEdit(null);
  };

  const handleDeletePayment = (paymentId) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment && payment.clientId) {
      setClients(clients.map(c => {
        if (c.id === payment.clientId) {
          const newCashCollected = c.cashCollected - payment.amount;
          const newPaymentsMade = Math.max(c.paymentsMade - 1, 0);
          const planDetails = getPaymentPlanDetails(c.paymentPlan);
          const nextDate = newPaymentsMade < planDetails.installments 
            ? calculateNextPaymentDate(c.startDate, newPaymentsMade)
            : null;
          return { ...c, cashCollected: newCashCollected, paymentsMade: newPaymentsMade, nextPaymentDate: nextDate };
        }
        return c;
      }));
    }
    setPayments(payments.filter(p => p.id !== paymentId));
    closeDeleteModal();
  };

  const handleAddSales = (sales) => {
    setSalesData([...salesData, { ...sales, id: Math.max(...salesData.map(s => s.id), 0) + 1 }]);
    setShowSalesModal(false);
    setSelectedSalesForEdit(null);
  };

  const handleEditSales = (sales) => {
    setSalesData(salesData.map(s => s.id === sales.id ? sales : s));
    setShowSalesModal(false);
    setSelectedSalesForEdit(null);
  };

  const handleDeleteSales = (salesId) => {
    setSalesData(salesData.filter(s => s.id !== salesId));
    closeDeleteModal();
  };

  const handleQuickPayment = (client) => {
    setSelectedClientForPayment(client);
    setSelectedPaymentForEdit(null);
    setShowPaymentModal(true);
    closeActionMenu();
  };

  const openEditClientModal = (client) => {
    setSelectedClientForEdit(client);
    setShowClientModal(true);
    closeActionMenu();
  };

  const openEditPaymentModal = (payment) => {
    setSelectedPaymentForEdit(payment);
    setSelectedClientForPayment(null);
    setShowPaymentModal(true);
    closeActionMenu();
  };

  const openEditSalesModal = (sales) => {
    setSelectedSalesForEdit(sales);
    setShowSalesModal(true);
    closeActionMenu();
  };

  const openDeleteConfirmation = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteModal(true);
    closeActionMenu();
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
    setDeleteType(null);
  };

  const closeActionMenu = () => {
    setOpenActionMenu(null);
    setOpenActionMenuType(null);
  };

  const toggleActionMenu = (id, type, e) => {
    e.stopPropagation();
    if (openActionMenu === id && openActionMenuType === type) {
      closeActionMenu();
    } else {
      setOpenActionMenu(id);
      setOpenActionMenuType(type);
    }
  };

  const getClientPayments = (clientId) => payments.filter(p => p.clientId === clientId);

  const getClientStatus = (client) => {
    const percentage = (client.cashCollected / client.revenueSold) * 100;
    if (percentage >= 100) return { label: 'Paid in Full', color: 'bg-green-100 text-green-800', icon: CheckCircle };
    if (percentage > 0) return { label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: Clock };
    return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle };
  };

  const chartData = salesData.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: day.revenue,
    cashCollected: day.cashCollected,
    clients: day.salesClients
  }));

  const COLORS = ['#660631', '#8B0A4A', '#A60F5C', '#BF1467', '#D91A73'];

  const pieData = paymentPlanBreakdown.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length]
  }));

  React.useEffect(() => {
    const handleClickOutside = () => closeActionMenu();
    if (openActionMenu !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openActionMenu]);

  const ActionMenu = ({ item, type, options }) => (
    <div className="relative">
      <button 
        onClick={(e) => toggleActionMenu(item.id, type, e)} 
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
      {openActionMenu === item.id && openActionMenuType === type && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-20">
          {options.map((option, idx) => (
            <React.Fragment key={idx}>
              {option.divider ? (
                <hr className="my-1" />
              ) : (
                <button 
                  onClick={option.onClick} 
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${option.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'}`}
                >
                  {option.icon && <option.icon className="w-4 h-4" />}
                  {option.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f4' }}>
      <header className="bg-white shadow-sm" style={{ borderBottom: '4px solid #660631' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#660631' }}>
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#660631' }}>Sales Dashboard</h1>
                <p className="text-sm text-gray-500">Track your performance</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {overduePayments.length > 0 && (
                <button onClick={() => { setActiveTab('reminders'); setReminderFilter('overdue'); }} className="px-3 py-2 rounded-lg bg-red-100 text-red-800 flex items-center gap-2 text-sm font-medium animate-pulse">
                  <AlertTriangle className="w-4 h-4" /> {overduePayments.length} Overdue
                </button>
              )}
              <button onClick={() => { setSelectedClientForEdit(null); setShowClientModal(true); }} className="px-4 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#660631' }}>
                <UserPlus className="w-4 h-4" /> New Client
              </button>
              <button onClick={() => { setSelectedSalesForEdit(null); setShowSalesModal(true); }} className="px-4 py-2 rounded-lg border-2 flex items-center gap-2 text-sm font-medium transition-all hover:bg-gray-50" style={{ borderColor: '#660631', color: '#660631' }}>
                <TrendingUp className="w-4 h-4" /> Add Sales
              </button>
              <button onClick={() => { setSelectedPaymentForEdit(null); setSelectedClientForPayment(null); setShowPaymentModal(true); }} className="px-4 py-2 rounded-lg border-2 flex items-center gap-2 text-sm font-medium transition-all hover:bg-gray-50" style={{ borderColor: '#660631', color: '#660631' }}>
                <CreditCard className="w-4 h-4" /> Add Payment
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <nav className="bg-white border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'reminders', label: 'Payment Reminders', icon: Bell, badge: overduePayments.length + dueSoonPayments.length },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'sales', label: 'Sales Data', icon: TrendingUp },
              { id: 'payments', label: 'Payments', icon: CreditCard }
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 flex items-center gap-2 border-b-2 transition-all font-medium text-sm whitespace-nowrap ${activeTab === tab.id ? '' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                style={activeTab === tab.id ? { color: '#660631', borderColor: '#660631' } : {}}>
                <tab.icon className="w-4 h-4" /> {tab.label}
                {tab.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">{tab.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {overduePayments.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-red-800">{overduePayments.length} Overdue Payment{overduePayments.length > 1 ? 's' : ''}</p>
                          <p className="text-sm text-red-600">Total: ${overduePayments.reduce((a, p) => a + p.amountDue, 0).toLocaleString()} needs collection</p>
                        </div>
                      </div>
                      <button onClick={() => { setActiveTab('reminders'); setReminderFilter('overdue'); }} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                        View All
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: 'Revenue Sold', value: `$${clientStats.totalRevenueSold.toLocaleString()}`, icon: DollarSign, sub: `${clientStats.totalClients} total clients` },
                    { title: 'Cash Collected', value: `$${clientStats.totalCashCollected.toLocaleString()}`, icon: CreditCard, sub: `${((clientStats.totalCashCollected / clientStats.totalRevenueSold) * 100).toFixed(0)}% collected` },
                    { title: 'Revenue Pending', value: `$${clientStats.totalRevenuePending.toLocaleString()}`, icon: Clock, sub: `${upcomingPayments.length} payments scheduled` },
                    { title: 'Close Rate', value: `${salesTotals.closeRate.toFixed(1)}%`, icon: Target, sub: `${salesTotals.salesClients} of ${salesTotals.scCompleted} closed` },
                  ].map((card, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                          <p className="text-2xl font-bold" style={{ color: '#660631' }}>{card.value}</p>
                          <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eee8dc' }}>
                          <card.icon className="w-5 h-5" style={{ color: '#660631' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold" style={{ color: '#660631' }}>Upcoming Payments</h3>
                      <button onClick={() => setActiveTab('reminders')} className="text-sm font-medium" style={{ color: '#660631' }}>View All →</button>
                    </div>
                    <div className="space-y-3">
                      {upcomingPayments.slice(0, 5).map((client) => (
                        <div key={client.id} className={`flex items-center justify-between p-3 rounded-lg border ${client.paymentStatus?.color || 'bg-gray-50'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#660631' }}>
                              <span className="text-white font-bold text-sm">{client.firstName[0]}{client.lastName[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{client.firstName} {client.lastName}</p>
                              <p className="text-xs text-gray-600">{client.productName} • Payment {client.paymentsMade + 1}/{getPaymentPlanDetails(client.paymentPlan).installments}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold" style={{ color: '#660631' }}>${client.amountDue.toLocaleString()}</p>
                            <div className="flex items-center gap-1 text-xs">
                              {client.paymentStatus?.icon && <client.paymentStatus.icon className="w-3 h-3" />}
                              <span>{client.paymentStatus?.label}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {upcomingPayments.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                          <p>All payments are up to date!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#660631' }}>Payment Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-red-800">Overdue</span>
                        </div>
                        <span className="text-xl font-bold text-red-600">{overduePayments.length}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-yellow-800">Due Soon</span>
                        </div>
                        <span className="text-xl font-bold text-yellow-600">{dueSoonPayments.length}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">This Week</span>
                        </div>
                        <span className="text-xl font-bold text-blue-600">{thisWeekPayments.length}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Paid in Full</span>
                        </div>
                        <span className="text-xl font-bold text-green-600">{clientStats.paidInFull}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#660631' }}>Revenue Trend</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#660631" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#660631" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                          <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                          <Area type="monotone" dataKey="revenue" stroke="#660631" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} name="Revenue" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#660631' }}>Payment Plans</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="count">
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v, name, props) => [`${v} clients`, props.payload.name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 space-y-1">
                      {pieData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-gray-600">{item.name}</span>
                          </div>
                          <span className="font-medium">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reminders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#660631' }}>Payment Reminders</h2>
                    <p className="text-gray-500 text-sm">Track upcoming and overdue payments</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select value={reminderFilter} onChange={(e) => setReminderFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2" style={{ '--tw-ring-color': '#660631' }}>
                      <option value="all">All Scheduled ({upcomingPayments.length})</option>
                      <option value="overdue">Overdue ({overduePayments.length})</option>
                      <option value="due-soon">Due Soon ({dueSoonPayments.length})</option>
                      <option value="this-week">This Week ({thisWeekPayments.length})</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Overdue', value: overduePayments.length, amount: overduePayments.reduce((a, p) => a + p.amountDue, 0), color: 'bg-red-50 border-red-200', textColor: 'text-red-600' },
                    { label: 'Due Today/Soon', value: dueSoonPayments.length, amount: dueSoonPayments.reduce((a, p) => a + p.amountDue, 0), color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-600' },
                    { label: 'This Week', value: thisWeekPayments.length, amount: thisWeekPayments.reduce((a, p) => a + p.amountDue, 0), color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-600' },
                    { label: 'Total Scheduled', value: upcomingPayments.length, amount: upcomingPayments.reduce((a, p) => a + p.totalRemaining, 0), color: 'bg-gray-50 border-gray-200', textColor: 'text-gray-600' },
                  ].map((stat, idx) => (
                    <div key={idx} className={`rounded-xl p-4 border ${stat.color}`}>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">${stat.amount.toLocaleString()} pending</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="px-6 py-4 border-b" style={{ backgroundColor: '#eee8dc' }}>
                    <h3 className="font-semibold" style={{ color: '#660631' }}>Payment Schedule</h3>
                  </div>
                  <div className="divide-y">
                    {filteredReminders.length > 0 ? filteredReminders.map((client) => {
                      const planDetails = getPaymentPlanDetails(client.paymentPlan);
                      return (
                        <div key={client.id} className={`px-6 py-4 hover:bg-gray-50 ${client.paymentStatus?.status === 'overdue' ? 'bg-red-50' : ''}`}>
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#660631' }}>
                                <span className="text-white font-bold">{client.firstName[0]}{client.lastName[0]}</span>
                              </div>
                              <div>
                                <p className="font-semibold">{client.firstName} {client.lastName}</p>
                                <p className="text-sm text-gray-500">{client.email}</p>
                                <p className="text-xs text-gray-400">{client.productName} • {client.paymentPlan}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-6 flex-wrap">
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Next Payment</p>
                                <p className="font-medium">{new Date(client.nextPaymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Payment #</p>
                                <p className="font-medium">{client.paymentsMade + 1} of {planDetails.installments}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Amount Due</p>
                                <p className="font-bold text-lg" style={{ color: '#660631' }}>${client.amountDue.toLocaleString()}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Total Remaining</p>
                                <p className="font-medium">${client.totalRemaining.toLocaleString()}</p>
                              </div>
                              <div>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1 border ${client.paymentStatus?.color}`}>
                                  {client.paymentStatus?.icon && <client.paymentStatus.icon className="w-3 h-3" />}
                                  {client.paymentStatus?.label}
                                </span>
                              </div>
                              <button onClick={() => handleQuickPayment(client)} className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#660631' }}>
                                Record Payment
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="h-2 rounded-full transition-all" style={{ width: `${(client.cashCollected / client.revenueSold) * 100}%`, backgroundColor: '#660631' }} />
                            </div>
                            <span className="text-xs text-gray-500">{((client.cashCollected / client.revenueSold) * 100).toFixed(0)}% collected</span>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="px-6 py-12 text-center text-gray-500">
                        <CheckCircle className="w-16 h-16 mx-auto mb-3 text-green-500" />
                        <p className="text-lg font-medium">No payments in this category</p>
                        <p className="text-sm">All caught up!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#660631' }}>Clients</h2>
                    <p className="text-gray-500 text-sm">Manage all your clients and their payment plans</p>
                  </div>
                  <button onClick={() => { setSelectedClientForEdit(null); setShowClientModal(true); }} className="px-4 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#660631' }}>
                    <UserPlus className="w-4 h-4" /> Add Client
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Clients', value: clientStats.totalClients, icon: Users },
                    { label: 'Revenue Sold', value: `$${clientStats.totalRevenueSold.toLocaleString()}`, icon: DollarSign },
                    { label: 'Cash Collected', value: `$${clientStats.totalCashCollected.toLocaleString()}`, icon: CreditCard },
                    { label: 'Revenue Pending', value: `$${clientStats.totalRevenuePending.toLocaleString()}`, icon: Clock },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eee8dc' }}>
                          <stat.icon className="w-5 h-5" style={{ color: '#660631' }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                          <p className="text-lg font-bold" style={{ color: '#660631' }}>{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#eee8dc' }}>
                          {['Client', 'Product', 'Plan', 'Progress', 'Revenue Sold', 'Collected', 'Pending', 'Next Payment', 'Actions'].map(h => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left" style={{ color: '#660631' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {clients.map((client) => {
                          const status = getClientStatus(client);
                          const pending = client.revenueSold - client.cashCollected;
                          const isExpanded = expandedClient === client.id;
                          const clientPayments = getClientPayments(client.id);
                          const planDetails = getPaymentPlanDetails(client.paymentPlan);
                          const paymentStatus = client.nextPaymentDate ? getPaymentStatus(client.nextPaymentDate) : null;
                          
                          return (
                            <React.Fragment key={client.id}>
                              <tr className={`hover:bg-gray-50 ${paymentStatus?.status === 'overdue' ? 'bg-red-50' : ''}`}>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#660631' }}>
                                      <span className="text-white font-bold text-sm">{client.firstName[0]}{client.lastName[0]}</span>
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">{client.firstName} {client.lastName}</p>
                                      <p className="text-xs text-gray-500">{client.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{client.productName}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#eee8dc', color: '#660631' }}>
                                    {client.paymentPlan}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                      <div className="h-2 rounded-full" style={{ width: `${(client.cashCollected / client.revenueSold) * 100}%`, backgroundColor: '#660631' }} />
                                    </div>
                                    <span className="text-xs text-gray-500">{client.paymentsMade}/{planDetails.installments}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm font-semibold" style={{ color: '#660631' }}>${client.revenueSold.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm font-medium text-green-600">${client.cashCollected.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm font-medium text-orange-600">${pending.toLocaleString()}</td>
                                <td className="px-4 py-3">
                                  {client.nextPaymentDate ? (
                                    <div>
                                      <p className="text-sm">{new Date(client.nextPaymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                      {paymentStatus && (
                                        <span className={`text-xs px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${paymentStatus.color}`}>
                                          <paymentStatus.icon className="w-3 h-3" />
                                          {paymentStatus.label}
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Complete</span>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => setExpandedClient(isExpanded ? null : client.id)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View payments">
                                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                                    </button>
                                    <ActionMenu 
                                      item={client} 
                                      type="client"
                                      options={[
                                        { label: 'Edit Client', icon: Edit2, onClick: () => openEditClientModal(client) },
                                        ...(client.nextPaymentDate ? [{ label: 'Record Payment', icon: Plus, onClick: () => handleQuickPayment(client) }] : []),
                                        { divider: true },
                                        { label: 'Delete Client', icon: Trash2, onClick: () => openDeleteConfirmation(client, 'client'), danger: true }
                                      ]}
                                    />
                                  </div>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr>
                                  <td colSpan={9} className="px-4 py-4 bg-gray-50">
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold" style={{ color: '#660631' }}>Payment History</p>
                                        <p className="text-xs text-gray-500">
                                          {((client.cashCollected / client.revenueSold) * 100).toFixed(0)}% collected
                                        </p>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="h-2 rounded-full" style={{ width: `${Math.min((client.cashCollected / client.revenueSold) * 100, 100)}%`, backgroundColor: '#660631' }} />
                                      </div>
                                      {clientPayments.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                          {clientPayments.map((p, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                                              <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#660631' }}>
                                                  {p.paymentNumber}
                                                </div>
                                                <div>
                                                  <p className="text-sm font-medium">${p.amount.toLocaleString()}</p>
                                                  <p className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()} • {p.paymentSource}</p>
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <ActionMenu 
                                                  item={p} 
                                                  type="payment-inline"
                                                  options={[
                                                    { label: 'Edit Payment', icon: Edit2, onClick: () => openEditPaymentModal(p) },
                                                    { divider: true },
                                                    { label: 'Delete Payment', icon: Trash2, onClick: () => openDeleteConfirmation(p, 'payment'), danger: true }
                                                  ]}
                                                />
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-500 text-center py-2">No payments recorded yet</p>
                                      )}
                                      {client.notes && (
                                        <div className="mt-2 p-2 bg-white rounded border">
                                          <p className="text-xs text-gray-500">Notes: {client.notes}</p>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'sales' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#660631' }}>Sales Data</h2>
                    <p className="text-gray-500 text-sm">Daily sales call performance tracking</p>
                  </div>
                  <button onClick={() => { setSelectedSalesForEdit(null); setShowSalesModal(true); }} className="px-4 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#660631' }}>
                    <Plus className="w-4 h-4" /> Add Daily Data
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#eee8dc' }}>
                          {['Date', 'SC Sched', 'SC Resch', 'SC Comp', 'Show %', 'Offers', 'Clients', 'Close %', 'Revenue', 'Collected', 'Actions'].map(h => (
                            <th key={h} className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-left" style={{ color: '#660631' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {salesData.map(calculateMetrics).reverse().map((row, idx) => (
                          <tr key={row.id} className="hover:bg-gray-50">
                            <td className="px-3 py-3 text-sm font-medium">{new Date(row.date).toLocaleDateString()}</td>
                            <td className="px-3 py-3 text-sm text-center">{row.scScheduled}</td>
                            <td className="px-3 py-3 text-sm text-center">{row.scRescheduled}</td>
                            <td className="px-3 py-3 text-sm text-center">{row.scCompleted}</td>
                            <td className="px-3 py-3 text-sm">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${row.showRate >= 70 ? 'bg-green-100 text-green-800' : row.showRate >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {row.showRate.toFixed(0)}%
                              </span>
                            </td>
                            <td className="px-3 py-3 text-sm text-center">{row.offerMade}</td>
                            <td className="px-3 py-3 text-sm text-center font-semibold" style={{ color: '#660631' }}>{row.salesClients}</td>
                            <td className="px-3 py-3 text-sm">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${row.closeRate >= 30 ? 'bg-green-100 text-green-800' : row.closeRate >= 20 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {row.closeRate.toFixed(0)}%
                              </span>
                            </td>
                            <td className="px-3 py-3 text-sm font-semibold">${row.revenue.toLocaleString()}</td>
                            <td className="px-3 py-3 text-sm">${row.cashCollected.toLocaleString()}</td>
                            <td className="px-3 py-3">
                              <ActionMenu 
                                item={row} 
                                type="sales"
                                options={[
                                  { label: 'Edit Entry', icon: Edit2, onClick: () => openEditSalesModal(row) },
                                  { divider: true },
                                  { label: 'Delete Entry', icon: Trash2, onClick: () => openDeleteConfirmation(row, 'sales'), danger: true }
                                ]}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ backgroundColor: '#eee8dc' }}>
                          <td className="px-3 py-3 text-sm font-bold" style={{ color: '#660631' }}>TOTAL</td>
                          <td className="px-3 py-3 text-sm text-center font-bold">{salesTotals.scScheduled}</td>
                          <td className="px-3 py-3 text-sm text-center font-bold">{salesTotals.scRescheduled}</td>
                          <td className="px-3 py-3 text-sm text-center font-bold">{salesTotals.scCompleted}</td>
                          <td className="px-3 py-3 text-sm font-bold">{salesTotals.showRate.toFixed(0)}%</td>
                          <td className="px-3 py-3 text-sm text-center font-bold">{salesTotals.offerMade}</td>
                          <td className="px-3 py-3 text-sm text-center font-bold" style={{ color: '#660631' }}>{salesTotals.salesClients}</td>
                          <td className="px-3 py-3 text-sm font-bold">{salesTotals.closeRate.toFixed(0)}%</td>
                          <td className="px-3 py-3 text-sm font-bold">${salesTotals.revenue.toLocaleString()}</td>
                          <td className="px-3 py-3 text-sm font-bold">${salesTotals.cashCollected.toLocaleString()}</td>
                          <td className="px-3 py-3"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#660631' }}>Payments</h2>
                    <p className="text-gray-500 text-sm">Track all customer payments</p>
                  </div>
                  <button onClick={() => { setSelectedPaymentForEdit(null); setSelectedClientForPayment(null); setShowPaymentModal(true); }} className="px-4 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#660631' }}>
                    <Plus className="w-4 h-4" /> Add Payment
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Collected', val: `$${payments.reduce((a, p) => a + p.amount, 0).toLocaleString()}` },
                    { label: 'Number of Payments', val: payments.length },
                    { label: 'Average Payment', val: `$${payments.length > 0 ? (payments.reduce((a, p) => a + p.amount, 0) / payments.length).toFixed(0) : 0}` },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
                      <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                      <p className="text-2xl font-bold" style={{ color: '#660631' }}>{s.val}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#eee8dc' }}>
                          {['Date', 'Customer', 'Email', 'Product', 'Amount', 'Source', 'Payment #', 'Status', 'Actions'].map(h => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-left" style={{ color: '#660631' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {payments.slice().reverse().map((p, idx) => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{new Date(p.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-sm font-medium">{p.firstName} {p.lastName}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{p.email}</td>
                            <td className="px-4 py-3 text-sm">{p.productName}</td>
                            <td className="px-4 py-3 text-sm font-semibold" style={{ color: '#660631' }}>${p.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm">{p.paymentSource}</td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#eee8dc', color: '#660631' }}>
                                #{p.paymentNumber}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${p.status === 'Completed' ? 'bg-green-100 text-green-800' : p.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{p.status}</span>
                            </td>
                            <td className="px-4 py-3">
                              <ActionMenu 
                                item={p} 
                                type="payment"
                                options={[
                                  { label: 'Edit Payment', icon: Edit2, onClick: () => openEditPaymentModal(p) },
                                  { divider: true },
                                  { label: 'Delete Payment', icon: Trash2, onClick: () => openDeleteConfirmation(p, 'payment'), danger: true }
                                ]}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {showClientModal && (
        <Modal title={selectedClientForEdit ? "Edit Client" : "Add New Client"} onClose={() => { setShowClientModal(false); setSelectedClientForEdit(null); }}>
          <ClientForm 
            client={selectedClientForEdit} 
            onSubmit={selectedClientForEdit ? handleEditClient : handleAddClient} 
            onCancel={() => { setShowClientModal(false); setSelectedClientForEdit(null); }} 
          />
        </Modal>
      )}
      
      {showPaymentModal && (
        <Modal title={selectedPaymentForEdit ? "Edit Payment" : "Record Payment"} onClose={() => { setShowPaymentModal(false); setSelectedClientForPayment(null); setSelectedPaymentForEdit(null); }}>
          <PaymentForm 
            clients={clients} 
            preselectedClient={selectedClientForPayment}
            payment={selectedPaymentForEdit}
            onSubmit={selectedPaymentForEdit ? handleEditPayment : handleAddPayment} 
            onCancel={() => { setShowPaymentModal(false); setSelectedClientForPayment(null); setSelectedPaymentForEdit(null); }} 
          />
        </Modal>
      )}
      
      {showSalesModal && (
        <Modal title={selectedSalesForEdit ? "Edit Sales Data" : "Add Daily Sales Data"} onClose={() => { setShowSalesModal(false); setSelectedSalesForEdit(null); }}>
          <SalesForm 
            sales={selectedSalesForEdit}
            onSubmit={selectedSalesForEdit ? handleEditSales : handleAddSales} 
            onCancel={() => { setShowSalesModal(false); setSelectedSalesForEdit(null); }} 
          />
        </Modal>
      )}

      {showDeleteModal && itemToDelete && (
        <Modal title={`Delete ${deleteType === 'client' ? 'Client' : deleteType === 'payment' ? 'Payment' : 'Sales Entry'}`} onClose={closeDeleteModal}>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Are you sure you want to delete this {deleteType}?</p>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              {deleteType === 'client' && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#660631' }}>
                      <span className="text-white font-bold text-sm">{itemToDelete.firstName[0]}{itemToDelete.lastName[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{itemToDelete.firstName} {itemToDelete.lastName}</p>
                      <p className="text-sm text-gray-500">{itemToDelete.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Product</p>
                      <p className="font-medium">{itemToDelete.productName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue Sold</p>
                      <p className="font-medium">${itemToDelete.revenueSold.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-xs text-red-600 mt-3">⚠️ This will also delete all payment records for this client.</p>
                </>
              )}
              
              {deleteType === 'payment' && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer</span>
                    <span className="font-medium">{itemToDelete.firstName} {itemToDelete.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-medium text-green-600">${itemToDelete.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">{new Date(itemToDelete.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Source</span>
                    <span className="font-medium">{itemToDelete.paymentSource}</span>
                  </div>
                  {itemToDelete.clientId && (
                    <p className="text-xs text-orange-600 mt-3">⚠️ The client's cash collected will be reduced by ${itemToDelete.amount.toLocaleString()}</p>
                  )}
                </div>
              )}
              
              {deleteType === 'sales' && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">{new Date(itemToDelete.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Calls Completed</span>
                    <span className="font-medium">{itemToDelete.scCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sales Clients</span>
                    <span className="font-medium">{itemToDelete.salesClients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Revenue</span>
                    <span className="font-medium">${itemToDelete.revenue.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button onClick={closeDeleteModal} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (deleteType === 'client') handleDeleteClient(itemToDelete.id);
                  else if (deleteType === 'payment') handleDeletePayment(itemToDelete.id);
                  else if (deleteType === 'sales') handleDeleteSales(itemToDelete.id);
                }} 
                className="flex-1 px-4 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700"
              >
                Delete {deleteType === 'client' ? 'Client' : deleteType === 'payment' ? 'Payment' : 'Entry'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-xl shadow-xl max-w-lg w-full z-10 max-h-screen overflow-y-auto">
          <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10" style={{ backgroundColor: '#eee8dc' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#660631' }}>{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function ClientForm({ client, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: client?.id || null,
    firstName: client?.firstName || '', 
    lastName: client?.lastName || '', 
    email: client?.email || '', 
    phone: client?.phone || '',
    productName: client?.productName || '', 
    paymentPlan: client?.paymentPlan || 'Full Pay',
    revenueSold: client?.revenueSold?.toString() || '', 
    cashCollected: client?.cashCollected?.toString() || '',
    startDate: client?.startDate || new Date().toISOString().split('T')[0],
    status: client?.status || 'Active', 
    notes: client?.notes || '',
    paymentsMade: client?.paymentsMade || 1
  });

  const isEditing = !!client;

  const revenuePending = useMemo(() => {
    const sold = parseFloat(form.revenueSold) || 0;
    const collected = parseFloat(form.cashCollected) || 0;
    return Math.max(sold - collected, 0);
  }, [form.revenueSold, form.cashCollected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      revenueSold: parseFloat(form.revenueSold) || 0,
      cashCollected: parseFloat(form.cashCollected) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
        <input type="text" required value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" placeholder="e.g., Premium Course, VIP Coaching" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Plan *</label>
          <select value={form.paymentPlan} onChange={(e) => setForm({ ...form, paymentPlan: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2">
            <option value="Full Pay">Full Pay</option>
            <option value="2-Pay">2-Pay</option>
            <option value="3-Pay">3-Pay</option>
            <option value="4-Pay">4-Pay</option>
            <option value="6-Pay">6-Pay</option>
            <option value="12-Pay">12-Pay</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
          <input type="date" required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Sold ($) *</label>
          <input type="number" required min="0" step="0.01" value={form.revenueSold} onChange={(e) => setForm({ ...form, revenueSold: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" placeholder="Total contract value" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cash Collected ($) *</label>
          <input type="number" required min="0" step="0.01" value={form.cashCollected} onChange={(e) => setForm({ ...form, cashCollected: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" placeholder={isEditing ? "Total collected so far" : "Initial payment"} />
        </div>
      </div>
      {isEditing && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payments Made (#)</label>
            <input type="number" min="1" value={form.paymentsMade} onChange={(e) => setForm({ ...form, paymentsMade: parseInt(e.target.value) || 1 })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2">
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      )}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#eee8dc' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: '#660631' }}>Revenue Pending:</span>
          <span className="text-lg font-bold" style={{ color: '#660631' }}>${revenuePending.toLocaleString()}</span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 h-20 resize-none" placeholder="Any additional notes about this client..." />
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
        <button type="submit" className="flex-1 px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: '#660631' }}>
          {isEditing ? 'Save Changes' : 'Add Client'}
        </button>
      </div>
    </form>
  );
}

function PaymentForm({ clients, preselectedClient, payment, onSubmit, onCancel }) {
  const isEditing = !!payment;
  const [isExistingClient, setIsExistingClient] = useState(true);
  const [form, setForm] = useState({
    id: payment?.id || null,
    clientId: payment?.clientId?.toString() || preselectedClient?.id?.toString() || '',
    firstName: payment?.firstName || '', 
    lastName: payment?.lastName || '', 
    email: payment?.email || '',
    productName: payment?.productName || '', 
    amount: payment?.amount?.toString() || '',
    paymentSource: payment?.paymentSource || 'Stripe',
    date: payment?.date || new Date().toISOString().split('T')[0], 
    status: payment?.status || 'Completed',
    paymentNumber: payment?.paymentNumber || 1
  });

  const selectedClient = clients.find(c => c.id === parseInt(form.clientId));
  const planDetails = selectedClient ? {
    'Full Pay': 1, '2-Pay': 2, '3-Pay': 3, '4-Pay': 4, '6-Pay': 6, '12-Pay': 12, 'Custom': 12
  }[selectedClient.paymentPlan] || 1 : 1;
  const suggestedAmount = selectedClient ? (selectedClient.revenueSold / planDetails) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = selectedClient || { firstName: form.firstName, lastName: form.lastName, email: form.email };
    onSubmit({
      ...form,
      clientId: selectedClient?.id || payment?.clientId || null,
      firstName: clientData.firstName || form.firstName,
      lastName: clientData.lastName || form.lastName,
      email: clientData.email || form.email,
      productName: selectedClient?.productName || form.productName,
      amount: parseFloat(form.amount) || 0,
      paymentNumber: isEditing ? form.paymentNumber : (selectedClient ? selectedClient.paymentsMade + 1 : 1)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {!preselectedClient && !isEditing && (
        <div className="flex gap-2 p-1 rounded-lg" style={{ backgroundColor: '#eee8dc' }}>
          <button type="button" onClick={() => setIsExistingClient(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${isExistingClient ? 'bg-white shadow' : ''}`}
            style={isExistingClient ? { color: '#660631' } : { color: '#666' }}>
            Existing Client
          </button>
          <button type="button" onClick={() => setIsExistingClient(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${!isExistingClient ? 'bg-white shadow' : ''}`}
            style={!isExistingClient ? { color: '#660631' } : { color: '#666' }}>
            New Entry
          </button>
        </div>
      )}

      {(isExistingClient || preselectedClient || isEditing) && !(!isExistingClient && !isEditing) ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Client *</label>
          <select 
            required={!isEditing} 
            value={form.clientId} 
            onChange={(e) => setForm({ ...form, clientId: e.target.value })} 
            disabled={!!preselectedClient || isEditing} 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100"
          >
            <option value="">Choose a client...</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.firstName} {c.lastName} - {c.productName}</option>
            ))}
          </select>
          {(selectedClient || isEditing) && (
            <div className="mt-3 p-4 rounded-lg border bg-gray-50 space-y-2">
              {isEditing && !selectedClient && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Customer:</span>
                    <span className="text-sm font-medium">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Product:</span>
                    <span className="text-sm font-medium">{form.productName}</span>
                  </div>
                </>
              )}
              {selectedClient && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Product:</span>
                    <span className="text-sm font-medium">{selectedClient.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Plan:</span>
                    <span className="text-sm font-medium">{selectedClient.paymentPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment:</span>
                    <span className="text-sm font-medium">#{isEditing ? form.paymentNumber : selectedClient.paymentsMade + 1} of {planDetails}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining:</span>
                    <span className="text-sm font-bold" style={{ color: '#660631' }}>${(selectedClient.revenueSold - selectedClient.cashCollected).toLocaleString()}</span>
                  </div>
                  {!isEditing && (
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Suggested Amount:</span>
                        <span className="text-sm font-bold" style={{ color: '#660631' }}>${suggestedAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input type="text" required value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($) *</label>
          <input type="number" required min="0" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" placeholder={suggestedAmount > 0 ? suggestedAmount.toString() : ''} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Source *</label>
          <select value={form.paymentSource} onChange={(e) => setForm({ ...form, paymentSource: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2">
            <option>Stripe</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
            <option>Cash</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2">
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>
        </div>
      </div>
      {isEditing && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Number</label>
          <input type="number" min="1" value={form.paymentNumber} onChange={(e) => setForm({ ...form, paymentNumber: parseInt(e.target.value) || 1 })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
      )}
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
        <button type="submit" className="flex-1 px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: '#660631' }}>
          {isEditing ? 'Save Changes' : 'Record Payment'}
        </button>
      </div>
    </form>
  );
}

function SalesForm({ sales, onSubmit, onCancel }) {
  const isEditing = !!sales;
  const [form, setForm] = useState({
    id: sales?.id || null,
    date: sales?.date || new Date().toISOString().split('T')[0],
    scScheduled: sales?.scScheduled?.toString() || '', 
    scRescheduled: sales?.scRescheduled?.toString() || '', 
    scCompleted: sales?.scCompleted?.toString() || '',
    offerMade: sales?.offerMade?.toString() || '', 
    salesClients: sales?.salesClients?.toString() || '', 
    revenue: sales?.revenue?.toString() || '', 
    cashCollected: sales?.cashCollected?.toString() || ''
  });

  const preview = useMemo(() => {
    const s = parseInt(form.scScheduled) || 0;
    const r = parseInt(form.scRescheduled) || 0;
    const c = parseInt(form.scCompleted) || 0;
    const cl = parseInt(form.salesClients) || 0;
    const adj = s - r;
    return {
      show: adj > 0 ? ((c / adj) * 100).toFixed(1) : '0.0',
      close: c > 0 ? ((cl / c) * 100).toFixed(1) : '0.0'
    };
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      scScheduled: parseInt(form.scScheduled) || 0,
      scRescheduled: parseInt(form.scRescheduled) || 0,
      scCompleted: parseInt(form.scCompleted) || 0,
      offerMade: parseInt(form.offerMade) || 0,
      salesClients: parseInt(form.salesClients) || 0,
      revenue: parseFloat(form.revenue) || 0,
      cashCollected: parseFloat(form.cashCollected) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
        <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SC Scheduled (#) *</label>
          <input type="number" required min="0" value={form.scScheduled} onChange={(e) => setForm({ ...form, scScheduled: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SC Rescheduled (#) *</label>
          <input type="number" required min="0" value={form.scRescheduled} onChange={(e) => setForm({ ...form, scRescheduled: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SC Completed (#) *</label>
          <input type="number" required min="0" value={form.scCompleted} onChange={(e) => setForm({ ...form, scCompleted: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Offer Made (#) *</label>
          <input type="number" required min="0" value={form.offerMade} onChange={(e) => setForm({ ...form, offerMade: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sales Clients (#) *</label>
        <input type="number" required min="0" value={form.salesClients} onChange={(e) => setForm({ ...form, salesClients: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($) *</label>
          <input type="number" required min="0" step="0.01" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cash Collected ($) *</label>
          <input type="number" required min="0" step="0.01" value={form.cashCollected} onChange={(e) => setForm({ ...form, cashCollected: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
      </div>
      <div className="rounded-lg p-4" style={{ backgroundColor: '#eee8dc' }}>
        <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#660631' }}>Auto-Calculated Preview</p>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600">Show Rate</p>
            <p className="text-xl font-bold" style={{ color: '#660631' }}>{preview.show}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Close Rate</p>
            <p className="text-xl font-bold" style={{ color: '#660631' }}>{preview.close}%</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
        <button type="submit" className="flex-1 px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: '#660631' }}>
          {isEditing ? 'Save Changes' : 'Add Sales Data'}
        </button>
      </div>
    </form>
  );
}
