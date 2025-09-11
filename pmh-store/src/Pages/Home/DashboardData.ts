// Dummy Data for Dashboard

export const salesData = [
  { 
    month: 'Jan', 
    sales: 45000, 
    profit: 12000, 
    orders: 245, 
    customers: 89,
    avgOrderValue: 184,
    returnRate: 2.1,
    conversionRate: 3.2,
    newCustomers: 23,
    expenses: 33000,
    profitMargin: 26.7,
    prevYearSales: 38000,
    target: 50000,
    outstandingAmount: 5400
  },
  { 
    month: 'Feb', 
    sales: 52000, 
    profit: 15000, 
    orders: 287, 
    customers: 95,
    avgOrderValue: 181,
    returnRate: 1.8,
    conversionRate: 3.5,
    newCustomers: 18,
    expenses: 37000,
    profitMargin: 28.8,
    prevYearSales: 44000,
    target: 50000,
    outstandingAmount: 6240
  },
  { 
    month: 'Mar', 
    sales: 48000, 
    profit: 13500, 
    orders: 265, 
    customers: 102,
    avgOrderValue: 181,
    returnRate: 2.3,
    conversionRate: 3.1,
    newCustomers: 15,
    expenses: 34500,
    profitMargin: 28.1,
    prevYearSales: 41000,
    target: 55000,
    outstandingAmount: 5760
  },
  { 
    month: 'Apr', 
    sales: 61000, 
    profit: 18000, 
    orders: 324, 
    customers: 118,
    avgOrderValue: 188,
    returnRate: 1.9,
    conversionRate: 3.8,
    newCustomers: 22,
    expenses: 43000,
    profitMargin: 29.5,
    prevYearSales: 52000,
    target: 58000
  },
  { 
    month: 'May', 
    sales: 55000, 
    profit: 16500, 
    orders: 298, 
    customers: 125,
    avgOrderValue: 185,
    returnRate: 2.0,
    conversionRate: 3.4,
    newCustomers: 19,
    expenses: 38500,
    profitMargin: 30.0,
    prevYearSales: 47000,
    target: 60000
  },
  { 
    month: 'Jun', 
    sales: 67000, 
    profit: 20000, 
    orders: 356, 
    customers: 134,
    avgOrderValue: 188,
    returnRate: 1.7,
    conversionRate: 4.1,
    newCustomers: 25,
    expenses: 47000,
    profitMargin: 29.9,
    prevYearSales: 58000,
    target: 62000,
    outstandingAmount: 8040
  },
  { 
    month: 'Jul', 
    sales: 72000, 
    profit: 22000, 
    orders: 389, 
    customers: 142,
    avgOrderValue: 185,
    returnRate: 1.6,
    conversionRate: 4.3,
    newCustomers: 28,
    expenses: 50000,
    profitMargin: 30.6,
    prevYearSales: 63000,
    target: 65000
  },
  { 
    month: 'Aug', 
    sales: 69000, 
    profit: 21000, 
    orders: 375, 
    customers: 138,
    avgOrderValue: 184,
    returnRate: 1.8,
    conversionRate: 4.0,
    newCustomers: 21,
    expenses: 48000,
    profitMargin: 30.4,
    prevYearSales: 59000,
    target: 67000
  },
  { 
    month: 'Sep', 
    sales: 74000, 
    profit: 23500, 
    orders: 402, 
    customers: 156,
    avgOrderValue: 184,
    returnRate: 1.5,
    conversionRate: 4.5,
    newCustomers: 32,
    expenses: 50500,
    profitMargin: 31.8,
    prevYearSales: 65000,
    target: 70000,
    outstandingAmount: 8880
  },
  { 
    month: 'Oct', 
    sales: 78000, 
    profit: 25000, 
    orders: 425, 
    customers: 168,
    avgOrderValue: 184,
    returnRate: 1.4,
    conversionRate: 4.7,
    newCustomers: 35,
    expenses: 53000,
    profitMargin: 32.1,
    prevYearSales: 68000,
    target: 72000
  },
  { 
    month: 'Nov', 
    sales: 82000, 
    profit: 27000, 
    orders: 445, 
    customers: 175,
    avgOrderValue: 184,
    returnRate: 1.3,
    conversionRate: 4.9,
    newCustomers: 38,
    expenses: 55000,
    profitMargin: 32.9,
    prevYearSales: 71000,
    target: 75000
  },
  { 
    month: 'Dec', 
    sales: 89000, 
    profit: 30000, 
    orders: 478, 
    customers: 189,
    avgOrderValue: 186,
    returnRate: 1.2,
    conversionRate: 5.1,
    newCustomers: 42,
    expenses: 59000,
    profitMargin: 33.7,
    prevYearSales: 76000,
    target: 80000,
    outstandingAmount: 10680
  }
];

