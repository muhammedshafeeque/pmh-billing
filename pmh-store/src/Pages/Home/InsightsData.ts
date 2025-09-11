// Comprehensive Business Insights Data

export const salesForecast = [
  { month: 'Jan 2025', predicted: 95000, confidence: 85, factors: ['Festival season', 'New year boost'] },
  { month: 'Feb 2025', predicted: 102000, confidence: 78, factors: ['Valentine promotions', 'Wedding season'] },
  { month: 'Mar 2025', predicted: 98000, confidence: 82, factors: ['Holi festival', 'Spring demand'] },
  { month: 'Apr 2025', predicted: 105000, confidence: 80, factors: ['Summer prep', 'School reopening'] }
];

export const customerInsights = [
  {
    segment: 'Premium Customers',
    count: 45,
    avgOrderValue: 1250,
    frequency: 8.5,
    loyalty: 92,
    revenue: 450000,
    growth: 15.2,
    insight: 'High-value customers driving 60% of revenue'
  },
  {
    segment: 'Regular Customers',
    count: 128,
    avgOrderValue: 650,
    frequency: 4.2,
    loyalty: 78,
    revenue: 320000,
    growth: 8.7,
    insight: 'Stable customer base with consistent purchases'
  },
  {
    segment: 'New Customers',
    count: 67,
    avgOrderValue: 420,
    frequency: 2.1,
    loyalty: 45,
    revenue: 134000,
    growth: 22.3,
    insight: 'Growing segment with high acquisition potential'
  }
];

export const inventoryInsights = [
  {
    category: 'Fresh Produce',
    turnover: 12.5,
    wasteRate: 3.2,
    stockDays: 29,
    efficiency: 87,
    recommendation: 'Optimize ordering to reduce waste',
    trend: 'improving'
  },
  {
    category: 'Dairy Products',
    turnover: 8.3,
    wasteRate: 2.1,
    stockDays: 44,
    efficiency: 92,
    recommendation: 'Excellent management, maintain current levels',
    trend: 'stable'
  },
  {
    category: 'Packaged Foods',
    turnover: 6.7,
    wasteRate: 1.8,
    stockDays: 54,
    efficiency: 78,
    recommendation: 'Consider reducing stock levels',
    trend: 'declining'
  },
  {
    category: 'Beverages',
    turnover: 15.2,
    wasteRate: 1.2,
    stockDays: 24,
    efficiency: 95,
    recommendation: 'High demand, increase stock capacity',
    trend: 'improving'
  }
];

export const financialInsights = [
  {
    metric: 'Cash Flow Forecast',
    current: 125000,
    projected: 145000,
    trend: 'positive' as const,
    confidence: 85,
    factors: ['Outstanding collection', 'Seasonal sales boost'],
    recommendation: 'Strong cash position, consider expansion'
  },
  {
    metric: 'Working Capital',
    current: 280000,
    optimal: 320000,
    trend: 'improving' as const,
    confidence: 78,
    factors: ['Inventory optimization', 'Payment terms'],
    recommendation: 'Increase working capital for growth'
  },
  {
    metric: 'Debt-to-Equity Ratio',
    current: 0.35,
    optimal: 0.4,
    trend: 'stable' as const,
    confidence: 90,
    factors: ['Conservative approach', 'Low risk'],
    recommendation: 'Healthy ratio, room for strategic borrowing'
  }
];

export const operationalInsights = [
  {
    area: 'Customer Service',
    score: 4.7,
    target: 4.5,
    trend: 'excellent',
    factors: ['Response time', 'Resolution rate', 'Satisfaction'],
    recommendation: 'Maintain high standards, consider automation'
  },
  {
    area: 'Order Processing',
    score: 4.2,
    target: 4.5,
    trend: 'improving',
    factors: ['Speed', 'Accuracy', 'Efficiency'],
    recommendation: 'Focus on accuracy improvements'
  },
  {
    area: 'Inventory Management',
    score: 4.1,
    target: 4.3,
    trend: 'stable',
    factors: ['Stock levels', 'Waste reduction', 'Turnover'],
    recommendation: 'Implement automated reordering system'
  },
  {
    area: 'Payment Processing',
    score: 4.6,
    target: 4.4,
    trend: 'excellent',
    factors: ['Speed', 'Security', 'Options'],
    recommendation: 'Excellent performance, maintain current systems'
  }
];

