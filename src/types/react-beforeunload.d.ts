declare module "react-beforeunload" {
  import { ComponentType } from "react";

  export interface BeforeunloadProps {
    onBeforeunload?: (event: BeforeUnloadEvent) => void;
  }

  export const Beforeunload: ComponentType<BeforeunloadProps>;

  export function useBeforeunload(
    handler?: (event: BeforeUnloadEvent) => void
  ): void;
}