import React, { useState } from "react";

export default function Timetable() {
  const [sheetLink, setSheetLink] = useState(
    "https://docs.google.com/spreadsheets/d/your-google-sheets-id"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newLink, setNewLink] = useState(sheetLink);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveLink = () => {
    setSheetLink(newLink); // Update the live link for the View button
    setIsEditing(false);   // Close the edit card
  };

  const handleCancel = () => {
    setIsEditing(false);   // Close without saving
    setNewLink(sheetLink); // Reset input field
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 relative">
      {/* Edit Link Button */}
      <button
        onClick={handleEditClick}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
      >
        Edit Link
      </button>

      {/* Edit Card */}
      {isEditing && (
        <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg p-6 w-80 z-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Edit Google Sheets Link</h2>
          <input
            type="text"
            className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveLink}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Professor's Weekly Timetable
        </h1>

        {/* View Full Timetable Button */}
        <a
          href={sheetLink} // Live updated link
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          View Full Timetable in Google Sheets
        </a>
      </div>
    </div>
  );
}
