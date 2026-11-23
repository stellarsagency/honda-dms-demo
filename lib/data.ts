export type Branch = {
  id: "all" | "3s" | "2s";
  code: string;
  name: string;
  short: string;
  type: "Group" | "3S" | "2S";
  city: string;
};

export const branches: Branch[] = [
  { id: "all", code: "GROUP", name: "All Branches", short: "All", type: "Group", city: "Lahore" },
  { id: "3s", code: "3S-01", name: "Honda 3S — Main", short: "3S Main", type: "3S", city: "Lahore" },
  { id: "2s", code: "2S-01", name: "Honda 2S — City", short: "2S City", type: "2S", city: "Lahore" },
];

export const currentUser = {
  name: "Zeeshan Awan",
  role: "Owner / Group Administrator",
  email: "zeeshan@demohonda.pk",
  initials: "ZA",
};

export const notifications = [
  {
    id: 1,
    title: "Discount approval required",
    body: "JC-3S-0842 · 8.5% discount on Civic service estimate",
    time: "4 min ago",
    tone: "warning" as const,
  },
  {
    id: 2,
    title: "Low stock alert",
    body: "Engine oil 0W-20 — only 12 units left at 3S Main",
    time: "22 min ago",
    tone: "danger" as const,
  },
  {
    id: 3,
    title: "Corporate payment received",
    body: "Meezan Bank · PKR 425,000 against INV-3S-2291",
    time: "1 hr ago",
    tone: "success" as const,
  },
  {
    id: 4,
    title: "MOU renewal due",
    body: "Packages Ltd. corporate MOU expires in 14 days",
    time: "2 hrs ago",
    tone: "info" as const,
  },
];

export const dashboardKpis = [
  {
    label: "Total Revenue",
    value: "PKR 8.42 Cr",
    change: "+12.8%",
    trend: "up" as const,
    note: "vs. last month",
    icon: "revenue",
  },
  {
    label: "Open Job Cards",
    value: "47",
    change: "+6",
    trend: "up" as const,
    note: "12 awaiting approval",
    icon: "job",
  },
  {
    label: "Vehicles Sold",
    value: "38",
    change: "+9.2%",
    trend: "up" as const,
    note: "this month · 3S only",
    icon: "car",
  },
  {
    label: "Parts Revenue",
    value: "PKR 1.86 Cr",
    change: "-2.4%",
    trend: "down" as const,
    note: "vs. last month",
    icon: "parts",
  },
];

export const revenueData = [
  { month: "Dec", sales: 51, service: 18, parts: 12 },
  { month: "Jan", sales: 47, service: 17, parts: 13 },
  { month: "Feb", sales: 58, service: 19, parts: 14 },
  { month: "Mar", sales: 62, service: 21, parts: 15 },
  { month: "Apr", sales: 55, service: 20, parts: 14 },
  { month: "May", sales: 68, service: 22, parts: 16 },
  { month: "Jun", sales: 72, service: 24, parts: 17 },
  { month: "Jul", sales: 66, service: 23, parts: 16 },
  { month: "Aug", sales: 75, service: 25, parts: 18 },
  { month: "Sep", sales: 81, service: 26, parts: 19 },
  { month: "Oct", sales: 78, service: 27, parts: 18 },
  { month: "Nov", sales: 88, service: 29, parts: 20 },
];

export const branchPerformance = [
  { name: "3S Main", sales: 62, service: 24, parts: 14 },
  { name: "2S City", sales: 0, service: 68, parts: 32 },
];

export const jobCardStatus = [
  { name: "Open", value: 18, color: "#3B82F6" },
  { name: "In Progress", value: 21, color: "#F59E0B" },
  { name: "Awaiting Approval", value: 12, color: "#F52D43" },
  { name: "Ready", value: 9, color: "#10B981" },
];

export const appointments = [
  {
    id: 1,
    time: "09:30",
    customer: "Bilal Ahmed",
    vehicle: "Honda Civic 2022",
    plate: "LEB-4821",
    service: "10,000 km service",
    advisor: "Usman Tariq",
    branch: "3S Main",
    status: "Checked-in",
  },
  {
    id: 2,
    time: "10:00",
    customer: "Sana Malik",
    vehicle: "Honda City 2021",
    plate: "LEC-1180",
    service: "AC performance check",
    advisor: "Ayesha Khan",
    branch: "2S City",
    status: "In Progress",
  },
  {
    id: 3,
    time: "10:45",
    customer: "Hamza Sheikh",
    vehicle: "Honda BR-V 2023",
    plate: "LEA-9077",
    service: "Periodic maintenance",
    advisor: "Usman Tariq",
    branch: "3S Main",
    status: "Waiting",
  },
  {
    id: 4,
    time: "11:15",
    customer: "Faisal Nawaz",
    vehicle: "Honda HR-V 2022",
    plate: "LES-5566",
    service: "Brake inspection",
    advisor: "Adeel Raza",
    branch: "2S City",
    status: "Confirmed",
  },
  {
    id: 5,
    time: "12:00",
    customer: "Mariam Javed",
    vehicle: "Honda Civic 2024",
    plate: "LEB-0019",
    service: "First free service",
    advisor: "Ayesha Khan",
    branch: "3S Main",
    status: "Confirmed",
  },
];

export const jobCards = [
  {
    id: "JC-3S-0842",
    customer: "Bilal Ahmed",
    vehicle: "Civic 2022",
    plate: "LEB-4821",
    service: "10,000 km service",
    advisor: "Usman Tariq",
    technician: "Imran Ali",
    branch: "3S Main",
    status: "In Progress",
    priority: "Normal",
    amount: 28500,
    opened: "Today, 09:30",
    progress: 65,
  },
  {
    id: "JC-3S-0843",
    customer: "Mariam Javed",
    vehicle: "Civic 2024",
    plate: "LEB-0019",
    service: "First free service",
    advisor: "Ayesha Khan",
    technician: "Shahid Iqbal",
    branch: "3S Main",
    status: "Awaiting Approval",
    priority: "High",
    amount: 0,
    opened: "Today, 10:05",
    progress: 20,
  },
  {
    id: "JC-2S-0311",
    customer: "Sana Malik",
    vehicle: "City 2021",
    plate: "LEC-1180",
    service: "AC performance check",
    advisor: "Adeel Raza",
    technician: "Naveed Anwar",
    branch: "2S City",
    status: "In Progress",
    priority: "Normal",
    amount: 14200,
    opened: "Today, 10:00",
    progress: 45,
  },
  {
    id: "JC-3S-0840",
    customer: "Hamza Sheikh",
    vehicle: "BR-V 2023",
    plate: "LEA-9077",
    service: "Periodic maintenance",
    advisor: "Usman Tariq",
    technician: "Imran Ali",
    branch: "3S Main",
    status: "Ready",
    priority: "Normal",
    amount: 36800,
    opened: "Today, 08:15",
    progress: 100,
  },
  {
    id: "JC-2S-0310",
    customer: "Faisal Nawaz",
    vehicle: "HR-V 2022",
    plate: "LES-5566",
    service: "Brake inspection",
    advisor: "Adeel Raza",
    technician: "Kashif Mehmood",
    branch: "2S City",
    status: "Ready",
    priority: "Low",
    amount: 12750,
    opened: "Today, 08:40",
    progress: 100,
  },
  {
    id: "JC-3S-0839",
    customer: "Zainab Qureshi",
    vehicle: "City 2020",
    plate: "LEC-7781",
    service: "Suspension noise diagnosis",
    advisor: "Ayesha Khan",
    technician: "Shahid Iqbal",
    branch: "3S Main",
    status: "Awaiting Approval",
    priority: "High",
    amount: 54200,
    opened: "Yesterday, 16:20",
    progress: 35,
  },
  {
    id: "JC-2S-0309",
    customer: "Ahsan Rauf",
    vehicle: "Civic 2019",
    plate: "LEB-3345",
    service: "Oil & filter change",
    advisor: "Adeel Raza",
    technician: "Naveed Anwar",
    branch: "2S City",
    status: "Open",
    priority: "Normal",
    amount: 9800,
    opened: "Today, 11:05",
    progress: 5,
  },
  {
    id: "JC-3S-0838",
    customer: "Nida Aslam",
    vehicle: "HR-V 2023",
    plate: "LES-2120",
    service: "Battery replacement",
    advisor: "Usman Tariq",
    technician: "Imran Ali",
    branch: "3S Main",
    status: "Ready",
    priority: "Normal",
    amount: 21400,
    opened: "Today, 07:55",
    progress: 100,
  },
];

export const serviceKpis = [
  { label: "Open Job Cards", value: "47", sub: "12 awaiting approval", tone: "blue" },
  { label: "Vehicles In Workshop", value: "31", sub: "Capacity 38 · 82%", tone: "amber" },
  { label: "Avg. Turnaround", value: "3.2 hrs", sub: "Target under 4 hrs", tone: "green" },
  { label: "Service Revenue", value: "PKR 24.6 Lac", sub: "+8.4% vs last month", tone: "red" },
];

