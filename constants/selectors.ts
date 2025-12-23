/**
 * Centralized selector definitions.
 * Single source of truth for all DOM selectors used in tests.
 */

export const SELECTORS = {
  ADMIN: {
    ROOM_LISTING: '[data-testid="roomlisting"]',
    ROOM_NAME_INPUT: "#roomName",
    ROOM_TYPE_SELECT: "#type",
    ROOM_ACCESSIBLE_SELECT: "#accessible",
    ROOM_PRICE_INPUT: "#roomPrice",
    CREATE_ROOM_BUTTON: "#createRoom",
    EDIT_BUTTON: 'button:has-text("Edit")',
    UPDATE_BUTTON: "button",
    ROOM_EDIT_BUTTON: ".roomEdit",
    ROOM_DELETE_BUTTON: ".roomDelete",
  },
  CLIENT: {
    BOOKING_SECTION: "#booking",
    ROOMS_SECTION: "#rooms",
    ROOM_CARD: ".room-card",
  },
} as const;
