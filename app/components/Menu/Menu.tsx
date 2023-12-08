import { getMenu } from "@/api/menu";
import styles from "./Menu.module.css";
import cn from "classnames";
import Link from "next/link";
import { MenuSecondLevel } from "./Menu.router";
import { firstLevelMenu } from "@/helpers/helpers";

export const Menu = async (): Promise<JSX.Element> => {
  const menu = await getMenu();

  const firstCategory = 0

  const buildFirstLevel = () => {
    return(
      <>
      {firstLevelMenu.map(m => (
        <div key={m.route}>
          <Link href={`/${m.route}`}>
            <div className={cn(styles.firstLevel, {
              [styles.firstLevelActive]: m.id === firstCategory
            })}>
              {m.icon}
              <span>{m.name}</span>
            </div>
          </Link>
          {m.id === firstCategory && <MenuSecondLevel menu={menu} menuItem={m}/>}
        </div>
      ))}
      </>
    )
  }

  return (
      <div className={styles.menu}>
        {buildFirstLevel()}
      </div>
  );
};