export const workshopBays = [
  { bay: "Bay 01", vehicle: "Civic 2022 · LEB-4821", job: "JC-3S-0842", tech: "Imran Ali", status: "In Progress", pct: 65 },
  { bay: "Bay 02", vehicle: "Civic 2024 · LEB-0019", job: "JC-3S-0843", tech: "Shahid Iqbal", status: "Awaiting Approval", pct: 20 },
  { bay: "Bay 03", vehicle: "BR-V 2023 · LEA-9077", job: "JC-3S-0840", tech: "Imran Ali", status: "QC Check", pct: 92 },
  { bay: "Bay 04", vehicle: "City 2020 · LEC-7781", job: "JC-3S-0839", tech: "Shahid Iqbal", status: "In Progress", pct: 35 },
  { bay: "Bay 05", vehicle: "HR-V 2023 · LES-2120", job: "JC-3S-0838", tech: "Imran Ali", status: "Ready", pct: 100 },
  { bay: "Bay 06", vehicle: "—", job: "Available", tech: "—", status: "Free", pct: 0 },
];

export const salesKpis = [
  { label: "Monthly Target", value: "45 units", sub: "38 delivered · 84%", tone: "red" },
  { label: "Bookings", value: "12", sub: "PKR 4.6 Cr pipeline", tone: "blue" },
  { label: "Test Drives", value: "67", sub: "18 this week", tone: "amber" },
  { label: "Conversion Rate", value: "24.8%", sub: "+3.1% vs last month", tone: "green" },
];

export const salesPipeline = [
  { stage: "New Leads", count: 34, value: 1.42, color: "#94A3B8" },
  { stage: "Contacted", count: 26, value: 1.08, color: "#60A5FA" },
  { stage: "Test Drive", count: 18, value: 0.76, color: "#F59E0B" },
  { stage: "Negotiation", count: 12, value: 0.52, color: "#F52D43" },
  { stage: "Booked", count: 9, value: 0.41, color: "#10B981" },
];

export const bookings = [
  { id: "BKG-3S-1284", customer: "Ali Hassan", model: "Civic RS Turbo", variant: "Pearl White", amount: 8320000, status: "Delivered", date: "20 Nov", consultant: "Fahad Mirza" },
  { id: "BKG-3S-1285", customer: "Fatima Zahra", model: "City 1.5 CVT", variant: "Taffeta White", amount: 4990000, status: "Financing", date: "20 Nov", consultant: "Hira Sohail" },
  { id: "BKG-3S-1286", customer: "Omar Farooq", model: "HR-V VTi", variant: "Premium Crystal Red", amount: 6980000, status: "Booked", date: "19 Nov", consultant: "Fahad Mirza" },
  { id: "BKG-3S-1287", customer: "Mehwish Iqbal", model: "BR-V S", variant: "Lunar Silver", amount: 5720000, status: "Booked", date: "19 Nov", consultant: "Hira Sohail" },
  { id: "BKG-3S-1288", customer: "Taimoor Khan", model: "Civic Oriel", variant: "Crystal Black", amount: 7890000, status: "Cancelled", date: "18 Nov", consultant: "Bilal Rana" },
  { id: "BKG-3S-1289", customer: "Rabia Nasir", model: "City 1.2 M/T", variant: "Meteoroid Grey", amount: 4290000, status: "Delivered", date: "18 Nov", consultant: "Hira Sohail" },
];

export const vehicleInventory = [
  { model: "Civic RS Turbo", inStock: 4, booked: 3, transit: 6, color: "Pearl White", demand: "High" },
  { model: "Civic Oriel", inStock: 3, booked: 2, transit: 4, color: "Crystal Black", demand: "High" },
  { model: "City 1.5 CVT", inStock: 7, booked: 4, transit: 8, color: "Taffeta White", demand: "High" },
  { model: "HR-V VTi", inStock: 2, booked: 1, transit: 3, color: "Crystal Red", demand: "Medium" },
  { model: "BR-V S", inStock: 5, booked: 2, transit: 0, color: "Lunar Silver", demand: "Medium" },
  { model: "City 1.2 M/T", inStock: 1, booked: 1, transit: 2, color: "Meteoroid Grey", demand: "Low" },
];

export const salesTrend = [
  { month: "Jun", target: 35, actual: 31 },
  { month: "Jul", target: 38, actual: 34 },
  { month: "Aug", target: 40, actual: 36 },
  { month: "Sep", target: 42, actual: 39 },
  { month: "Oct", target: 45, actual: 41 },
  { month: "Nov", target: 45, actual: 38 },
];

export const partsKpis = [
  { label: "Stock Value", value: "PKR 4.72 Cr", sub: "2,847 SKUs across 2 stores", tone: "blue" },
  { label: "Parts Revenue", value: "PKR 1.86 Cr", sub: "+6.1% vs last month", tone: "green" },
  { label: "Low Stock Items", value: "23", sub: "7 critical · reorder now", tone: "red" },
  { label: "Stock Accuracy", value: "98.4%", sub: "Last cycle count: 15 Nov", tone: "amber" },
];

export const lowStockParts = [
  { part: "Engine Oil 0W-20 (4L)", number: "HON-0W20-4L", branch: "3S Main", stock: 12, reorder: 40, supplier: "Honda Atlas", eta: "2 days" },
  { part: "Oil Filter — Civic 1.5T", number: "HON-OF-15T", branch: "3S Main", stock: 8, reorder: 30, supplier: "Honda Atlas", eta: "2 days" },
  { part: "Brake Pad Set — City", number: "HON-BP-CITY", branch: "2S City", stock: 3, reorder: 20, supplier: "Honda Atlas", eta: "4 days" },
  { part: "Air Filter — BR-V", number: "HON-AF-BRV", branch: "3S Main", stock: 6, reorder: 25, supplier: "Honda Atlas", eta: "2 days" },
  { part: "Wiper Blade 26\"", number: "HON-WB-26", branch: "2S City", stock: 4, reorder: 15, supplier: "Metro Auto", eta: "1 day" },
  { part: "CVT Fluid (3.5L)", number: "HON-CVT-35", branch: "3S Main", stock: 9, reorder: 24, supplier: "Honda Atlas", eta: "3 days" },
];

export const parts = [
  { part: "Engine Oil 0W-20 (4L)", number: "HON-0W20-4L", category: "Lubricants", stock3s: 12, stock2s: 18, cost: 9200, price: 11400, status: "Low" },
  { part: "Oil Filter — Civic 1.5T", number: "HON-OF-15T", category: "Filters", stock3s: 8, stock2s: 14, cost: 1450, price: 1950, status: "Low" },
  { part: "Brake Pad Set — City", number: "HON-BP-CITY", category: "Brakes", stock3s: 24, stock2s: 3, cost: 7800, price: 9800, status: "Critical" },
  { part: "Air Filter — BR-V", number: "HON-AF-BRV", category: "Filters", stock3s: 6, stock2s: 11, cost: 2200, price: 2950, status: "Low" },
  { part: "Spark Plug — Iridium", number: "HON-SP-IRD", category: "Engine", stock3s: 48, stock2s: 26, cost: 1850, price: 2450, status: "Healthy" },
  { part: "Wiper Blade 26\"", number: "HON-WB-26", category: "Accessories", stock3s: 16, stock2s: 4, cost: 2800, price: 3650, status: "Low" },
  { part: "CVT Fluid (3.5L)", number: "HON-CVT-35", category: "Lubricants", stock3s: 9, stock2s: 12, cost: 11500, price: 14200, status: "Low" },
  { part: "Cabin Air Filter — Civic", number: "HON-CAF-CIV", category: "Filters", stock3s: 32, stock2s: 19, cost: 3100, price: 4200, status: "Healthy" },
  { part: "Headlight Bulb LED", number: "HON-HL-LED", category: "Electrical", stock3s: 21, stock2s: 8, cost: 6400, price: 8300, status: "Healthy" },
];

export const purchaseOrders = [
  { id: "PO-3S-0291", supplier: "Honda Atlas", items: 14, value: 1284000, status: "In Transit", date: "21 Nov", eta: "23 Nov" },
  { id: "PO-2S-0144", supplier: "Honda Atlas", items: 9, value: 685000, status: "Approved", date: "20 Nov", eta: "25 Nov" },
  { id: "PO-3S-0290", supplier: "Metro Auto", items: 6, value: 214000, status: "Received", date: "18 Nov", eta: "Delivered" },
  { id: "PO-3S-0289", supplier: "Honda Atlas", items: 22, value: 2195000, status: "Partially Received", date: "16 Nov", eta: "24 Nov" },
  { id: "PO-2S-0143", supplier: "Lahore Lubricants", items: 4, value: 318000, status: "Received", date: "14 Nov", eta: "Delivered" },
];

export const partsMovement = [
  { day: "Mon", issued: 142, received: 86 },
  { day: "Tue", issued: 168, received: 120 },
  { day: "Wed", issued: 155, received: 64 },
  { day: "Thu", issued: 192, received: 148 },
  { day: "Fri", issued: 210, received: 96 },
  { day: "Sat", issued: 176, received: 52 },
  { day: "Sun", issued: 48, received: 0 },
];

