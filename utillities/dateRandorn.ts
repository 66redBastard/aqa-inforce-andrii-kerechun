/**
 * Utility functions for date handling in tests.
 */

/**
 * Generates random future check-in and check-out dates.
 * Check-in: Based on current timestamp for uniqueness (1-100 days from today).
 * Check-out: 1 day after check-in.
 * @returns Object with checkinStr and checkoutStr in MM/DD/YYYY format.
 */
export function getRandomFutureDates(): {
  checkinStr: string;
  checkoutStr: string;
} {
  const today = new Date();
  const offset = (Date.now() % 100) + 1; // Use timestamp for unique offset per run
  const checkin = new Date(today);
  checkin.setDate(today.getDate() + offset);
  const checkout = new Date(checkin);
  checkout.setDate(checkin.getDate() + 1);

  // Format as MM/DD/YYYY to match app expectations
  const checkinStr = `${
    checkin.getMonth() + 1
  }/${checkin.getDate()}/${checkin.getFullYear()}`;
  const checkoutStr = `${
    checkout.getMonth() + 1
  }/${checkout.getDate()}/${checkout.getFullYear()}`;

  return { checkinStr, checkoutStr };
}