export const categoryData = [
  { name: 'Fresh Produce', value: 28, sales: 245000, color: '#0088FE' },
  { name: 'Packaged Foods', value: 24, sales: 210000, color: '#00C49F' },
  { name: 'Dairy & Frozen', value: 18, sales: 158000, color: '#FFBB28' },
  { name: 'Beverages', value: 15, sales: 131000, color: '#FF8042' },
  { name: 'Personal Care', value: 10, sales: 87000, color: '#8884d8' },
  { name: 'Household Items', value: 5, sales: 44000, color: '#82ca9d' }
];

export const topProducts = [
  { name: 'Fresh Vegetables', sales: 8450, revenue: 125000, growth: 15.5 },
  { name: 'Dairy Products', sales: 6890, revenue: 178000, growth: 22.3 },
  { name: 'Packaged Foods', sales: 5340, revenue: 93600, growth: -2.1 },
  { name: 'Beverages', sales: 4680, revenue: 84000, growth: 15.7 },
  { name: 'Personal Care', sales: 3920, revenue: 64400, growth: 6.9 }
];

export const recentActivities = [
  { 
    type: 'sale' as const, 
    description: 'Cash sale completed - ₹2,450', 
    time: '2 minutes ago',
    amount: 2450
  },
  { 
    type: 'customer' as const, 
    description: 'New customer membership - Priya Sharma', 
    time: '15 minutes ago'
  },
  { 
    type: 'order' as const, 
    description: 'Card payment processed - ₹3,250', 
    time: '1 hour ago',
    amount: 3250
  },
  { 
    type: 'product' as const, 
    description: 'Low stock alert - Fresh Milk (500ml)', 
    time: '2 hours ago'
  },
  { 
    type: 'sale' as const, 
    description: 'UPI payment received - ₹1,850', 
    time: '3 hours ago',
    amount: 1850
  }
];

export const stockAlerts = [
  { product: 'Fresh Milk (1L)', current: 15, minimum: 50, status: 'critical' as const },
  { product: 'Basmati Rice (5kg)', current: 8, minimum: 20, status: 'critical' as const },
  { product: 'Cooking Oil (1L)', current: 22, minimum: 30, status: 'warning' as const },
  { product: 'Bread Loaves', current: 35, minimum: 60, status: 'low' as const }
];

export const paymentMethods = [
  { method: 'Cash', transactions: 145, amount: 285000, percentage: 21.8 },
  { method: 'Card', transactions: 234, amount: 456000, percentage: 34.9 },
  { method: 'UPI', transactions: 189, amount: 378000, percentage: 28.9 },
  { method: 'Bank Transfer', transactions: 67, amount: 234000, percentage: 17.9 }
];

export const customerSegments = [
  { segment: 'Premium', customers: 45, revenue: 450000, angle: 120 },
  { segment: 'Regular', customers: 128, revenue: 320000, angle: 90 },
  { segment: 'New', customers: 67, revenue: 134000, angle: 60 },
  { segment: 'Inactive', customers: 23, revenue: 23000, angle: 30 }
];

export const weeklyData = [
  { day: 'Mon', sales: 12000, orders: 45 },
  { day: 'Tue', sales: 15000, orders: 52 },
  { day: 'Wed', sales: 18000, orders: 61 },
  { day: 'Thu', sales: 14000, orders: 48 },
  { day: 'Fri', sales: 22000, orders: 78 },
  { day: 'Sat', sales: 25000, orders: 89 },
  { day: 'Sun', sales: 19000, orders: 65 }
];