export const corporateAccounts = [
  { company: "Meezan Bank Ltd.", contact: "Sohail Anwar", mou: "MOU-2025-014", expiry: "30 Jun 2027", credit: 5000000, used: 1840000, vehicles: 42, status: "Active", color: "emerald" },
  { company: "Packages Ltd.", contact: "Amna Shahid", mou: "MOU-2025-009", expiry: "05 Dec 2026", credit: 3500000, used: 2960000, vehicles: 28, status: "Renewal Due", color: "amber" },
  { company: "Fatima Group", contact: "Khurram Riaz", mou: "MOU-2025-021", expiry: "18 Aug 2027", credit: 2500000, used: 640000, vehicles: 16, status: "Active", color: "emerald" },
  { company: "Nishat Mills", contact: "Adeel Butt", mou: "MOU-2024-031", expiry: "31 Dec 2026", credit: 4000000, used: 3480000, vehicles: 33, status: "Active", color: "emerald" },
  { company: "Descon Engineering", contact: "Sara Ahmed", mou: "MOU-2025-018", expiry: "12 Jan 2027", credit: 1800000, used: 1720000, vehicles: 11, status: "Limit Alert", color: "red" },
  { company: "Engro Corporation", contact: "Hassan Raza", mou: "MOU-2026-002", expiry: "22 Mar 2028", credit: 6000000, used: 980000, vehicles: 19, status: "Active", color: "emerald" },
];

export const workOrders = [
  { id: "WO-3S-4412", company: "Meezan Bank", type: "Fleet service", vehicles: 8, amount: 486000, approvedBy: "Ahmed Raza", status: "In Progress", date: "21 Nov" },
  { id: "WO-2S-1187", company: "Packages Ltd.", type: "Periodic maintenance", vehicles: 5, amount: 218000, approvedBy: "Sohail Anwar", status: "Approved", date: "20 Nov" },
  { id: "WO-3S-4411", company: "Nishat Mills", type: "Repair — accident", vehicles: 2, amount: 342000, approvedBy: "Ahmed Raza", status: "Awaiting Approval", date: "20 Nov" },
  { id: "WO-3S-4410", company: "Descon Engineering", type: "Fleet service", vehicles: 6, amount: 396000, approvedBy: "Ahmed Raza", status: "Completed", date: "18 Nov" },
  { id: "WO-2S-1186", company: "Fatima Group", type: "Brake & suspension", vehicles: 3, amount: 174000, approvedBy: "Adeel Raza", status: "Completed", date: "17 Nov" },
  { id: "WO-3S-4409", company: "Engro Corporation", type: "Annual maintenance", vehicles: 9, amount: 612000, approvedBy: "Ahmed Raza", status: "In Progress", date: "16 Nov" },
];

export const corporateReceivables = [
  { month: "Jun", billed: 1.8, collected: 1.5 },
  { month: "Jul", billed: 2.1, collected: 1.7 },
  { month: "Aug", billed: 1.9, collected: 1.8 },
  { month: "Sep", billed: 2.4, collected: 1.9 },
  { month: "Oct", billed: 2.2, collected: 2.0 },
  { month: "Nov", billed: 2.6, collected: 2.1 },
];

export const accountsKpis = [
  { label: "Receivables", value: "PKR 1.24 Cr", sub: "PKR 18.6 Lac overdue", tone: "red" },
  { label: "Cash & Bank", value: "PKR 86.4 Lac", sub: "Across 3 accounts", tone: "green" },
  { label: "Payables", value: "PKR 62.8 Lac", sub: "14 open bills", tone: "amber" },
  { label: "Collection Rate", value: "91.2%", sub: "+2.4% vs last month", tone: "blue" },
];

export const invoices = [
  { id: "INV-3S-2294", customer: "Bilal Ahmed", type: "Service", amount: 28500, paid: 28500, status: "Paid", date: "21 Nov", branch: "3S Main" },
  { id: "INV-3S-2293", customer: "Meezan Bank Ltd.", type: "Corporate", amount: 486000, paid: 0, status: "Pending", date: "21 Nov", branch: "3S Main" },
  { id: "INV-2S-0871", customer: "Sana Malik", type: "Service", amount: 14200, paid: 14200, status: "Paid", date: "21 Nov", branch: "2S City" },
  { id: "INV-3S-2291", customer: "Packages Ltd.", type: "Corporate", amount: 425000, paid: 425000, status: "Paid", date: "20 Nov", branch: "3S Main" },
  { id: "INV-3S-2290", customer: "Omar Farooq", type: "Sales", amount: 6980000, paid: 2000000, status: "Partial", date: "19 Nov", branch: "3S Main" },
  { id: "INV-2S-0870", customer: "Faisal Nawaz", type: "Service", amount: 12750, paid: 0, status: "Overdue", date: "12 Nov", branch: "2S City" },
  { id: "INV-3S-2289", customer: "Nishat Mills", type: "Corporate", amount: 342000, paid: 0, status: "Pending", date: "19 Nov", branch: "3S Main" },
];

export const aging = [
  { bucket: "0–15 days", amount: 62.4, color: "#10B981" },
  { bucket: "16–30 days", amount: 28.8, color: "#3B82F6" },
  { bucket: "31–60 days", amount: 18.6, color: "#F59E0B" },
  { bucket: "61–90 days", amount: 9.2, color: "#F97316" },
  { bucket: "90+ days", amount: 5.0, color: "#E11D2E" },
];

export const cashflow = [
  { month: "Jun", inflow: 3.8, outflow: 2.9 },
  { month: "Jul", inflow: 4.2, outflow: 3.1 },
  { month: "Aug", inflow: 3.9, outflow: 3.4 },
  { month: "Sep", inflow: 4.8, outflow: 3.2 },
  { month: "Oct", inflow: 4.4, outflow: 3.5 },
  { month: "Nov", inflow: 5.1, outflow: 3.8 },
];

export const hrKpis = [
  { label: "Total Employees", value: "86", sub: "72 permanent · 14 contract", tone: "blue" },
  { label: "Present Today", value: "79", sub: "3 on leave · 4 absent", tone: "green" },
  { label: "Monthly Payroll", value: "PKR 1.14 Cr", sub: "November 2026", tone: "amber" },
  { label: "Open Positions", value: "5", sub: "2 technicians · 3 sales", tone: "red" },
];

export const employees = [
  { id: "EMP-001", name: "Ahmed Raza", designation: "Group Administrator", department: "Management", branch: "All", status: "Active", joined: "Jan 2019", salary: 350000 },
  { id: "EMP-014", name: "Usman Tariq", designation: "Senior Service Advisor", department: "Service", branch: "3S Main", status: "Active", joined: "Mar 2021", salary: 145000 },
  { id: "EMP-019", name: "Ayesha Khan", designation: "Service Advisor", department: "Service", branch: "3S Main", status: "Active", joined: "Aug 2022", salary: 110000 },
  { id: "EMP-027", name: "Adeel Raza", designation: "Service Advisor", department: "Service", branch: "2S City", status: "Active", joined: "Feb 2023", salary: 105000 },
  { id: "EMP-031", name: "Fahad Mirza", designation: "Sales Consultant", department: "Sales", branch: "3S Main", status: "Active", joined: "Jun 2020", salary: 125000 },
  { id: "EMP-044", name: "Imran Ali", designation: "Master Technician", department: "Service", branch: "3S Main", status: "Active", joined: "Nov 2018", salary: 135000 },
  { id: "EMP-052", name: "Naveed Anwar", designation: "Technician", department: "Service", branch: "2S City", status: "On Leave", joined: "Jul 2021", salary: 85000 },
  { id: "EMP-061", name: "Hira Sohail", designation: "Sales Consultant", department: "Sales", branch: "3S Main", status: "Active", joined: "Sep 2023", salary: 95000 },
  { id: "EMP-068", name: "Sajid Hussain", designation: "Parts Manager", department: "Parts", branch: "3S Main", status: "Active", joined: "Apr 2019", salary: 160000 },
  { id: "EMP-073", name: "Kashif Mehmood", designation: "Technician", department: "Service", branch: "2S City", status: "Active", joined: "Jan 2024", salary: 80000 },
];

export const leaveRequests = [
  { employee: "Naveed Anwar", type: "Annual Leave", from: "20 Nov", to: "23 Nov", days: 4, status: "Approved", approver: "Ahmed Raza" },
  { employee: "Ayesha Khan", type: "Sick Leave", from: "21 Nov", to: "21 Nov", days: 1, status: "Approved", approver: "Usman Tariq" },
  { employee: "Hira Sohail", type: "Casual Leave", from: "25 Nov", to: "26 Nov", days: 2, status: "Pending", approver: "—" },
  { employee: "Kashif Mehmood", type: "Annual Leave", from: "28 Nov", to: "02 Dec", days: 5, status: "Pending", approver: "—" },
];

export const attendanceTrend = [
  { week: "W1", present: 96, absent: 4 },
  { week: "W2", present: 94, absent: 6 },
  { week: "W3", present: 97, absent: 3 },
  { week: "W4", present: 92, absent: 8 },
];

