"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const PaginationComponent = ({ total }: { total: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <Pagination>
      <PaginationContent className="my-2 p-2">
        {Array.from({ length: total }).map((_, index) => (
          <PaginationItem key={index}>
            <Button
              //  @ts-ignore
              variant={currentPage == index + 1 ? "outline" : "link"}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
