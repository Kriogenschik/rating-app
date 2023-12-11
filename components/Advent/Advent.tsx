import { Card, Htag } from "..";
import { priceDolars } from "@/helpers/helpers";
import { AdventProps } from "./Advent.props";
import cn from "classnames";
import DoneIcon from "./done.svg";

import styles from "./Advent.module.css";


export const Advent = ({
  advantages
}: AdventProps): JSX.Element => {
  return (
    <div className={styles.advent}>
      {advantages?.map((a) => (
          <div key={a._id} className={styles.advatageItem} >
            <DoneIcon/>
            <div className={styles.title}>{a.title}</div>
            <hr className={styles.vline}></hr>
            <div>{a.description}</div>
          </div>
      ))
      }
    </div>
  );
};