export const departmentHeadcount = [
  { dept: "Service", count: 38, color: "#E11D2E" },
  { dept: "Sales", count: 16, color: "#3B82F6" },
  { dept: "Parts", count: 12, color: "#F59E0B" },
  { dept: "Accounts", count: 8, color: "#10B981" },
  { dept: "Admin & HR", count: 7, color: "#8B5CF6" },
  { dept: "Management", count: 5, color: "#64748B" },
];

export const leakageFlags = [
  { id: "LK-1024", type: "Discount without approval", ref: "JC-3S-0842", branch: "3S Main", amount: 4850, severity: "High", owner: "Usman Tariq", status: "Open", time: "Today 10:42" },
  { id: "LK-1023", type: "Parts issued without job card", ref: "STK-3S-0912", branch: "3S Main", amount: 12400, severity: "Critical", owner: "Sajid Hussain", status: "Open", time: "Today 09:18" },
  { id: "LK-1022", type: "Job closed without invoice", ref: "JC-2S-0304", branch: "2S City", amount: 18600, severity: "High", owner: "Adeel Raza", status: "Investigating", time: "Yesterday 17:05" },
  { id: "LK-1021", type: "Gate pass before payment", ref: "GP-3S-0778", branch: "3S Main", amount: 36800, severity: "Medium", owner: "Security Desk", status: "Resolved", time: "Yesterday 15:30" },
  { id: "LK-1020", type: "Below-cost parts sale", ref: "INV-2S-0868", branch: "2S City", amount: 9200, severity: "Critical", owner: "Sajid Hussain", status: "Resolved", time: "19 Nov 12:14" },
  { id: "LK-1019", type: "Rate card override", ref: "JC-3S-0831", branch: "3S Main", amount: 2200, severity: "Medium", owner: "Ayesha Khan", status: "Resolved", time: "18 Nov 16:48" },
];

export const reportKpis = [
  { label: "Gross Margin", value: "18.6%", sub: "+1.2 pts vs last month", tone: "green" },
  { label: "Revenue / Vehicle", value: "PKR 22.2 Lac", sub: "Sales + service + parts", tone: "blue" },
  { label: "Leakage Exposure", value: "PKR 4.8 Lac", sub: "6 open exceptions", tone: "red" },
  { label: "Repeat Customers", value: "64.2%", sub: "Last 12 months", tone: "amber" },
];

export const profitTrend = [
  { month: "Jun", revenue: 7.2, cost: 6.0, profit: 1.2 },
  { month: "Jul", revenue: 7.8, cost: 6.3, profit: 1.5 },
  { month: "Aug", revenue: 7.5, cost: 6.2, profit: 1.3 },
  { month: "Sep", revenue: 8.4, cost: 6.8, profit: 1.6 },
  { month: "Oct", revenue: 8.1, cost: 6.7, profit: 1.4 },
  { month: "Nov", revenue: 8.9, cost: 7.2, profit: 1.7 },
];

export const departmentRevenue = [
  { dept: "Sales", revenue: 5.9, margin: 12.4, color: "#3B82F6" },
  { dept: "Service", revenue: 1.7, margin: 38.2, color: "#E11D2E" },
  { dept: "Parts", revenue: 1.3, margin: 24.6, color: "#F59E0B" },
];

export const users = [
  { name: "Zeeshan Awan", email: "zeeshan@demohonda.pk", role: "Owner / Group Administrator", branch: "All Branches", status: "Active", lastLogin: "Today, 08:42", twoFA: true },
  { name: "Usman Tariq", email: "usman@demohonda.pk", role: "Branch Manager", branch: "3S Main", status: "Active", lastLogin: "Today, 09:05", twoFA: true },
  { name: "Adeel Raza", email: "adeel@demohonda.pk", role: "Service Advisor", branch: "2S City", status: "Active", lastLogin: "Today, 08:58", twoFA: false },
  { name: "Ayesha Khan", email: "ayesha@demohonda.pk", role: "Service Advisor", branch: "3S Main", status: "Active", lastLogin: "Today, 09:12", twoFA: false },
  { name: "Sajid Hussain", email: "sajid@demohonda.pk", role: "Parts Manager", branch: "3S Main", status: "Active", lastLogin: "Yesterday, 18:20", twoFA: true },
  { name: "Fahad Mirza", email: "fahad@demohonda.pk", role: "Sales Consultant", branch: "3S Main", status: "Active", lastLogin: "Today, 09:30", twoFA: false },
  { name: "Hira Sohail", email: "hira@demohonda.pk", role: "Sales Consultant", branch: "3S Main", status: "Invited", lastLogin: "—", twoFA: false },
  { name: "Adeel Butt", email: "auditor@demohonda.pk", role: "Auditor (read-only)", branch: "All Branches", status: "Active", lastLogin: "19 Nov, 14:05", twoFA: true },
];

export const roles = [
  { name: "Group Administrator", users: 1, permissions: "Full access", scope: "All branches" },
  { name: "Branch Manager", users: 2, permissions: "Operations + approvals", scope: "Assigned branch" },
  { name: "Service Advisor", users: 6, permissions: "Job cards, estimates", scope: "Assigned branch" },
  { name: "Parts Manager", users: 2, permissions: "Stock, PO, GRN", scope: "Assigned branch" },
  { name: "Sales Consultant", users: 4, permissions: "Leads, bookings", scope: "3S only" },
  { name: "Cashier", users: 3, permissions: "Invoices, receipts", scope: "Assigned branch" },
  { name: "Auditor", users: 1, permissions: "Read-only + audit log", scope: "All branches" },
];

export const auditLog = [
  { user: "Usman Tariq", action: "Requested discount approval", entity: "JC-3S-0842", ip: "10.0.12.41", time: "21 Nov 10:42" },
  { user: "Ahmed Raza", action: "Approved discount 8.5%", entity: "JC-3S-0839", ip: "10.0.12.08", time: "21 Nov 10:18" },
  { user: "Sajid Hussain", action: "Created purchase order", entity: "PO-3S-0291", ip: "10.0.12.33", time: "21 Nov 09:55" },
  { user: "Adeel Raza", action: "Closed job card", entity: "JC-2S-0308", ip: "10.0.13.12", time: "21 Nov 09:22" },
  { user: "Ahmed Raza", action: "Updated approval limit", entity: "Role: Branch Manager", ip: "10.0.12.08", time: "20 Nov 17:40" },
  { user: "Ayesha Khan", action: "Printed job card", entity: "JC-3S-0843", ip: "10.0.12.27", time: "20 Nov 16:12" },
];

export const customers = [
  { id: "CUS-001", name: "Bilal Ahmed", type: "Individual", phone: "0300-4821901", cnic: "35201-1234567-1", city: "Lahore", branch: "3S Main", vehicles: 2, creditTerms: "Cash", status: "Active" },
  { id: "CUS-002", name: "Meezan Bank Ltd.", type: "Corporate", phone: "042-35781000", cnic: "NTN 1234567-8", city: "Lahore", branch: "All", vehicles: 42, creditTerms: "45 days", status: "Active" },
  { id: "CUS-003", name: "Sana Malik", type: "Individual", phone: "0321-1180442", cnic: "35202-9876543-2", city: "Lahore", branch: "2S City", vehicles: 1, creditTerms: "Cash", status: "Active" },
  { id: "CUS-004", name: "Packages Ltd.", type: "Corporate", phone: "042-37501234", cnic: "NTN 8765432-1", city: "Lahore", branch: "All", vehicles: 28, creditTerms: "30 days", status: "Active" },
  { id: "CUS-005", name: "Hamza Sheikh", type: "Individual", phone: "0333-9077123", cnic: "35203-5566778-9", city: "Lahore", branch: "3S Main", vehicles: 1, creditTerms: "Cash", status: "Active" },
  { id: "CUS-006", name: "Faisal Nawaz", type: "Individual", phone: "0345-5566789", cnic: "35204-2233445-6", city: "Lahore", branch: "2S City", vehicles: 1, creditTerms: "Cash", status: "Active" },
  { id: "CUS-007", name: "Nishat Mills", type: "Corporate", phone: "042-36509999", cnic: "NTN 3344556-7", city: "Lahore", branch: "All", vehicles: 33, creditTerms: "60 days", status: "Active" },
  { id: "CUS-008", name: "Mariam Javed", type: "Individual", phone: "0301-0019234", cnic: "35205-7788990-1", city: "Lahore", branch: "3S Main", vehicles: 1, creditTerms: "Cash", status: "Active" },
];

