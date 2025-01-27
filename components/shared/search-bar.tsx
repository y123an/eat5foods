"use client";

import { SearchIcon } from "lucide-react";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(query.trim());

    router.push(`/shop/search?search=${encodedQuery}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md md:w-[600px] md:flex relative"
    >
      <div className="relative w-full my-2 rounded-full overflow-hidden bg-white shadow-sm dark:bg-gray-900">
        <div className="flex items-center px-3 py-1 transition-all duration-300 focus-within:bg-white focus-within:shadow-sm dark:bg-gray-900 dark:focus-within:bg-gray-800">
          <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <input
            className="w-full bg-transparent px-3 py-2 focus:outline-none text-black dark:text-white"
            placeholder="Search..."
            type="search"
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
