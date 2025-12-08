import { useMemo } from "react";
import { getUTMParams, getUTMParamsForInsert } from "@/lib/url";
import type { UTMParams } from "@/types/tracking";

/**
 * Hook to access UTM parameters from the URL
 * Memoized to prevent unnecessary recalculations
 */
export function useUTMParams(): UTMParams {
  return useMemo(() => getUTMParams(), []);
}

/**
 * Hook to get UTM params formatted for database insertion
 * Returns null for empty values
 */
export function useUTMParamsForInsert() {
  return useMemo(() => getUTMParamsForInsert(), []);
}