export const vehicles = [
  { vin: "HND-CIV-2022-004821", reg: "LEB-4821", make: "Honda", model: "Civic", variant: "1.5T RS", year: 2022, color: "Pearl White", owner: "Bilal Ahmed", warranty: "Sep 2027", odometer: 18420, branchHistory: "Sold 3S Main · Serviced 3S/2S" },
  { vin: "HND-CITY-2021-01180", reg: "LEC-1180", make: "Honda", model: "City", variant: "1.5 CVT", year: 2021, color: "Taffeta White", owner: "Sana Malik", warranty: "Expired", odometer: 42110, branchHistory: "Serviced 2S City" },
  { vin: "HND-BRV-2023-09077", reg: "LEA-9077", make: "Honda", model: "BR-V", variant: "S", year: 2023, color: "Lunar Silver", owner: "Hamza Sheikh", warranty: "Mar 2028", odometer: 12880, branchHistory: "Sold 3S Main" },
  { vin: "HND-HRV-2022-5566", reg: "LES-5566", make: "Honda", model: "HR-V", variant: "VTi", year: 2022, color: "Crystal Red", owner: "Faisal Nawaz", warranty: "Expired", odometer: 31500, branchHistory: "Serviced 2S City" },
  { vin: "HND-CIV-2024-00019", reg: "LEB-0019", make: "Honda", model: "Civic", variant: "Oriel", year: 2024, color: "Crystal Black", owner: "Mariam Javed", warranty: "Nov 2029", odometer: 4120, branchHistory: "Sold 3S Main" },
];

export const customerHistory = [
  { customer: "Bilal Ahmed", type: "Job card", ref: "JC-3S-0842", branch: "3S Main", date: "21 Nov", amount: 28500, status: "In Progress" },
  { customer: "Bilal Ahmed", type: "Invoice", ref: "INV-3S-2294", branch: "3S Main", date: "21 Nov", amount: 28500, status: "Paid" },
  { customer: "Meezan Bank Ltd.", type: "Work order", ref: "WO-3S-4412", branch: "3S Main", date: "21 Nov", amount: 486000, status: "In Progress" },
  { customer: "Sana Malik", type: "Job card", ref: "JC-2S-0311", branch: "2S City", date: "21 Nov", amount: 14200, status: "In Progress" },
];

export const duplicateCandidates = [
  { recordA: "Bilal Ahmed · 0300-4821901", recordB: "Bilal A. · 0300-4821901", match: "Phone + name", confidence: "96%", action: "Merge" },
  { recordA: "Honda Civic · LEB-4821", recordB: "Civic 2022 · LEB-4821", match: "Registration", confidence: "100%", action: "Merge" },
  { recordA: "Packages Ltd · NTN 8765432-1", recordB: "Packages Limited · NTN 8765432-1", match: "NTN", confidence: "98%", action: "Review" },
];

export const serviceAppointments = [
  { id: "APT-3S-0184", customer: "Bilal Ahmed", vehicle: "Civic 2022", date: "21 Nov", kmDue: 10000, type: "Periodic service", advisor: "Usman Tariq", status: "Checked-in" },
  { id: "APT-2S-0091", customer: "Sana Malik", vehicle: "City 2021", date: "21 Nov", kmDue: 45000, type: "AC performance", advisor: "Adeel Raza", status: "In Progress" },
  { id: "APT-3S-0185", customer: "Hamza Sheikh", vehicle: "BR-V 2023", date: "21 Nov", kmDue: 15000, type: "Periodic service", advisor: "Usman Tariq", status: "Waiting" },
  { id: "APT-3S-0186", customer: "Mariam Javed", vehicle: "Civic 2024", date: "21 Nov", kmDue: 1000, type: "First free service", advisor: "Ayesha Khan", status: "Confirmed" },
];

export const preInspections = [
  { id: "PI-3S-0842", job: "JC-3S-0842", odometer: 18420, fuel: "3/4", valuables: "Phone charger", photos: 6, notes: "Front bumper scratch noted" },
  { id: "PI-3S-0843", job: "JC-3S-0843", odometer: 4120, fuel: "Full", valuables: "None", photos: 4, notes: "New vehicle delivery inspection" },
  { id: "PI-2S-0311", job: "JC-2S-0311", odometer: 42110, fuel: "1/2", valuables: "Sunglasses", photos: 5, notes: "AC noise reported" },
];

export const estimates = [
  { id: "EST-3S-0842", job: "JC-3S-0842", labour: 9500, parts: 14200, consumables: 2800, sublet: 0, total: 26500, approval: "Pending" },
  { id: "EST-3S-0839", job: "JC-3S-0839", labour: 12000, parts: 31200, consumables: 4500, sublet: 6500, total: 54200, approval: "Approved" },
  { id: "EST-2S-0311", job: "JC-2S-0311", labour: 6000, parts: 6200, consumables: 1200, sublet: 800, total: 14200, approval: "Approved" },
];

export const technicianProductivity = [
  { name: "Imran Ali", jobs: 14, hours: 96, efficiency: "92%", branch: "3S Main" },
  { name: "Shahid Iqbal", jobs: 11, hours: 84, efficiency: "88%", branch: "3S Main" },
  { name: "Naveed Anwar", jobs: 9, hours: 72, efficiency: "85%", branch: "2S City" },
  { name: "Kashif Mehmood", jobs: 7, hours: 58, efficiency: "81%", branch: "2S City" },
];

export const qualityChecks = [
  { id: "QC-3S-0840", job: "JC-3S-0840", checklist: "18/18", result: "Passed", inspector: "Usman Tariq", rework: "No" },
  { id: "QC-3S-0838", job: "JC-3S-0838", checklist: "16/18", result: "Passed with note", inspector: "Ayesha Khan", rework: "No" },
  { id: "QC-2S-0310", job: "JC-2S-0310", checklist: "17/18", result: "Passed", inspector: "Adeel Raza", rework: "No" },
];

export const gatePasses = [
  { id: "GP-3S-0779", job: "JC-3S-0840", invoice: "INV-3S-2295", payment: "Paid", status: "Released" },
  { id: "GP-3S-0778", job: "JC-3S-0838", invoice: "INV-3S-2296", payment: "Pending", status: "Hold" },
  { id: "GP-2S-0412", job: "JC-2S-0310", invoice: "INV-2S-0872", payment: "Paid", status: "Released" },
];

export const warrantyClaims = [
  { id: "WC-3S-012", job: "JC-3S-0831", part: "AC compressor", claimNo: "HON-WC-441", status: "Submitted" },
  { id: "WC-2S-004", job: "JC-2S-0302", part: "Transmission sensor", claimNo: "HON-WC-442", status: "Approved" },
];

export const serviceFeedback = [
  { id: "FB-3S-0840", customer: "Hamza Sheikh", rating: 5, comments: "Excellent service", followUp: "None" },
  { id: "FB-2S-0310", customer: "Faisal Nawaz", rating: 4, comments: "Good, slight delay", followUp: "Manager call" },
  { id: "FB-3S-0838", customer: "Nida Aslam", rating: 3, comments: "Battery replacement took longer", followUp: "Service advisor call" },
];

export const leads = [
  { id: "LEAD-3S-441", customer: "Ali Hassan", source: "Walk-in", interest: "Civic RS Turbo", assigned: "Fahad Mirza", status: "Negotiation", nextAction: "Offer finance" },
  { id: "LEAD-3S-442", customer: "Fatima Zahra", source: "Website", interest: "City 1.5 CVT", assigned: "Hira Sohail", status: "Test Drive", nextAction: "Follow-up call" },
  { id: "LEAD-3S-443", customer: "Omar Farooq", source: "Referral", interest: "HR-V VTi", assigned: "Fahad Mirza", status: "Booked", nextAction: "Delivery planning" },
  { id: "LEAD-3S-444", customer: "Mehwish Iqbal", source: "Facebook", interest: "BR-V S", assigned: "Hira Sohail", status: "Contacted", nextAction: "Send quotation" },
];

export const testDrives = [
  { id: "TD-3S-221", customer: "Fatima Zahra", vehicle: "City 1.5 CVT", date: "20 Nov", odometer: "12 km", feedback: "Positive", consultant: "Hira Sohail" },
  { id: "TD-3S-222", customer: "Ali Hassan", vehicle: "Civic RS Turbo", date: "19 Nov", odometer: "18 km", feedback: "Very positive", consultant: "Fahad Mirza" },
  { id: "TD-3S-223", customer: "Taimoor Khan", vehicle: "Civic Oriel", date: "18 Nov", odometer: "9 km", feedback: "Price concern", consultant: "Bilal Rana" },
];

export const quotations = [
  { id: "QTN-3S-318", customer: "Ali Hassan", model: "Civic RS Turbo", amount: 8420000, validity: "30 Nov", status: "Sent" },
  { id: "QTN-3S-319", customer: "Fatima Zahra", model: "City 1.5 CVT", amount: 5090000, validity: "28 Nov", status: "Accepted" },
  { id: "QTN-3S-320", customer: "Mehwish Iqbal", model: "BR-V S", amount: 5820000, validity: "02 Dec", status: "Draft" },
];

export const pdiDeliveries = [
  { id: "PDI-3S-119", booking: "BKG-3S-1284", pdi: "Passed", deliveryDate: "20 Nov", gatePass: "GP-3S-0780", status: "Delivered" },
  { id: "PDI-3S-120", booking: "BKG-3S-1285", pdi: "Passed", deliveryDate: "22 Nov", gatePass: "Pending", status: "Ready" },
  { id: "PDI-3S-121", booking: "BKG-3S-1286", pdi: "In progress", deliveryDate: "24 Nov", gatePass: "Pending", status: "PDI" },
];