export const marketInsights = [
  {
    trend: 'Digital Payment Adoption',
    current: 68,
    growth: 12.5,
    impact: 'positive',
    insight: 'Customers prefer digital payments, invest in UPI infrastructure'
  },
  {
    trend: 'Fresh Produce Demand',
    current: 85,
    growth: 8.3,
    impact: 'positive',
    insight: 'Growing health consciousness, expand organic section'
  },
  {
    trend: 'Home Delivery Preference',
    current: 45,
    growth: 25.7,
    impact: 'positive',
    insight: 'High growth potential, consider delivery service expansion'
  },
  {
    trend: 'Price Sensitivity',
    current: 72,
    growth: -3.2,
    impact: 'neutral',
    insight: 'Customers becoming less price-sensitive, focus on quality'
  }
];

export const riskInsights = [
  {
    risk: 'Outstanding Collection',
    level: 'medium' as const,
    impact: 'financial' as const,
    probability: 65,
    mitigation: 'Implement stricter credit terms and automated reminders',
    timeline: 'immediate'
  },
  {
    risk: 'Seasonal Demand Fluctuation',
    level: 'low' as const,
    impact: 'operational' as const,
    probability: 30,
    mitigation: 'Diversify product mix and build buffer inventory',
    timeline: 'quarterly'
  },
  {
    risk: 'Competition Pressure',
    level: 'medium' as const,
    impact: 'market' as const,
    probability: 55,
    mitigation: 'Focus on customer experience and loyalty programs',
    timeline: 'ongoing'
  },
  {
    risk: 'Supply Chain Disruption',
    level: 'low' as const,
    impact: 'operational' as const,
    probability: 25,
    mitigation: 'Develop multiple supplier relationships',
    timeline: 'preventive'
  }
];

export const growthOpportunities = [
  {
    opportunity: 'Online Store Expansion',
    potential: 'high' as const,
    investment: 150000,
    roi: 35,
    timeline: '6 months',
    description: 'Launch e-commerce platform to capture digital market'
  },
  {
    opportunity: 'Home Delivery Service',
    potential: 'medium' as const,
    investment: 80000,
    roi: 28,
    timeline: '4 months',
    description: 'Partner with delivery services for customer convenience'
  },
  {
    opportunity: 'Loyalty Program',
    potential: 'high' as const,
    investment: 25000,
    roi: 45,
    timeline: '2 months',
    description: 'Implement points-based system to increase retention'
  },
  {
    opportunity: 'Fresh Produce Expansion',
    potential: 'medium' as const,
    investment: 60000,
    roi: 22,
    timeline: '3 months',
    description: 'Add organic and premium fresh produce section'
  }
];

export const performanceBenchmarks = [
  {
    metric: 'Revenue Growth',
    current: 16.7,
    industry: 12.3,
    topQuartile: 18.5,
    status: 'above_average',
    insight: 'Performing better than industry average'
  },
  {
    metric: 'Customer Retention',
    current: 78,
    industry: 72,
    topQuartile: 85,
    status: 'above_average',
    insight: 'Good retention, room for improvement'
  },
  {
    metric: 'Inventory Turnover',
    current: 8.2,
    industry: 6.8,
    topQuartile: 10.5,
    status: 'above_average',
    insight: 'Efficient inventory management'
  },
  {
    metric: 'Profit Margin',
    current: 31.2,
    industry: 28.5,
    topQuartile: 35.8,
    status: 'above_average',
    insight: 'Healthy margins, optimize costs further'
  }
];
