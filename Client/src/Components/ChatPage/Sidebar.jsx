import React from "react";
import { Menu, User, LogOut, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {userDummyData} from "../assets";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="p-5 border-r-2 border-gray-500">
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-row items-center gap-4">
                    <img className="w-8" src="favicon.svg" alt="logo" />
                    <h1 className="text-xl font-semibold">SwiftChat</h1>
                </div>
                <div ref={menuRef} className="relative inline-block">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="p-2 rounded-lg hover:bg-secondary transition">
                        <Menu className="text-xl font-medium w-6 cursor-pointer hover:text-accent transition-colors duration-200" />
                    </button>
                    {open && (
                        <div className="bg-theme absolute right-0 top-full mt-2 w-44 bg-surface border border-theme rounded-xl shadow-lg z-50">
                            <button onClick={() => {
                                navigate("/profile");
                                setOpen(false);
                            }}
                                className=" w-full flex items-center gap-3 px-4 py-3 text-sm -theme-1 hover:bg-secondary transition">
                                <User className="w-4 h-4" />
                                Profile
                            </button>

                            <div className="h-px bg-border" />

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onLogout?.();
                                }}
                                className=" w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-secondary transition">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="my-4 flex items-center gap-3 px-4 py-2 rounded-full bg-surface/60 backdrop-blur-xl border border-theme shadow-sm">
                <Search className="w-5 h-5 text-theme-2" />
                <input className="w-full bg-transparent outline-none text-theme-1 placeholder:text-theme-2" placeholder="Search…" />
            </div>

            <div>
                {userDummyData.map((user) => (
                    <div key={user._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface/50 cursor-pointer transition mb-2">
                        <img src={(user.profilePic )? user.profilePic : "/avatar_icon"} alt={user.fullName} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <h2 className="text-theme-1 font-medium">{user.fullName}</h2>
                            <p className="text-theme-2 text-sm truncate w-32">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Sidebar;