export const exchanges = [
  { id: "EX-3S-044", customer: "Omar Farooq", offered: "City 2018", evaluated: 2450000, status: "Approved" },
  { id: "EX-3S-045", customer: "Taimoor Khan", offered: "Cultus 2019", evaluated: 1980000, status: "Pending" },
];

export const partCompatibility = [
  { part: "Oil Filter — Civic 1.5T", models: "Civic 1.5T, Civic RS", supersession: "HON-OF-15T → HON-OF-15T-R2", status: "Active" },
  { part: "Brake Pad Set — City", models: "City 1.2, City 1.5", supersession: "HON-BP-CITY → HON-BP-CITY-NEW", status: "Active" },
  { part: "Air Filter — BR-V", models: "BR-V S, BR-V i-VTEC", supersession: "HON-AF-BRV", status: "Active" },
];

export const grns = [
  { id: "GRN-3S-014", po: "PO-3S-0291", supplier: "Honda Atlas", items: 14, received: "21 Nov", status: "Received" },
  { id: "GRN-3S-015", po: "PO-3S-0289", supplier: "Honda Atlas", items: 22, received: "18 Nov", status: "Partial" },
  { id: "GRN-2S-009", po: "PO-2S-0144", supplier: "Honda Atlas", items: 9, received: "20 Nov", status: "Received" },
];

export const stockTransfers = [
  { id: "ST-3S-2S-014", from: "3S Main", to: "2S City", items: 6, status: "In transit", dispatch: "21 Nov", receive: "Pending" },
  { id: "ST-2S-3S-009", from: "2S City", to: "3S Main", items: 3, status: "Received", dispatch: "19 Nov", receive: "20 Nov" },
];

export const stockTakes = [
  { id: "STK-3S-018", branch: "3S Main", date: "15 Nov", variance: "PKR 18,400", status: "Approved" },
  { id: "STK-2S-007", branch: "2S City", date: "14 Nov", variance: "PKR 6,200", status: "Pending approval" },
];

export const priceLists = [
  { branch: "3S Main", part: "Engine Oil 0W-20 (4L)", cost: 9200, retail: 11400, effective: "01 Nov 2026" },
  { branch: "2S City", part: "Engine Oil 0W-20 (4L)", cost: 9200, retail: 11600, effective: "01 Nov 2026" },
  { branch: "3S Main", part: "Brake Pad Set — City", cost: 7800, retail: 9800, effective: "01 Nov 2026" },
];

export const mouRates = [
  { company: "Meezan Bank Ltd.", labourRate: "PKR 2,400/hr", partsDiscount: "12%", creditTerms: "45 days", status: "Active" },
  { company: "Packages Ltd.", labourRate: "PKR 2,200/hr", partsDiscount: "10%", creditTerms: "30 days", status: "Renewal due" },
  { company: "Nishat Mills", labourRate: "PKR 2,300/hr", partsDiscount: "8%", creditTerms: "60 days", status: "Active" },
];

export const workOrderItems = [
  { id: "WOI-3S-4412-1", wo: "WO-3S-4412", vehicle: "Civic 2022", service: "Fleet service", amount: 62000, status: "In progress" },
  { id: "WOI-3S-4412-2", wo: "WO-3S-4412", vehicle: "City 2021", service: "Periodic maintenance", amount: 48000, status: "Completed" },
  { id: "WOI-2S-1187-1", wo: "WO-2S-1187", vehicle: "BR-V 2023", service: "Periodic maintenance", amount: 44000, status: "Approved" },
];

export const corporateStatements = [
  { company: "Meezan Bank Ltd.", billed: 1840000, collected: 1200000, balance: 640000, aging: "0-15 days" },
  { company: "Packages Ltd.", billed: 2960000, collected: 2100000, balance: 860000, aging: "16-30 days" },
  { company: "Descon Engineering", billed: 1720000, collected: 1500000, balance: 220000, aging: "0-15 days" },
];

export const receipts = [
  { id: "RCPT-3S-0912", customer: "Bilal Ahmed", method: "Cash", amount: 28500, date: "21 Nov", status: "Posted" },
  { id: "RCPT-3S-0911", customer: "Packages Ltd.", method: "Bank", amount: 425000, date: "20 Nov", status: "Posted" },
  { id: "RCPT-2S-0318", customer: "Sana Malik", method: "Card", amount: 14200, date: "21 Nov", status: "Posted" },
];

export const paymentAllocations = [
  { receipt: "RCPT-3S-0911", invoices: "INV-3S-2291", amount: 425000, status: "Allocated" },
  { receipt: "RCPT-3S-0912", invoices: "INV-3S-2294", amount: 28500, status: "Allocated" },
];

export const creditNotes = [
  { id: "CN-3S-004", invoice: "INV-3S-2288", reason: "Parts warranty adjustment", amount: 9200, approval: "Approved" },
  { id: "CN-2S-002", invoice: "INV-2S-0865", reason: "Service rework", amount: 4800, approval: "Pending" },
];

export const reminderLog = [
  { customer: "Faisal Nawaz", channel: "WhatsApp", date: "21 Nov", status: "Sent" },
  { customer: "Packages Ltd.", channel: "Email", date: "20 Nov", status: "Sent" },
  { customer: "Descon Engineering", channel: "SMS", date: "19 Nov", status: "Failed" },
];

export const promiseToPay = [
  { customer: "Omar Farooq", amount: 2000000, promiseDate: "25 Nov", owner: "Fahad Mirza", status: "Open" },
  { customer: "Nishat Mills", amount: 342000, promiseDate: "23 Nov", owner: "Ahmed Raza", status: "Open" },
];

export const cashierReconciliation = [
  { branch: "3S Main", cash: 486000, bank: 1284000, variance: 0, status: "Balanced" },
  { branch: "2S City", cash: 142000, bank: 318000, variance: 2400, status: "Variance" },
];

export const documentVault = [
  { id: "DOC-001", name: "Meezan Bank MOU 2025", type: "MOU", branch: "All", uploadedBy: "Ahmed Raza", hash: "sha256:8f3a..." },
  { id: "DOC-002", name: "Signed Job Card JC-3S-0842", type: "Job card", branch: "3S Main", uploadedBy: "Ayesha Khan", hash: "sha256:9c12..." },
  { id: "DOC-003", name: "Gate Pass GP-3S-0778", type: "Gate pass", branch: "3S Main", uploadedBy: "Security Desk", hash: "sha256:11ab..." },
];

export const notificationTemplates = [
  { name: "Payment reminder", channel: "WhatsApp", template: "Dear {{customer}}, invoice {{invoice}} of PKR {{amount}} is due." },
  { name: "Service due", channel: "SMS", template: "Your Honda {{model}} is due for service at {{km}} km." },
  { name: "Job card update", channel: "WhatsApp", template: "Your job card {{job}} is now {{status}}." },
];

export const jobQueue = [
  { job: "Reminder batch", status: "Completed", retries: 0, lastRun: "Today 08:00" },
  { job: "Aging snapshot", status: "Completed", retries: 0, lastRun: "Today 02:00" },
  { job: "Leakage report", status: "Completed", retries: 0, lastRun: "Today 06:00" },
  { job: "WhatsApp retry", status: "Running", retries: 2, lastRun: "Today 10:15" },
];

export const approvalRequests = [
  { id: "APR-1042", type: "Discount approval", requestedBy: "Usman Tariq", amount: 4850, status: "Pending" },
  { id: "APR-1041", type: "Below-cost sale", requestedBy: "Adeel Raza", amount: 9200, status: "Approved" },
  { id: "APR-1040", type: "Stock adjustment", requestedBy: "Sajid Hussain", amount: 12400, status: "Pending" },
  { id: "APR-1039", type: "Invoice void", requestedBy: "Ayesha Khan", amount: 12750, status: "Rejected" },
];

export const stockAging = [
  { part: "Spark Plug — Iridium", age: "0-30 days", qty: 48, value: 88800, status: "Healthy" },
  { part: "Cabin Air Filter — Civic", age: "31-60 days", qty: 19, value: 79800, status: "Watch" },
  { part: "Headlight Bulb LED", age: "61-90 days", qty: 8, value: 66400, status: "Slow" },
  { part: "Wiper Blade 26\"", age: "90+ days", qty: 4, value: 14600, status: "Dead stock" },
];

export const stockReturns = [
  { id: "RTN-3S-014", part: "Oil Filter — Civic 1.5T", qty: 3, reason: "Defective", supplier: "Honda Atlas", status: "Approved" },
  { id: "RTN-2S-006", part: "Brake Pad Set — City", qty: 2, reason: "Wrong fitment", supplier: "Honda Atlas", status: "Pending" },
];

export const stockAdjustments = [
  { id: "ADJ-3S-021", part: "Engine Oil 0W-20 (4L)", qty: -2, reason: "Spillage", approvedBy: "Branch Manager", status: "Approved" },
  { id: "ADJ-2S-009", part: "Wiper Blade 26\"", qty: -1, reason: "Damaged", approvedBy: "Pending", status: "Pending" },
];

