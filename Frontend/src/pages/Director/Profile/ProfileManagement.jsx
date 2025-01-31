import React, { useState } from "react";

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    firstName: "Kshitiz",
    lastName: "Maurya",
    email: "kshiz@gmail.com",
    phone: "123455665",
    bio: "web Designer",
    country: "Indiaa",
    cityState: "UP",
    postalCode: "@01016",
    address: "1817",
    photo: null, // Profile photo
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState(null);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (section) => {
    setEditSection(section);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditSection(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditSection(null);
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* Profile Section */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={profile.photo || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h2>
              <p className="text-gray-500">{profile.bio}</p>
              <p className="text-gray-500">{profile.cityState}</p>
            </div>
          </div>
          <button
            onClick={() => handleEdit("profile")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      </div>


      {/* Personal Information Section */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <button
            onClick={() => handleEdit("personal")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <strong>First Name:</strong>
            <p>{profile.firstName}</p>
          </div>
          <div>
            <strong>Last Name:</strong>
            <p>{profile.lastName}</p>
          </div>
          <div>
            <strong>Email Address:</strong>
            <p>{profile.email}</p>
          </div>
          <div>
            <strong>Phone:</strong>
            <p>{profile.phone}</p>
          </div>
          <div>
            <strong>Bio:</strong>
            <p>{profile.bio}</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white shadow rounded p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Address</h2>
          <button
            onClick={() => handleEdit("address")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <strong>Country:</strong>
            <p>{profile.country}</p>
          </div>
          <div>
            <strong>City/State:</strong>
            <p>{profile.cityState}</p>
          </div>
          <div>
            <strong>Postal Code:</strong>
            <p>{profile.postalCode}</p>
          </div>
          <div>
            <strong>Address:</strong>
            <p>{profile.address}</p>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">
              Edit {editSection === "profile" ? "Profile" : "Details"}
            </h2>
            <form className="space-y-4">
              {editSection === "profile" ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    placeholder="Bio"
                    className="w-full p-2 border rounded resize-none"
                  ></textarea>
                  <div className="flex flex-col items-start">
                    <label className="text-sm font-medium">Upload Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Add inputs for other sections if necessary */}
                </>
              )}
              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-gray-300 text-gray-700 py-2 rounded mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default ProfileManagement;
