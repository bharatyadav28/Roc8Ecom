"use client";

import Card from "./_components/_UI/Card";
import useHttp from "./_hooks/use-http";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import LoadingSpinner from "./_components/_UI/LoadingSpinner";

interface cateogry {
  id: number;
  name: string;
}

export default function HomePage() {
  const { dbConnect, isLoading, error, setError } = useHttp();
  const [cateogries, setCateogries] = useState<cateogry[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 17;

  const handleCheckboxChange = async (id: number) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id],
    });

    if (!checkedItems[id]) {
      if (!selectedIds.includes(id)) {
        selectedIds.push(id);
        await dbConnect(
          {
            path: "/api/interest-data",
            method: "POST",
            payload: { interestId: id },
          },
          (data) => {
            console.log("data:", data);
          },
        );
      }
    } else {
      if (selectedIds.includes(id)) {
        const temp = selectedIds.filter((item) => item !== id);

        setSelectedIds(temp);

        await dbConnect(
          {
            path: "/api/interest-data",
            method: "DELETE",
            payload: { interestId: id },
          },
          (data) => {
            console.log("data:", data);
          },
        );
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      await dbConnect(
        {
          path: `/api/interest-data?page=${currentPage}`,
          method: "GET",
          payload: null,
        },
        (data: unknown) => {
          if (typeof data === "object" && data !== null) {
            const { paginatedData, selectedIDs } = data as {
              paginatedData: cateogry[];
              selectedIDs: number[];
            };

            setCateogries(paginatedData);
            setSelectedIds(selectedIDs);
          }
        },
      );
    }
    fetchData()
      .then(() => {
        console.log("");
      })
      .catch((error: unknown) => {
        let message = "An error occurred";
        if (error instanceof Error) {
          message = error.message;
        }
        setError(message);
      });
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const cateogriesInputs = cateogries?.map((item: cateogry) => (
    <label key={item.id} className="my-2 text-sm">
      <input
        type="checkbox"
        checked={
          checkedItems[item.id] ?? selectedIds.includes(item.id) ?? false
        }
        onChange={() => handleCheckboxChange(item.id)}
        className=" mr-2 h-3 w-3"
      />
      {item.name}
    </label>
  ));

  return (
    <Card className=" mx-auto mt-10 flex w-4/12 flex-col items-center">
      <p className="text-2xl font-semibold">Please make your interests!</p>
      <p className=" mt-3 text-sm font-medium">We will keep you notified.</p>

      <div className="my-5 flex flex-col self-start font-semibold">
        <p className="text-lg">My saved interests!</p>
        {isLoading && <LoadingSpinner />}

        {!isLoading && cateogriesInputs}
      </div>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
      />
    </Card>
  );
}