export const reorderSuggestions = [
  { part: "Engine Oil 0W-20 (4L)", stock: 12, min: 40, suggestedQty: 30, supplier: "Honda Atlas" },
  { part: "Brake Pad Set — City", stock: 3, min: 20, suggestedQty: 20, supplier: "Honda Atlas" },
  { part: "CVT Fluid (3.5L)", stock: 9, min: 24, suggestedQty: 15, supplier: "Honda Atlas" },
];

export const serviceComplaints = [
  { job: "JC-3S-0842", complaint: "Engine noise at cold start", finding: "Timing chain tensioner worn", technician: "Imran Ali" },
  { job: "JC-2S-0311", complaint: "AC not cooling", finding: "Compressor clutch faulty", technician: "Naveed Anwar" },
  { job: "JC-3S-0839", complaint: "Suspension noise", finding: "Front strut mount worn", technician: "Shahid Iqbal" },
];

export const technicianTime = [
  { technician: "Imran Ali", job: "JC-3S-0842", operation: "Engine diagnosis", hours: 1.5, status: "Logged" },
  { technician: "Shahid Iqbal", job: "JC-3S-0839", operation: "Suspension repair", hours: 2.2, status: "Logged" },
  { technician: "Naveed Anwar", job: "JC-2S-0311", operation: "AC service", hours: 1.1, status: "Logged" },
];

export const reworkTracking = [
  { job: "JC-3S-0831", issue: "Brake noise returned", reworkBy: "Imran Ali", status: "Open" },
  { job: "JC-2S-0302", issue: "AC leak after service", reworkBy: "Naveed Anwar", status: "Closed" },
];

export const taxInvoices = [
  { invoice: "INV-3S-2294", fbrRef: "FBR-2026-88421", qr: "Verified", status: "Validated" },
  { invoice: "INV-2S-0871", fbrRef: "FBR-2026-88422", qr: "Verified", status: "Validated" },
  { invoice: "INV-3S-2290", fbrRef: "Pending", qr: "Not generated", status: "Pending" },
];

export const paymentMethods = [
  { method: "Cash", branch: "3S Main", count: 18, amount: 486000 },
  { method: "Bank", branch: "3S Main", count: 9, amount: 1284000 },
  { method: "Card", branch: "2S City", count: 4, amount: 56800 },
  { method: "Online", branch: "All", count: 6, amount: 318000 },
];

export const salesTargets = [
  { consultant: "Fahad Mirza", target: 12, achieved: 10, incentive: 185000 },
  { consultant: "Hira Sohail", target: 10, achieved: 9, incentive: 142000 },
  { consultant: "Bilal Rana", target: 8, achieved: 5, incentive: 74000 },
];

export const featureFlags = [
  { branch: "3S Main", feature: "Sales module", enabled: true },
  { branch: "3S Main", feature: "Corporate MOU", enabled: true },
  { branch: "2S City", feature: "Sales module", enabled: false },
  { branch: "2S City", feature: "Inter-branch transfer", enabled: true },
];

export const auditChanges = [
  { entity: "Price list", before: "PKR 11,200", after: "PKR 11,400", changedBy: "Ahmed Raza", date: "20 Nov" },
  { entity: "Approval limit", before: "3%", after: "5%", changedBy: "Ahmed Raza", date: "19 Nov" },
  { entity: "Discount", before: "0%", after: "8.5%", changedBy: "Usman Tariq", date: "21 Nov" },
];

export const wheelAlignmentJobs = [
  { id: "WA-3S-001", customer: "Bilal Ahmed", vehicle: "Civic 2022", profile: "Premium service profile", alignment: "Front + rear", amount: 6500, status: "Completed" },
  { id: "WA-2S-004", customer: "Faisal Nawaz", vehicle: "HR-V 2022", profile: "City drive profile", alignment: "Front only", amount: 4200, status: "In progress" },
];

export const serviceCustomerProfiles = [
  { customer: "Bilal Ahmed", vehicle: "Civic 2022", preferredAdvisor: "Usman Tariq", serviceHistory: 6, creditStatus: "Clear", lastVisit: "21 Nov" },
  { customer: "Sana Malik", vehicle: "City 2021", preferredAdvisor: "Adeel Raza", serviceHistory: 4, creditStatus: "Clear", lastVisit: "21 Nov" },
];

export const servicePayments = [
  { id: "PAY-3S-041", invoice: "INV-3S-2294", method: "Cash", amount: 28500, receivedBy: "Cashier", status: "Posted" },
  { id: "PAY-3S-042", invoice: "INV-3S-2290", method: "Card", amount: 2000000, receivedBy: "Cashier", status: "Posted" },
  { id: "PAY-2S-018", invoice: "INV-2S-0871", method: "Card", amount: 14200, receivedBy: "Cashier", status: "Posted" },
];

export const vehicleInOut = [
  { id: "IO-3S-088", vehicle: "Civic 2022", inTime: "09:15", outTime: "12:40", gatePass: "GP-3S-0779", status: "Released" },
  { id: "IO-2S-031", vehicle: "City 2021", inTime: "10:00", outTime: "Pending", gatePass: "Hold", status: "In workshop" },
];

export const salesCustomerProfiles = [
  { customer: "Ali Hassan", model: "Civic RS Turbo", consultant: "Fahad Mirza", finance: "Bank Alfalah", status: "Delivered" },
  { customer: "Fatima Zahra", model: "City 1.5 CVT", consultant: "Hira Sohail", finance: "Meezan Bank", status: "Financing" },
  { customer: "Omar Farooq", model: "HR-V VTi", consultant: "Fahad Mirza", finance: "Cash", status: "Booked" },
];

export const salesPayments = [
  { id: "SPAY-3S-014", booking: "BKG-3S-1284", method: "Bank", amount: 8320000, status: "Received" },
  { id: "SPAY-3S-015", booking: "BKG-3S-1285", method: "Finance", amount: 2000000, status: "Partial" },
];

export const staffAttendance = [
  { employee: "Imran Ali", date: "21 Nov", checkIn: "08:02", checkOut: "17:15", status: "Present" },
  { employee: "Ayesha Khan", date: "21 Nov", checkIn: "08:10", checkOut: "17:05", status: "Present" },
  { employee: "Naveed Anwar", date: "21 Nov", checkIn: "—", checkOut: "—", status: "On leave" },
  { employee: "Kashif Mehmood", date: "21 Nov", checkIn: "08:25", checkOut: "17:20", status: "Present" },
];

export const monthlySalary = [
  { employee: "Imran Ali", basic: 135000, allowance: 12000, deduction: 4500, net: 142500, status: "Paid" },
  { employee: "Ayesha Khan", basic: 110000, allowance: 9000, deduction: 3200, net: 115800, status: "Paid" },
  { employee: "Naveed Anwar", basic: 85000, allowance: 7000, deduction: 2100, net: 89900, status: "Pending" },
];

export const staffCreditReference = [
  { employee: "Imran Ali", creditLimit: 50000, used: 12000, reference: "EMP-044 / CNIC 35201-...", days: 30, status: "Clear" },
  { employee: "Ayesha Khan", creditLimit: 35000, used: 0, reference: "EMP-019 / CNIC 35202-...", days: 15, status: "Clear" },
  { employee: "Naveed Anwar", creditLimit: 25000, used: 8000, reference: "EMP-052 / CNIC 35203-...", days: 45, status: "Overdue" },
];

export const serviceSalesAccounts = [
  { account: "Service revenue", branch: "3S Main", cash: 486000, bank: 1284000, credit: 640000, status: "Open" },
  { account: "Sales revenue", branch: "3S Main", cash: 2000000, bank: 4820000, credit: 1200000, status: "Open" },
  { account: "Service revenue", branch: "2S City", cash: 142000, bank: 318000, credit: 220000, status: "Open" },
];

export const cashBankPayOrder = [
  { id: "TXN-001", type: "Cash in", amount: 486000, bank: "HBL", method: "Cash", reference: "Day-end", days: 0 },
  { id: "TXN-002", type: "Bank deposit", amount: 1284000, bank: "HBL", method: "Bank", reference: "PO-3S-0291", days: 1 },
  { id: "TXN-003", type: "Pay order", amount: 425000, bank: "Meezan", method: "Pay order", reference: "MOU-2025-014", days: 2 },
  { id: "TXN-004", type: "Credit", amount: 640000, bank: "—", method: "Credit", reference: "INV-3S-2293", days: 45 },
];

export const corporateMouLetters = [
  { company: "Meezan Bank Ltd.", mouLetter: "MOU-2025-014", requirements: "Fleet service, 42 vehicles, 45-day credit", workOrder: "WO-3S-4412", attachment: "MOU scan + WO PDF", status: "Active" },
  { company: "Packages Ltd.", mouLetter: "MOU-2025-009", requirements: "Periodic maintenance, 28 vehicles, 30-day credit", workOrder: "WO-2S-1187", attachment: "MOU scan + WO PDF", status: "Renewal due" },
];

