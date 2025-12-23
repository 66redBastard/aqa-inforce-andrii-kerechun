import { APIRequestContext, expect } from "@playwright/test";
import { BASE_URL } from "../config/env";

/**
 * Room type definition.
 */
export type RoomType = "Single" | "Double" | "Suite";

/**
 * Room interface representing the room data structure.
 */
export interface Room {
  roomName: string;
  type: RoomType;
  accessible: boolean;
  roomPrice: number;
  features: string[];
  roomid?: number;
  description?: string;
  image?: string;
}

/**
 * Create room request data.
 */
export type CreateRoomData = Omit<Room, "roomid" | "description" | "image">;

/**
 * API service for room-related operations.
 * Provides a clean abstraction layer for API calls.
 */
export class RoomApiService {
  constructor(private request: APIRequestContext) {}

  /**
   * Creates a new room.
   * @param room - Room data to create.
   * @returns Created room with ID.
   */
  async createRoom(room: CreateRoomData): Promise<Room> {
    const response = await this.request.post(`${BASE_URL}/api/room`, {
      data: room,
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    
    return data.room;
  }

  /**
   * Gets all rooms from the user API.
   * @returns Array of rooms.
   */
  async getRooms(): Promise<Room[]> {
    const response = await this.request.get(`${BASE_URL}/api/room`);
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    return data.rooms;
  }

  /**
   * Gets a specific room by ID.
   * @param roomId - Room ID.
   * @returns Room data.
   */
  async getRoomById(roomId: number): Promise<Room> {
    const response = await this.request.get(`${BASE_URL}/api/room/${roomId}`);
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    return data;
  }

  /**
   * Updates an existing room.
   * @param roomId - Room ID to update.
   * @param room - Updated room data.
   * @returns Updated room.
   */
  async updateRoom(roomId: number, room: Partial<CreateRoomData>): Promise<Room> {
    const response = await this.request.put(`${BASE_URL}/api/room/${roomId}`, {
      data: room,
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    return data;
  }

  /**
   * Deletes a room.
   * @param roomId - Room ID to delete.
   */
  async deleteRoom(roomId: number): Promise<void> {
    const response = await this.request.delete(`${BASE_URL}/api/room/${roomId}`);
    expect(response.ok()).toBeTruthy();
  }

  /**
   * Finds a room by name.
   * @param roomName - Room name to search for.
   * @returns Room if found, undefined otherwise.
   */
  async findRoomByName(roomName: string): Promise<Room | undefined> {
    const rooms = await this.getRooms();
    return rooms.find((r) => r.roomName === roomName);
  }
}
