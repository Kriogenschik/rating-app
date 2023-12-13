import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import arrow from "./arrow.svg"
import close from "./close.svg"
import menu from "./menu.svg"

export const icons = {
  arrow,
  close,
  menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  appearance: "primary" | "white";
}
