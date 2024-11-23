// import React, { useEffect, useState } from 'react';

// function Profile() {
//   const [profiles,setProfile] = useState([]);

//   useEffect(()=>{
//     const fetchProfile = async()=>{
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:8000/api/user/get-user-data',{
//             method:'GET',
//             headers:{
//               'Content-Type':'application/json',
//               Authorization:`Bearer ${token}`,
//             },
//         });
//         const data = await response.json();
//         console.log('API RESPONSE',data);
//         if(data.user && Array.isArray(data.user)){
//           setProfile(data.user);
//         }else{
//           console.log('unexpected api response response format');
//           setProfile([]);
//         }
        
//       } catch (error) {
//         console.log('something went wrong',error);
//         setProfile([]);
//       }
//     };
//     fetchProfile();

//   },[]);
//   return (
//     <>
    
//       <div className="flex items-center justify-center min-h-screen bg-black">
//       {profiles.map((profile)=>(
//         <div key={profiles._id} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//           {/* Image Section */}
//           <div className="mb-6">
//             <img
//               src={`http://localhost:8000/${profile.image}`}
//               alt="Profile Icon"
//               className="mx-auto w-24 h-24 rounded-full"
//             />
//           </div>

//           {/* Input Section */}
//           <div className="mb-6">
//             <input
//               type="file"
//               className="w-22 h-12"
//             />
//           </div>

//           {/* Label Section */}
//           <div>
//             <label className="text-lg font-medium text-gray-800">
//               {profiles.name}
//             </label>
//           </div>
//         </div>
//         ))}
//       </div>
      
//     </>
//   );
// }

// export default Profile;







import React, { useEffect, useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null); // Initialize as null since it's an object.
  const [selectedFile,setSelectedFile] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/user/get-user-data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('API RESPONSE', data);

        if (data.user && typeof data.user === 'object') {
          setProfile(data.user); // Set the user object directly.
        } else {
          console.error('Unexpected API response format');
          setProfile(null);
        }
      } catch (error) {
        console.error('Something went wrong', error);
        setProfile(null);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (event)=>{
        setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async ()=>{
    if(!selectedFile){
      alert('please select a file to upload');
      return;
    }
    const formData = new FormData();
  formData.append('profile-file', selectedFile);
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/user/upload-single', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers.
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);
      setLoading(false);

      if (data.success) {
        alert("Image updated successfully!");
        // Fetch updated profile data after successful upload
        const token = localStorage.getItem("token");
        const updatedProfileResponse = await fetch("http://localhost:8000/api/user/get-user-data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedProfile = await updatedProfileResponse.json();
        setProfile(updatedProfile.user); // Update the profile in the state
      } else {
        alert("Failed to update image!");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Something went wrong during upload.");
    } finally {
      setLoading(false); // Stop loading
    }
  };





  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {profile ? (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
          {/* Image Section */}
          <div className="mb-6">
            <img
              src={`http://localhost:8000/uploads/${profile.image || 'default-image.jpg'}`}
              alt="Profile Icon"
              className="mx-auto w-24 h-24 rounded-full"
            />
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <input type="file" onChange={handleFileChange} className="w-22 h-12" />
            <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Update Image'}
          </button>
          </div>

          {/* Label Section */}
          <div>
            <label className="text-lg font-medium text-gray-800">
              {profile.name}
            </label>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;

