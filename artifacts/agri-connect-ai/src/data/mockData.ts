export type Role = 'farmer' | 'consumer' | 'bulk' | 'delivery' | 'volunteer';

export const roleInfo = {
  farmer: { name: 'Lakshya', subtitle: 'Farmer • Guntur, Andhra Pradesh', initials: 'LK', tone: 'field' },
  consumer: { name: 'Priya', subtitle: 'Individual shopper • Hyderabad', initials: 'PR', tone: 'shopper' },
  bulk: { name: 'Aruna Foods', subtitle: 'Bulk procurement • Hyderabad', initials: 'AF', tone: 'bulk' },
  delivery: { name: 'Ravi Kumar', subtitle: 'Delivery partner • Guntur', initials: 'RK', tone: 'delivery' },
  volunteer: { name: 'Meera', subtitle: 'Community volunteer • Andhra Pradesh', initials: 'MS', tone: 'volunteer' },
} as const;

export const crops = [
  { id: 'tomato', name: 'Tomato', variety: 'Hybrid 553', quantity: '2,400 kg', price: '₹30/kg', trend: '+8.4%', color: 'bg-[#efb3a3]', emoji: 'T' },
  { id: 'rice', name: 'Rice', variety: 'Sona Masuri', quantity: '1,800 kg', price: '₹42/kg', trend: '+3.1%', color: 'bg-[#e8d58f]', emoji: 'R' },
  { id: 'cotton', name: 'Cotton', variety: 'Long staple', quantity: '950 kg', price: '₹68/kg', trend: '-1.8%', color: 'bg-[#d6e4dd]', emoji: 'C' },
  { id: 'chilli', name: 'Chilli', variety: 'Guntur Sannam', quantity: '420 kg', price: '₹118/kg', trend: '+12.2%', color: 'bg-[#e9b08c]', emoji: 'H' },
  { id: 'maize', name: 'Maize', variety: 'Yellow dent', quantity: '1,100 kg', price: '₹24/kg', trend: '+1.4%', color: 'bg-[#ead8a5]', emoji: 'M' },
  { id: 'groundnut', name: 'Groundnut', variety: 'Bold kernels', quantity: '680 kg', price: '₹76/kg', trend: '-2.4%', color: 'bg-[#d7c1a6]', emoji: 'G' },
];

export const orders = [
  { id: 'AG1024', crop: 'Tomato', buyer: 'FreshMart Foods', quantity: '800 kg', rate: '₹30/kg', total: '₹24,000', paid: '40% Advance Paid', status: 'In Transit', date: '8 Sept', accent: 'amber' },
  { id: 'AG1017', crop: 'Chilli', buyer: 'Rasa Kitchens', quantity: '240 kg', rate: '₹118/kg', total: '₹28,320', paid: 'Paid in full', status: 'Delivered', date: '2 Sept', accent: 'green' },
  { id: 'AG0998', crop: 'Rice', buyer: 'Harvest Basket', quantity: '600 kg', rate: '₹42/kg', total: '₹25,200', paid: 'Paid in full', status: 'Delivered', date: '28 Aug', accent: 'green' },
  { id: 'AG0983', crop: 'Cotton', buyer: 'Nandi Textiles', quantity: '450 kg', rate: '₹68/kg', total: '₹30,600', paid: '40% Advance Paid', status: 'Pending pickup', date: '12 Sept', accent: 'blue' },
];

export const priceHistory = [
  { month: 'Apr', Tomato: 23, Rice: 38, Chilli: 92 }, { month: 'May', Tomato: 25, Rice: 39, Chilli: 96 },
  { month: 'Jun', Tomato: 27, Rice: 40, Chilli: 101 }, { month: 'Jul', Tomato: 26, Rice: 41, Chilli: 106 },
  { month: 'Aug', Tomato: 28, Rice: 41, Chilli: 113 }, { month: 'Sep', Tomato: 30, Rice: 42, Chilli: 118 },
];

export const products = [
  { id: 'p1', name: 'Farm-fresh Tomato', farmer: 'Lakshya Farms', unit: '1 kg', price: 30, category: 'Vegetables', note: 'Harvested this morning', color: 'bg-[#efb3a3]' },
  { id: 'p2', name: 'Sona Masuri Rice', farmer: 'Savitri Organics', unit: '5 kg', price: 210, category: 'Grains', note: 'Stone-milled, local harvest', color: 'bg-[#e8d58f]' },
  { id: 'p3', name: 'Guntur Sannam Chilli', farmer: 'Lakshya Farms', unit: '250 g', price: 118, category: 'Spices', note: 'Bright, sun-dried pods', color: 'bg-[#e9b08c]' },
  { id: 'p4', name: 'Cold-pressed Groundnut Oil', farmer: 'Ravi Growers', unit: '1 litre', price: 186, category: 'Pantry', note: 'Small-batch pressed', color: 'bg-[#d7c1a6]' },
];

