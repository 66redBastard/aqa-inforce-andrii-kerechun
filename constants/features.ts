/**
 * Feature checkbox mappings.
 * Central source of truth for room feature checkbox IDs.
 */
export const FEATURE_CHECKBOX_IDS = {
  WiFi: "wifiCheckbox",
  TV: "tvCheckbox",
  Radio: "radioCheckbox",
  Refreshments: "refreshmentsCheckbox",
  Safe: "safeCheckbox",
  Views: "viewsCheckbox",
} as const;

export type FeatureName = keyof typeof FEATURE_CHECKBOX_IDS;

/**
 * All available room features as an array.
 */
export const ALL_FEATURES = Object.keys(FEATURE_CHECKBOX_IDS) as FeatureName[];
