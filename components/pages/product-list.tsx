"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category, Product, Image as TypeImage } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { toRupee } from "@/lib/currency-formater";
import axios from "axios";
import { CheckCircle, Edit, SearchIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteDialogBox } from "../shared/delete-confirmation-dialog";
import NoItemComponent from "../shared/no-item-found";
import PaginationComponent from "../shared/pagination";

type Props = {
  products: (Product & {
    image: TypeImage[],
    Category: Category
  })[];
  totalPages: number;
};

export default function ProductList({ products, totalPages = 1 }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(products.filter((product) => product.image.length > 0));

  const handleSearch = () => {
    setData(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setData(products);
  }, [products]);

  const updatePopularity = async (status: boolean, id: string) => {
    // Optimistic update
    setData(prevData =>
      prevData.map(product =>
        product.id === id ? { ...product, isPopular: status } : product
      )
    );

    try {
      await axios.put(`/api/status/${id}`, { isPopular: status });
      toast({
        description: `Product popularity updated successfully!`,
      });
    } catch (error) {
      // Revert optimistic update on error
      setData(prevData =>
        prevData.map(product =>
          product.id === id ? { ...product, isPopular: !status } : product
        )
      );
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem updating the product popularity.",
      });
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      const result = await axios.delete(`/api/products/${id}`);
      toast({
        title: "Processing....",
        description: "Deleting Product ....",
      });
      router.refresh();
      setData(products);

      if (result.status == 200) {
        toast({
          description: (
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <p className="text-emerald-500">Product deleted successfully</p>
            </div>
          ),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction altText="Try again" onClick={() => deleteAccount(id)}>
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-2 md:gap-6 md:p-4">
      {products.length < 1 && (
        <NoItemComponent
          heading="No Products found!"
          message="There are no Products found in the database"
          buttonText="Add new product"
          link="/admin/products/new"
        />
      )}
      {products.length > 0 && (
        <div className="border shadow-sm rounded-lg p-2">
          <section className="w-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="shadow-sm rounded-lg p-2">
              <div className="grid gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                  <div className="w-full flex-1">
                    <form>
                      <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                          className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                          placeholder="Search products..."
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyUp={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                  <div>
                    <Link href="/admin/products/new" className="">
                      <Button>Add Product</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-1/4">Name</TableHead>
                <TableHead className="min-w-1/4">Price</TableHead>
                <TableHead className="min-w-1/4">Quantity</TableHead>
                <TableHead className="hidden md:table-cell">Is Popular</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {data.length < 1 && (
              <div className="w-full items-center justify-center mx-auto flex flex-1">
                <p className="w-full">No Products found!</p>
              </div>
            )}
            <TableBody>
              {data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="flex space-x-2 items-center">
                    <Image
                      src={product.image[0].url}
                      alt={product.name}
                      className="rounded-md"
                      width={30}
                      height={30}
                    />
                    <p>{product.name}</p>
                  </TableCell>
                  <TableCell>{toRupee(product.price)}</TableCell>
                  <TableCell>
                    {product.quantity} available
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Switch
                      checked={product.isPopular}
                      onCheckedChange={(checked) => updatePopularity(checked, product.id)}
                    />
                    <span className="ml-2">{product.isPopular ? "Yes" : "No"}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.Category.name}
                  </TableCell>
                  <TableCell className='text-right flex'>
                    <Link href={`/admin/products/edit/${product.id}`}>
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4 text-[#C5CEE0]" />
                      </Button>
                    </Link>
                    <DeleteDialogBox
                      endpoint="/api/products"
                      id={product.id}
                      title={product.name}
                    >
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4 text-[#C5CEE0]" />
                      </Button>
                    </DeleteDialogBox>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent total={totalPages} />
        </div>
      )}
    </main>
  );
}