export const navByRole: Record<Role, { label: string; path: string; icon: string }[]> = {
  farmer: [
    { label: 'Overview', path: '/farmer/dashboard', icon: 'LayoutDashboard' }, { label: 'My crops', path: '/farmer/crops', icon: 'Wheat' },
    { label: 'Sell produce', path: '/farmer/sell', icon: 'CircleDollarSign' }, { label: 'Demand signals', path: '/farmer/demand', icon: 'TrendingUp' },
    { label: 'Market prices', path: '/farmer/prices', icon: 'ChartNoAxesCombined' }, { label: 'Orders', path: '/farmer/orders', icon: 'ClipboardList' },
    { label: 'Payments', path: '/farmer/payments', icon: 'WalletCards' }, { label: 'Delivery', path: '/farmer/delivery', icon: 'Truck' },
    { label: 'Quality', path: '/farmer/quality', icon: 'BadgeCheck' }, { label: 'Ratings', path: '/farmer/ratings', icon: 'Star' },
    { label: 'Rewards', path: '/farmer/rewards', icon: 'Medal' }, { label: 'AgriBot', path: '/farmer/assistant', icon: 'Bot' }, { label: 'Help centre', path: '/farmer/help', icon: 'LifeBuoy' },
  ],
  consumer: [
    { label: 'Overview', path: '/consumer/dashboard', icon: 'LayoutDashboard' }, { label: 'Shop produce', path: '/consumer/shop', icon: 'ShoppingBasket' },
    { label: 'My orders', path: '/consumer/orders', icon: 'ClipboardList' }, { label: 'Purchase history', path: '/consumer/history', icon: 'History' },
    { label: 'Savings', path: '/consumer/savings', icon: 'PiggyBank' }, { label: 'Delivery', path: '/consumer/delivery', icon: 'Truck' },
    { label: 'Ratings', path: '/consumer/ratings', icon: 'Star' }, { label: 'Rewards', path: '/consumer/rewards', icon: 'Medal' }, { label: 'AgriBot', path: '/consumer/assistant', icon: 'Bot' },
  ],
  bulk: [
    { label: 'Procurement desk', path: '/bulk/dashboard', icon: 'LayoutDashboard' }, { label: 'Find farmers', path: '/bulk/farmers', icon: 'UsersRound' },
    { label: 'Requirements', path: '/bulk/requirements', icon: 'FileText' }, { label: 'Orders', path: '/bulk/orders', icon: 'ClipboardList' },
    { label: 'Order history', path: '/bulk/history', icon: 'History' }, { label: 'Payments', path: '/bulk/payments', icon: 'WalletCards' },
    { label: 'Delivery', path: '/bulk/delivery', icon: 'Truck' }, { label: 'Ratings', path: '/bulk/ratings', icon: 'Star' },
  ],
  delivery: [
    { label: 'Route board', path: '/delivery/dashboard', icon: 'LayoutDashboard' }, { label: 'Active route', path: '/delivery/active', icon: 'Navigation' }, { label: 'History', path: '/delivery/history', icon: 'History' },
  ],
  volunteer: [
    { label: 'Support desk', path: '/volunteer/dashboard', icon: 'LayoutDashboard' }, { label: 'Requests', path: '/volunteer/requests', icon: 'HandHelping' }, { label: 'Call history', path: '/volunteer/history', icon: 'History' },
  ],
};

export const demandByLocation: Record<string, { high: string[]; medium: string[]; low: string[]; market: string }> = {
  Guntur: { high: ['Tomato', 'Chilli', 'Rice'], medium: ['Maize', 'Cotton'], low: ['Groundnut'], market: 'Guntur Agricultural Market' },
  Vijayawada: { high: ['Rice', 'Tomato'], medium: ['Chilli', 'Maize'], low: ['Cotton', 'Groundnut'], market: 'Vijayawada Wholesale Yard' },
  Visakhapatnam: { high: ['Rice', 'Groundnut'], medium: ['Tomato', 'Chilli'], low: ['Cotton', 'Maize'], market: 'Vizag Fresh Exchange' },
  Kurnool: { high: ['Groundnut', 'Cotton'], medium: ['Chilli', 'Maize'], low: ['Tomato', 'Rice'], market: 'Kurnool Rythu Bazaar' },
  Tirupati: { high: ['Tomato', 'Rice'], medium: ['Groundnut', 'Chilli'], low: ['Cotton', 'Maize'], market: 'Tirupati Farm Link' },
  Hyderabad: { high: ['Tomato', 'Chilli', 'Groundnut'], medium: ['Rice', 'Maize'], low: ['Cotton'], market: 'Bowenpally Market' },
  Warangal: { high: ['Cotton', 'Chilli'], medium: ['Rice', 'Groundnut'], low: ['Tomato', 'Maize'], market: 'Warangal Grain Hub' },
};