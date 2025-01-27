export interface Product {
  id: string;
  name: string;
  price: number;
  image: { url: string }[];
  orders: { id: string }[];
}

export interface Order {
  id: string;
  user: { name: string };
  createdAt: Date;
  status: "DELIVERED" | "NOT_DELIVERED" | "SHIPPED";
  totalPrice: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface Category {
  name: string;
  products: {
    orders: { totalPrice: number }[];
  }[];
}

export interface DashboardData {
  totalSales: number;
  newOrders: number;
  topSellingProducts: Product[];
  newCustomers: number;
  recentOrders: Order[];
  newProducts: Product[];
  recentCustomers: Customer[];
  salesByCategory: Category[];
}
