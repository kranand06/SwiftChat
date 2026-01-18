import React, { useState } from "react";
import { Camera, Mail, User, Save, LogOut } from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: "Kumar Anand",
    email: "kranand9430@gmail.com",
    bio: "Hey there! I’m using SwiftChat.",
    profilePic: "/avatar_icon.png",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        profilePic: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    console.log("Updated profile:", profile);
    // send to backend here
  };

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-surface border border-theme rounded-2xl shadow-xl p-8">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-theme-1 mb-6">
          Profile
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-primary"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer hover:bg-hover transition"
            >
              <Camera className="w-4 h-4 text-white" />
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/png, image/jpeg"
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm text-theme-2 mb-1">
              Full Name
            </label>
            <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme">
              <User className="w-5 h-5 text-theme-2" />
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-theme-1"
              />
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm text-theme-2 mb-1">
              Email
            </label>
            <div className="flex items-center gap-3 border border-theme rounded-xl px-4 py-3 bg-theme opacity-80">
              <Mail className="w-5 h-5 text-theme-2" />
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full bg-transparent outline-none text-theme-1 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-theme-2 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              value={profile.bio}
              onChange={handleChange}
              className="w-full border border-theme rounded-xl px-4 py-3 bg-theme text-theme-1 outline-none resize-none"
            />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-primary hover:bg-hover text-white font-semibold py-3 rounded-xl transition"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>

          {/* logout button  */}
          <button
            // onClick={handleSave}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-primary hover:bg-hover text-white font-semibold py-3 rounded-xl transition"
          >
            <LogOut className="w-5 h-5" />
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;