import { Advent, Card, Htag, PTag, Tag } from "@/components";
import { TopPageComponentProps } from "./TopPageComponent.props";

import styles from "./TopPageComponent.module.css";
import { HHData } from "@/components/HHData/HHData";
import { Sort } from "@/components/Sort/Sort";
import { SortEnum } from "@/components/Sort/Sort.props";
import { useReducer, useState } from "react";
import { sortReducer } from "./sort.reducer";
import { Products } from "@/components/Products/Products";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  // const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});

  // const setSort = async (sort: SortEnum) => {
  //   "use server";
  //   dispatchSort({type: sort})

  // }
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="gray" size="m">
            {products.length}
          </Tag>
        )}

        <Sort
          // sort={sort} setSort={setSort}
          products={products}
        />
      </div>
      {/* <div>
        {sortedProducts && sortedProducts.map((p) => <div key={p._id}>{p.title}</div>)}
      </div> */}
      <Products products={products} />
      <div className={styles.hhtitle}>
        <Htag tag="h2">Vacancies - {page.category}</Htag>
        {products && (
          <Tag color="red" size="m">
            hh.com
          </Tag>
        )}
      </div>
      {page.hh && <HHData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Advantages</Htag>
          <Advent advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Acquired skills</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
};
