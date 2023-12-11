"use client";

import cn from "classnames";

import styles from "./Search.module.css";
import { useState } from "react";
import SearchIcon from "./search.svg";
import { SearchProps } from "./Search.props";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const goToSearch = () => {
    router.push("/search" + "?q=" + search);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      goToSearch();
    }
  }
  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        className={styles.input}
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
