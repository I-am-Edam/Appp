"use client";

import { ChatWindow } from "@/components/chat/chat-window";
import { ChatRooms } from "@/components/chat/chat-rooms";

export default function StaffChat() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Team Chat</h1>
      <div className="flex gap-6">
        <ChatRooms />
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}