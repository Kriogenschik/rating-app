import { Card, Htag, Tag } from "@/components";
import { TopPageComponentProps } from "./TopPageComponent.props";

import styles from "./TopPageComponent.module.css";
import { HHData } from "@/components/HHData/HHData";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="gray" size="m">
            {products.length}
          </Tag>
        )}
        <span>Sorting</span>
      </div>
      <div>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>
      <div className={styles.hhtitle}>
        <Htag tag="h2">Vacancies - {page.category}</Htag>
        {products && (
          <Tag color="red" size="m">
            hh.com
          </Tag>
        )}
      </div>
      <HHData {...page.hh!}/>
    </div>
  );
};