export const monthlyInsights = [
  {
    month: 'Jan',
    insight: 'Post-holiday season shows steady customer footfall',
    keyMetric: 'Daily Transactions: 245',
    trend: 'up' as const,
    recommendation: 'Focus on fresh produce quality for Q1'
  },
  {
    month: 'Feb',
    insight: 'Festival season boost with increased grocery purchases',
    keyMetric: 'Avg Basket Size: ₹450',
    trend: 'up' as const,
    recommendation: 'Stock up on festival essentials'
  },
  {
    month: 'Mar',
    insight: 'Slight dip in sales but maintained profit margins',
    keyMetric: 'Profit Margin: 28.1%',
    trend: 'down' as const,
    recommendation: 'Analyze competitor activities'
  },
  {
    month: 'Apr',
    insight: 'Strong recovery with highest AOV of Q1',
    keyMetric: 'AOV: ₹188',
    trend: 'up' as const,
    recommendation: 'Continue premium product focus'
  },
  {
    month: 'May',
    insight: 'Consistent performance with low return rates',
    keyMetric: 'Return Rate: 2.0%',
    trend: 'stable' as const,
    recommendation: 'Maintain quality standards'
  },
  {
    month: 'Jun',
    insight: 'Summer beverages and cooling products drive sales',
    keyMetric: 'Beverage Sales: +35%',
    trend: 'up' as const,
    recommendation: 'Expand cold storage capacity'
  },
  {
    month: 'Jul',
    insight: 'Peak summer with high demand for fresh produce',
    keyMetric: 'Fresh Produce: 30.6%',
    trend: 'up' as const,
    recommendation: 'Optimize supply chain for perishables'
  },
  {
    month: 'Aug',
    insight: 'Slight decline but strong customer retention',
    keyMetric: 'Customer Retention: 95%',
    trend: 'stable' as const,
    recommendation: 'Focus on new customer acquisition'
  },
  {
    month: 'Sep',
    insight: 'Back-to-school boost with record conversions',
    keyMetric: 'Conversion: 4.5%',
    trend: 'up' as const,
    recommendation: 'Optimize for seasonal trends'
  },
  {
    month: 'Oct',
    insight: 'Festive season preparation showing results',
    keyMetric: 'Orders: 425',
    trend: 'up' as const,
    recommendation: 'Stock up for holiday season'
  },
  {
    month: 'Nov',
    insight: 'Pre-holiday shopping driving strong sales',
    keyMetric: 'Sales: ₹82K',
    trend: 'up' as const,
    recommendation: 'Enhance customer service capacity'
  },
  {
    month: 'Dec',
    insight: 'Record-breaking month but rising outstanding amounts',
    keyMetric: 'Outstanding: ₹10.7K',
    trend: 'up' as const,
    recommendation: 'Focus on payment collection and credit terms'
  }
];

export const performanceMetrics = [
  { metric: 'Revenue Growth', value: 97.8, target: 85, unit: '%', status: 'excellent' as const },
  { metric: 'Profit Margin', value: 31.2, target: 25, unit: '%', status: 'good' as const },
  { metric: 'Customer Satisfaction', value: 4.7, target: 4.5, unit: '/5', status: 'excellent' as const },
  { metric: 'Order Fulfillment', value: 98.3, target: 95, unit: '%', status: 'excellent' as const },
  { metric: 'Outstanding Ratio', value: 14.4, target: 10, unit: '%', status: 'warning' as const },
  { metric: 'Inventory Turnover', value: 6.2, target: 8, unit: 'x', status: 'warning' as const },
  { metric: 'Return Rate', value: 1.6, target: 2.5, unit: '%', status: 'excellent' as const },
  { metric: 'Customer Acquisition Cost', value: 45, target: 60, unit: '₹', status: 'good' as const },
  { metric: 'Lifetime Value', value: 1250, target: 1000, unit: '₹', status: 'excellent' as const }
];

export const monthlyComparison = [
  { month: 'Jan', current: 45000, previous: 38000, growth: 18.4 },
  { month: 'Feb', current: 52000, previous: 44000, growth: 18.2 },
  { month: 'Mar', current: 48000, previous: 41000, growth: 17.1 },
  { month: 'Apr', current: 61000, previous: 52000, growth: 17.3 },
  { month: 'May', current: 55000, previous: 47000, growth: 17.0 },
  { month: 'Jun', current: 67000, previous: 58000, growth: 15.5 },
  { month: 'Jul', current: 72000, previous: 63000, growth: 14.3 },
  { month: 'Aug', current: 69000, previous: 59000, growth: 16.9 },
  { month: 'Sep', current: 74000, previous: 65000, growth: 13.8 },
  { month: 'Oct', current: 78000, previous: 68000, growth: 14.7 },
  { month: 'Nov', current: 82000, previous: 71000, growth: 15.5 },
  { month: 'Dec', current: 89000, previous: 76000, growth: 17.1 }
];

export const quarterlyData = [
  { quarter: 'Q1 2024', revenue: 145000, profit: 40500, orders: 797, avgGrowth: 17.9 },
  { quarter: 'Q2 2024', revenue: 183000, profit: 54500, orders: 978, avgGrowth: 16.6 },
  { quarter: 'Q3 2024', revenue: 215000, profit: 66500, orders: 1166, avgGrowth: 15.0 },
  { quarter: 'Q4 2024', revenue: 249000, profit: 82000, orders: 1348, avgGrowth: 15.8 }
];

export const dailyTrends = [
  { day: 'Monday', orders: 45, revenue: 8500, avgOrderValue: 189 },
  { day: 'Tuesday', orders: 52, revenue: 9200, avgOrderValue: 177 },
  { day: 'Wednesday', orders: 48, revenue: 8800, avgOrderValue: 183 },
  { day: 'Thursday', orders: 58, revenue: 10500, avgOrderValue: 181 },
  { day: 'Friday', orders: 72, revenue: 13200, avgOrderValue: 183 },
  { day: 'Saturday', orders: 89, revenue: 16800, avgOrderValue: 189 },
  { day: 'Sunday', orders: 65, revenue: 12100, avgOrderValue: 186 }
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
