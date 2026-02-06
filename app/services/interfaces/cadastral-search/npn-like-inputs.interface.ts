import { NpnLike } from "./npn-like";

export interface NpnLikeInputs {
  label: string;
  property: keyof NpnLike;
  spaces: number;
}
