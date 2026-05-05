import { tv } from "tailwind-variants";

export const typograph = tv({
  base: "text-base font-medium",
  variants: {
    size: {
      title: "text-2xl font-medium",
      detail: "text-sm font-thin",
      result: "text-xl",
    },
    color: {
      detail: "text-detail",
    },
  },
});
