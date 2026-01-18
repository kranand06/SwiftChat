import React from "react";
import { messagesDummyData } from "../assets";

const Profilebar = ({ selectedUser, messages }) => {
  if (!selectedUser) return null;

  // Extract media messages
  const mediaMessages = messagesDummyData?.filter((m) => m.image);

  return (
    <div className="h-full flex flex-col overflow-hidden border-l border-theme bg-surface/60 backdrop-blur-xl p-6">

      {/* Profile Info */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={selectedUser.profilePic || "/avatar_icon"}
          alt={selectedUser.fullName}
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />

        <h2 className="text-lg font-semibold text-theme-1 text-center">
          {selectedUser.fullName}
        </h2>

        <p className="text-sm text-theme-2 text-center break-all">
          {selectedUser.email}
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Bio */}
      <div>
        <h3 className="text-sm font-medium text-theme-1 mb-1">
          About
        </h3>
        <p className="text-sm text-theme-2 leading-relaxed">
          {selectedUser.bio || "No bio available."}
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Media Section */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-theme-1 mb-3">
          Media
        </h3>

        {mediaMessages?.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {mediaMessages.map((msg) => (
              <img
                key={msg._id}
                src={msg.image}
                alt="shared media"
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-theme-2">
            No media shared yet.
          </p>
        )}
      </div>

    </div>
  );
};

export default Profilebar;