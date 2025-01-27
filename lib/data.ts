import { prisma } from "./prisma-client";
import { DashboardData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const totalSales = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
  });

  const newOrders = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
  });

  const topSellingProducts = await prisma.product.findMany({
    take: 3,
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
    include: {
      orders: true,
      image: {
        take: 1,
      },
    },
  });

  const newCustomers = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
  });

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      product: true,
    },
  });

  const newProducts = await prisma.product.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      image: {
        take: 1,
      },
    },
  });

  const recentCustomers = await prisma.user.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  const salesByCategory = await prisma.category.findMany({
    include: {
      products: {
        include: {
          orders: true,
        },
      },
    },
  });

  return {
    totalSales: totalSales._sum.totalPrice || 0,
    newOrders,
    topSellingProducts,
    newCustomers: newCustomers,
    recentOrders,
    newProducts: newProducts.map((product) => ({
      ...product,
      orders: product.image.map((image) => ({
        id: image.id,
        url: image.url,
        productId: image.productId,
      })),
    })),
    recentCustomers,
    salesByCategory,
  };
}
