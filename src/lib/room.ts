  /**
   * Creates a room with the given user ID and type on the K9Crypt API.
   *
   * @param {string} userId - The ID of the user creating the room.
   * @param {"public"|"private"} type - The type of room to create.
   * @param {string} [password] - The password for the room (required for private rooms).
   * @return {Promise<string>} A promise that resolves with the room ID of the newly created room.
   * @throws {Error} If there is an error creating the room.
   */
export async function createRoom(userId: string, type: "public" | "private", password?: string): Promise<string> {
  try {
    const response = await fetch("https://api.k9crypt.xyz/room/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, type, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Failed to create room: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.roomId;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

  /**
   * Joins a room with the specified room ID and user ID.
   *
   * @param {string} roomId - The ID of the room to join.
   * @param {string} userId - The ID of the user joining the room.
   * @param {string} [password] - The password for the room (required for private rooms).
   * @return {Promise<string>} A promise that resolves with the message from the API.
   * @throws {Error} If there is an error joining the room.
   */
export async function joinRoom(roomId: string, userId: string, password?: string): Promise<string> {
  try {
    const response = await fetch("https://api.k9crypt.xyz/room/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, userId, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Failed to join room: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
}

  /**
   * Leaves a room with the specified room ID and user ID.
   *
   * @param {string} roomId - The ID of the room to leave.
   * @param {string} userId - The ID of the user leaving the room.
   * @return {Promise<string>} A promise that resolves with the message from the API.
   * @throws {Error} If there is an error leaving the room.
   */
export async function leaveRoom(roomId: string, userId: string): Promise<string> {
  try {
    const response = await fetch("https://api.k9crypt.xyz/room/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Failed to leave room: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error leaving room:", error);
    throw error;
  }
}