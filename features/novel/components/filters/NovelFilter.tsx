"use client";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { filterList } from "../../constant";
import { filterNovelsParser } from "../../searchParams";
import { NovelFilterBar } from "./NovelFilterBar";

const NovelFilter = () => {
  const [filterNovels, setFilterNovels] = useQueryState(
    "filterNovels",
    filterNovelsParser,
  );

  const [clicked, setClicked] = useState(false);

  const handleClick = (filter: { label: string; filterKey: string }) => {
    setFilterNovels(filter.filterKey);
    setClicked(true);
  };

  useEffect(() => {
    if (!filterList.some((i) => i.filterKey === filterNovels)) {
      setFilterNovels("highest_rate");
    }
  }, [setFilterNovels, filterNovels]);

  return (
    <>
      <NovelFilterBar
        filterList={filterList}
        clicked={clicked}
        filterNovels={filterNovels}
        handleClick={handleClick}
      />
    </>
  );
};
export { NovelFilter };