export const corporateCarInOut = [
  { company: "Meezan Bank Ltd.", vehicle: "Civic 2022", inTime: "09:00", outTime: "12:30", workOrder: "WO-3S-4412", status: "Released" },
  { company: "Packages Ltd.", vehicle: "BR-V 2023", inTime: "10:15", outTime: "Pending", workOrder: "WO-2S-1187", status: "In workshop" },
];

export const autoInvoices = [
  { invoice: "INV-3S-2297", customer: "Meezan Bank Ltd.", amount: 486000, generated: "Auto on job close", whatsapp: "Sent", status: "Posted" },
  { invoice: "INV-2S-0873", customer: "Packages Ltd.", amount: 218000, generated: "Auto on job close", whatsapp: "Sent", status: "Posted" },
  { invoice: "INV-3S-2298", customer: "Bilal Ahmed", amount: 28500, generated: "Auto on payment", whatsapp: "Pending", status: "Draft" },
];

export const departmentAccounts = [
  { account: "HR Department", user: "hr@demohonda.pk", role: "HR Manager", features: "Attendance, payroll, leave, employees", status: "Active" },
  { account: "Service Department", user: "service@demohonda.pk", role: "Service Manager", features: "Job cards, estimates, QC, gate pass", status: "Active" },
  { account: "Accounts Department", user: "accounts@demohonda.pk", role: "Accounts Manager", features: "Invoices, receipts, receivables", status: "Active" },
];

export const accountApprovalRequests = [
  { id: "ACC-APR-014", account: "HR Department", requestedBy: "Zeeshan Awan", approvedBy: "Zeeshan Awan", status: "Approved", features: "Attendance, payroll, leave, employees", date: "21 Nov" },
  { id: "ACC-APR-013", account: "Service Department", requestedBy: "Zeeshan Awan", approvedBy: "Zeeshan Awan", status: "Approved", features: "Job cards, estimates, QC, gate pass", date: "20 Nov" },
  { id: "ACC-APR-012", account: "Accounts Department", requestedBy: "Zeeshan Awan", approvedBy: "Pending", status: "Pending", features: "Invoices, receipts, receivables", date: "21 Nov" },
];

export const integrations = [
  { name: "Honda Atlas", type: "Parts & warranty", status: "Connected", lastSync: "Today, 07:00", tone: "green" },
  { name: "FBR e-Invoicing", type: "Tax", status: "Connected", lastSync: "Today, 09:30", tone: "green" },
  { name: "WhatsApp Business", type: "Customer reminders", status: "Connected", lastSync: "2 min ago", tone: "green" },
  { name: "Bank Alfalah", type: "Payments", status: "Action Required", lastSync: "Yesterday, 18:00", tone: "amber" },
  { name: "SMS Gateway", type: "Notifications", status: "Connected", lastSync: "5 min ago", tone: "green" },
  { name: "Cloudflare R2", type: "Document storage", status: "Connected", lastSync: "Continuous", tone: "green" },
];
export const serviceJobWorkflow = [
  { id: "JC-3S-0849", plate: "LEB-4821", chassis: "MRHBF1660NP123456", engine: "L15B7-1234567", customer: "Bilal Ahmed", cnic: "35202-1234567-1", testDriveRef: "TD-3S-118", advisor: "Usman Tariq", pit: "Pit 03", inTime: "09:12", outTime: "10:02", estimatedMinutes: 30, accumulatedMinutes: 45, status: "In progress", cashGiven: 15000, cashMade: 28500, breakService: "Brake pad replacement", breakLeather: "Driver seat leather repair", thanksMessage: "Thanks for choosing Honda 3S Main", croReminder: "Service reminder in 2 days", jobType: "Mechanical", billingType: "Corporate", cashBill: 0, creditBill: 0, corporateBill: 28500, insuranceBill: 0 },
  { id: "JC-3S-0850", plate: "LEC-1180", chassis: "MRHBF1660NP654321", engine: "L15B7-7654321", customer: "Sana Malik", cnic: "35201-9876543-2", testDriveRef: "TD-3S-119", advisor: "Ayesha Khan", pit: "Pit 01", inTime: "10:05", outTime: "10:40", estimatedMinutes: 20, accumulatedMinutes: 20, status: "Ready", cashGiven: 8000, cashMade: 14200, breakService: "AC performance check", breakLeather: "None", thanksMessage: "Honda care completed successfully", croReminder: "Feedback call today", jobType: "Mechanical", billingType: "Cash", cashBill: 14200, creditBill: 0, corporateBill: 0, insuranceBill: 0 },
  { id: "JC-2S-0198", plate: "LEA-9032", chassis: "MRHBF1660NP112233", engine: "L15B7-1122334", customer: "Engro Corp fleet", cnic: "35203-1122334-5", testDriveRef: "TD-2S-044", advisor: "Adeel Raza", pit: "Pit 02", inTime: "11:10", outTime: "11:35", estimatedMinutes: 40, accumulatedMinutes: 55, status: "Awaiting QC", cashGiven: 22000, cashMade: 41000, breakService: "Wheel alignment", breakLeather: "Steering leather wrap", thanksMessage: "Fleet service completed", croReminder: "Corporate statement update", jobType: "Body Shop", billingType: "Corporate", cashBill: 0, creditBill: 0, corporateBill: 41000, insuranceBill: 0 },
  { id: "JC-3S-0851", plate: "LEB-2026", chassis: "MRHBF1660NP998877", engine: "L15B7-9988776", customer: "Ali Hassan", cnic: "35204-9988776-3", testDriveRef: "TD-3S-120", advisor: "Fahad Mirza", pit: "Pit 05", inTime: "12:00", outTime: "12:50", estimatedMinutes: 35, accumulatedMinutes: 35, status: "Open", cashGiven: 0, cashMade: 0, breakService: "10,000 km service", breakLeather: "None", thanksMessage: "Pending customer approval", croReminder: "Estimate approval pending", jobType: "Mechanical", billingType: "Insurance", cashBill: 0, creditBill: 0, corporateBill: 0, insuranceBill: 0 },
  { id: "JC-2S-0199", plate: "LEB-7788", chassis: "MRHBF1660NP445566", engine: "L15B7-4455667", customer: "Fatima Zahra", cnic: "35205-4455667-8", testDriveRef: "TD-2S-045", advisor: "Hira Sohail", pit: "Pit 04", inTime: "13:00", outTime: "13:20", estimatedMinutes: 15, accumulatedMinutes: 30, status: "Closed", cashGiven: 5000, cashMade: 9600, breakService: "Oil change", breakLeather: "None", thanksMessage: "Thanks for visiting Honda 2S City", croReminder: "Next service reminder set", jobType: "Body Shop", billingType: "Cash", cashBill: 9600, creditBill: 0, corporateBill: 0, insuranceBill: 0 },
];

export const hondaAuthorisedParts = [
  { part: "Honda Genuine Engine Oil 0W-20", number: "HON-GEO-0W20", category: "Lubricants", stock3s: 120, stock2s: 80, cost: 9200, price: 11400, status: "Healthy", hondaAuthorised: true, companyScope: "Honda Atlas" },
  { part: "Honda OEM Oil Filter Civic", number: "HON-OF-CIV", category: "Filters", stock3s: 60, stock2s: 45, cost: 1450, price: 1950, status: "Healthy", hondaAuthorised: true, companyScope: "Honda Atlas" },
  { part: "Honda OEM Brake Pad Set City", number: "HON-BP-CITY", category: "Brakes", stock3s: 24, stock2s: 3, cost: 7800, price: 9800, status: "Critical", hondaAuthorised: true, companyScope: "Honda Atlas" },
  { part: "Honda CVT Fluid 3.5L", number: "HON-CVT-35", category: "Lubricants", stock3s: 9, stock2s: 12, cost: 11500, price: 14200, status: "Low", hondaAuthorised: true, companyScope: "Honda Atlas" },
  { part: "Aftermarket Wiper Blade 26\"", number: "AM-WB-26", category: "Accessories", stock3s: 16, stock2s: 4, cost: 2800, price: 3650, status: "Low", hondaAuthorised: false, companyScope: "Local vendor" },
];

export const croReminders = [
  { id: "CRO-3S-018", customer: "Bilal Ahmed", vehicle: "Civic LEB-4821", trigger: "Job card opened", channel: "WhatsApp", message: "Your service job JC-3S-0849 is in progress", status: "Sent" },
  { id: "CRO-3S-019", customer: "Sana Malik", vehicle: "City LEC-1180", trigger: "Ready for delivery", channel: "SMS", message: "Vehicle ready for pickup", status: "Sent" },
  { id: "CRO-2S-007", customer: "Engro Corp fleet", vehicle: "City LEA-9032", trigger: "5 minutes remaining", channel: "WhatsApp", message: "Please arrive for delivery", status: "Scheduled" },
  { id: "CRO-3S-020", customer: "Ali Hassan", vehicle: "Civic LEB-2026", trigger: "Estimate approval", channel: "Call", message: "Approve service estimate", status: "Pending" },
];
