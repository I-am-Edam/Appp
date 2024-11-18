"use client";

import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function ChatRooms() {
  const { rooms, activeRoom, setActiveRoom } = useChat();

  return (
    <ScrollArea className="h-[600px] w-64 border rounded-lg">
      <div className="p-4 space-y-2">
        {rooms.map((room) => (
          <Button
            key={room.id}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeRoom === room.id && "bg-secondary"
            )}
            onClick={() => setActiveRoom(room.id)}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">
                {room.isPrivate ? "Private Chat" : "General Chat"}
              </span>
              {room.lastMessage && (
                <span className="text-xs text-muted-foreground truncate">
                  {room.lastMessage.content}
                </span>
              )}
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}