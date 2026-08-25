// Registry of every client proposal. /proposal/[slug] reads this map.
// Add a client: create <slug>.ts next to this file and register it here.
import type { ProposalData } from "@/components/proposal/types";
import { automatable } from "./automatable";

export const proposals: Record<string, ProposalData> = {
  [automatable.slug]: automatable,
};
