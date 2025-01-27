
import ProductList from "@/components/pages/product-list";
import { prisma } from "@/lib/prisma-client";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    skip,
    take: pageSize,
    include: {
      image: true,
      Category: true,
    }
  });
  const consistentData = products.filter((product) => product.image.length > 0)
  const unConsistentData = products.filter((product) => product.image.length === 0).length;
  const totalItems = await prisma.product.count();
  const totalPages = Math.ceil(totalItems / pageSize) - unConsistentData;
  return (
    <main className="">
      <ProductList products={consistentData.map(product => ({
        ...product,
        Category: product.Category || { id: '', name: '', image: '', description: '' },
      }))} totalPages={totalPages} />
    </main>
  );
}
