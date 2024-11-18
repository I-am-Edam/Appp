"use client";

import { create } from "zustand";
import { Message, ChatRoom } from "@/types/chat";
import io, { Socket } from "socket.io-client";

interface ChatStore {
  messages: Message[];
  rooms: ChatRoom[];
  activeRoom: string | null;
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (content: string, roomId: string) => void;
  setActiveRoom: (roomId: string) => void;
}

export const useChat = create<ChatStore>((set, get) => ({
  messages: [],
  rooms: [],
  activeRoom: null,
  socket: null,
  isConnected: false,

  connect: () => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");
    
    socket.on("connect", () => {
      set({ isConnected: true });
    });

    socket.on("disconnect", () => {
      set({ isConnected: false });
    });

    socket.on("message", (message: Message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  sendMessage: (content: string, roomId: string) => {
    const { socket } = get();
    if (socket) {
      const message = {
        id: Date.now().toString(),
        content,
        roomId,
        timestamp: new Date(),
      };
      socket.emit("message", message);
    }
  },

  setActiveRoom: (roomId: string) => {
    set({ activeRoom: roomId });
  },
}));