import { HHDataProps } from "./HHData.props";
import cn from "classnames";
import RateIcon from "./rate.svg";

import styles from "./HHData.module.css";
import { Card } from "..";

export const HHData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HHDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Total vacancies</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Begginer</div>
          <div className={styles.salaryValue}>{juniorSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Middle</div>
          <div className={styles.salaryValue}>{middleSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Professional</div>
          <div className={styles.salaryValue}>{seniorSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
