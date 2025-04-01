import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, User, Code2, Briefcase, Mail, Github, Linkedin, Book, Calendar, Edit3, Check, XCircle } from "lucide-react";
import ProfilePic from "../assets/profile-pic.png";
import DefaultCollegeLogo from "../assets/iiitdwd_icon.png";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/about", icon: User, label: "About" },
  { path: "/skills", icon: Code2, label: "Skills" },
  { path: "/projects", icon: Briefcase, label: "Projects" },
  { path: "/courses", icon: Book, label: "Courses" },
  { path: "/timetable", icon: Calendar, label: "Timetable" },
  { path: "/contact", icon: Mail, label: "Contact" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Sunil CK");
  const [designation, setDesignation] = useState("Assistant Professor at");
  const [collegeLogo, setCollegeLogo] = useState(DefaultCollegeLogo);
  const [tempName, setTempName] = useState(name);
  const [tempDesignation, setTempDesignation] = useState(designation);
  const [tempLogo, setTempLogo] = useState(collegeLogo);

  // Handle image upload (preview before saving)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempLogo(imageUrl); // Update preview without saving
    }
  };

  // Save changes
  const handleSave = () => {
    setName(tempName);
    setDesignation(tempDesignation);
    setCollegeLogo(tempLogo);
    setIsEditing(false);
  };

  // Cancel editing (restore previous values)
  const handleCancel = () => {
    setTempName(name);
    setTempDesignation(designation);
    setTempLogo(collegeLogo);
    setIsEditing(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-8 z-50 p-2 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 md:hidden"
      >
        {isOpen ? <X size={28} className="text-gray-800" /> : <Menu size={28} className="text-gray-800" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-lg border-r border-gray-300 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto h-screen scrollbar-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 text-center border-b bg-gradient-to-r from-blue-100 to-blue-300 relative">
            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-3 right-3 p-2 text-gray-700 hover:text-blue-600 transition-all"
              >
                <Edit3 size={20} />
              </button>
            )}

            {isEditing ? (
              <>
                {/* Profile Picture */}
                <div className="w-20 h-20 mx-auto">
                  <img
                    src={ProfilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                {/* Editable Name */}
                <input
                  type="text"
                  className="mt-3 text-lg font-semibold text-center bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-600 transition-all text-gray-900 placeholder-gray-500"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  autoFocus
                />

                {/* Editable Designation */}
                <input
                  type="text"
                  className="mt-1 text-sm text-center bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-600 transition-all text-gray-700"
                  value={tempDesignation}
                  onChange={(e) => setTempDesignation(e.target.value)}
                />

                {/* College Logo Upload with Live Preview */}
                <div className="w-20 h-20 mx-auto mt-2">
                  <img src={tempLogo} alt="College Logo" className="w-full h-full object-contain" />
                </div>

                <label className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition-all">
                  Upload Logo
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>

                {/* Save & Close Buttons */}
                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow-md hover:bg-green-600 transition-all"
                  >
                    <Check size={16} className="mr-2" /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow-md hover:bg-red-600 transition-all"
                  >
                    <XCircle size={16} className="mr-2" /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Profile Picture */}
                <div className="w-20 h-20 mx-auto">
                  <img
                    src={ProfilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                {/* Display Name */}
                <h2 className="text-lg font-semibold text-gray-900 mt-3">{name}</h2>

                {/* Display Designation */}
                <p className="text-gray-700 text-sm">{designation}</p>

                {/* College Logo */}
                <div className="w-20 h-20 mx-auto mt-2">
                  <img src={collegeLogo} alt="College Logo" className="w-full h-full object-contain" />
                </div>
              </>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 mt-4 space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-800 hover:bg-blue-100 hover:pl-6 hover:shadow-lg"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} className="mr-3" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Social Links */}
          <div className="p-4 border-t flex justify-center space-x-5">
            <a
              href="https://github.com/sunilchinnahalli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-transform duration-300 hover:scale-125 hover:text-gray-900"
            >
              <Github size={22} />
            </a>
            <a
              href="https://in.linkedin.com/in/sunil-ck-ph-d-4599237a?original_referer=https%3A%2F%2Fwww.google.com%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-transform duration-300 hover:scale-125 hover:text-gray-900"
            >
              <Linkedin size={22} />
            </a>
          </div>
          
        </div>
      </aside>
    </>
  );
}
