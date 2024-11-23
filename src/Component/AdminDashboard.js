//redux k through data display karaya h bas
// import React, { useEffect, useRef} from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from 'react-redux';
// import { getCandidates } from "../slices/candidateSlice";



// function AdminDashboard() {
//   const modalRef = useRef(null); // Reference for the modal
//   const dispatch = useDispatch();
//   const candidates = useSelector((state) => state.candidates.candidates);
  

//   const openModal = () => {
//     if (modalRef.current) {
//       modalRef.current.classList.remove("hidden"); // Show modal
//     }
//   };

//   const closeModal = () => {
//     if (modalRef.current) {
//       modalRef.current.classList.add("hidden"); // Hide modal
//     }
//   };
//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     party: Yup.string().required("Party is required"),
//     age: Yup.number().required("Age is required").min(18, "Age must be at least 18"),
//     image: Yup.string().required("Image is required"),
//   })
//   const initialValues = {
//     name:"",
//     party:"",
//     age:"",
//     image:""
//   };
//   const handleSubmit = (values, { resetForm }) => {
//     console.log("Form Submitted:", values);
//     resetForm(); // Reset form after submission
//     closeModal(); // Close modal
//   };

  
//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  
//         if (!token) {
//           console.error('No token found');
//           return;
//         }
  
//         const response = await fetch('http://localhost:8000/api/admin/get-candidate', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}` // Include the token in the Authorization header
//           }
//         });
  
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to fetch candidates');
//         }
  
//         const data = await response.json();
  
//         if (Array.isArray(data.candidates)) {
//           dispatch(getCandidates(data.candidates)); // Pass the candidates to Redux store
//         } else {
//           console.error('Invalid response structure:', data);
//           dispatch(getCandidates([]));
//         }
//       } catch (error) {
//         console.error('Error fetching candidates:', error.message);
//       }
//     };
  
//     fetchCandidates();
//   }, [dispatch]);
  
  
//   return (
//     <div className="p-6 mt-52">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={openModal}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Create
//         </button>

//         <button
          
//           className="py-4 px-2 bg-red-600 text-white rounded hover:bg-red-800"
//         >
//           Admin Logout
//         </button>
//       </div>

//       {/* Table */}
//       <table className="min-w-full bg-white border border-gray-200 rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Party</th>
//             <th className="border px-4 py-2">Age</th>
//             <th className="border px-4 py-2">Image</th>
//             <th className="border px-4 py-2">Vote Count</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates.map((candidate) => (
//             <tr key={candidate.id}>
//               <td className="border px-4 py-2">{candidate.name}</td>
//               <td className="border px-4 py-2">{candidate.party}</td>
//               <td className="border px-4 py-2">{candidate.age}</td>
//               <td className="border px-4 py-2">
//                 <img
//                           src={`http://localhost:8000/${candidate.candidateImageUrl}`}

//                   alt={candidate.name}
//                   className="h-12 w-12 rounded"
//                 />
//               </td>
//               <td className="border px-4 py-2">{candidate.voteCount}</td>
//               <td className="border px-4 py-2 space-x-2">
//                 <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
//                   Update
//                 </button>
//                 <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
//                   Delete
//                 </button>
//                 {/* onClick={()=>handleDelete(candidate._id)} */}
//               </td>
//             </tr>
//           ))}
          

//         </tbody>
//       </table>

//       {/* Modal */}
//       <div
//         ref={modalRef}
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden"
//       >
//         <div className="bg-white p-6 rounded shadow-lg w-96">
//           <h2 className="text-2xl font-bold mb-4">Create Candidate</h2>
//           <Formik initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >{()=>(
//           <Form>
//             <div className="mb-4">
//               <label className="block text-gray-700">Name</label>
//               <Field
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Party</label>
//               <Field
//                 type="text"
//                 name="party"
//                 placeholder="Enter party"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <ErrorMessage
//                     name="party"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Age</label>
//               <Field
//                 type="number"
//                 name="age"
//                 placeholder="Enter age"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <ErrorMessage
//                     name="age"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Image</label>
//               <Field
//                 type="file"
//                 name="image"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <ErrorMessage
//                     name="image"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Save
//               </button>
//             </div>
//           </Form>
//           )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

























//without update

import React, { useEffect, useRef, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleError,handleSuccess } from '../utils';





function AdminDashboard() {
  const modalRef = useRef(null); // Reference for the modal
  const [candidates,setCandidates] = useState([]);

  
  

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("hidden"); // Show modal
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("hidden"); // Hide modal
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    party: Yup.string().required("Party is required"),
    age: Yup.number().required("Age is required").min(18, "Age must be at least 18"),
    candidateImage: Yup.string().required("Image is required"),
  })
  const initialValues = {
    name:"",
    party:"",
    age:"",
    candidateImage:"null"
  };
  //formik with only designing
  // const handleSubmit = (values, { resetForm }) => {
  //   console.log("Form Submitted:", values);
  //   resetForm(); // Reset form after submission
  //   closeModal(); // Close modal
  // };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // console.log("hello");
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('party', values.party);
      formData.append('age', values.age);
      formData.append('candidateImage', values.candidateImage);
      const response = await fetch('http://localhost:8000/api/admin/create-candidate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
     
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        handleSuccess(data.message || 'Candidate created successfully');
        setCandidates((prev) => [...prev, data.candidate]);
        resetForm();
        closeModal();
      } else {
        handleError(data.message || 'Failed to create candidate');
      }
    } catch (error) {
      console.error('Error creating candidate:', error);
      handleError('An error occurred while creating the candidate');
    }
  };

  useEffect (()=>{
     const fetchCandidates = async ()=>{
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/admin/get-candidate',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`,
          },
        });
        const data = await response.json();
        const {message} = data;
        console.log('api response',data);
        if(data.candidates && Array.isArray(data.candidates)){
          setCandidates(data.candidates);
          handleSuccess(message)
        }
        else{
          console.log('unexpected api format');
          setCandidates([]);
          handleError(message)

        }
        
      } catch (error) {
         console.log('error',error);
         setCandidates([]);
      }
     };fetchCandidates();
  },[]);


  const deleteCandidate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/admin/delete-candidate/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      const { message } = data;
  
      if (message === "Candidate deleted successfully") {
        handleSuccess(message);
        // Update UI by removing the deleted candidate
        setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate._id !== id));
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
      handleError('An error occurred while deleting the candidate.');
    }
  };
  

  
  
  
  
  return (
    <div className="p-6 mt-52">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Party</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Vote Count</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {candidates.map((candidate) => (
    <tr key={candidate._id}> {/* Add a unique key for each row */}
      <td className="border px-4 py-2">{candidate.name}</td>
      <td className="border px-4 py-2">{candidate.party}</td>
      <td className="border px-4 py-2">{candidate.age}</td>
      <td className="border px-4 py-2">
        <img
          src={`http://localhost:8000/${candidate.candidateImageUrl}`} alt={`${candidate.name} Logo`}
          className="h-12 w-12 rounded"
        />
      </td>
      <td className="border px-4 py-2">{candidate.voteCount}</td> {/* Assuming voteCount is dynamic */}
      <td className="border px-4 py-2 space-x-2">
        <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Update
        </button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={()=>deleteCandidate(candidate._id)} >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden"
      >
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Create Candidate</h2>
          <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >{({ setFieldValue })=>(
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <Field
                type="text"
                name="name"
                placeholder="Enter name"
                className="w-full px-3 py-2 border rounded"
                
              />
              <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Party</label>
              <Field
                type="text"
                name="party"
                placeholder="Enter party"
                className="w-full px-3 py-2 border rounded"
                
              />
              <ErrorMessage
                    name="party"
                    component="div"
                    className="text-red-500 text-sm"
                  />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <Field
                type="number"
                name="age"
                placeholder="Enter age"
                className="w-full px-3 py-2 border rounded"
                
              />
              <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm"
                  />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                name="candidateImage"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setFieldValue("candidateImage", e.target.files[0])}

                
              />
              <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm"
                  />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </Form>
          )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;















//with update


// import React, { useEffect, useRef, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { handleError, handleSuccess } from '../utils';

// function AdminDashboard() {
//   const modalRef = useRef(null);
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   const openModal = (candidate = null) => {
//     setSelectedCandidate(candidate);
//     if (modalRef.current) {
//       modalRef.current.classList.remove("hidden");
//     }
//   };

//   const closeModal = () => {
//     if (modalRef.current) {
//       modalRef.current.classList.add("hidden");
//     }
//     setSelectedCandidate(null);  // Reset selected candidate
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     party: Yup.string().required("Party is required"),
//     age: Yup.number().required("Age is required").min(18, "Age must be at least 18"),
//     candidateImage: Yup.mixed().nullable(),
//   });

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
//       formData.append('name', values.name);
//       formData.append('party', values.party);
//       formData.append('age', values.age);
//       if (values.candidateImage) {
//         formData.append('candidateImage', values.candidateImage);
//       }

//       let response;
//       let url = 'http://localhost:8000/api/admin/create-candidate'; // Default to Create
//       let method = 'POST'; // Default to POST for Create

//       if (selectedCandidate) {
//         // Update API URL and method if selectedCandidate is present
//         url = `http://localhost:8000/api/admin/update-candidates/${selectedCandidate._id}`;
//         method = 'PUT';
//       }

//       response = await fetch(url, {
//         method: method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         handleSuccess(data.message || 'Candidate saved successfully');
        
//         // Update the candidates state (add or update based on action)
//         if (selectedCandidate) {
//           // Update the candidate in the list
//           setCandidates((prev) => prev.map((candidate) => 
//             candidate._id === selectedCandidate._id ? { ...candidate, ...data.candidate } : candidate
//           ));
//         } else {
//           // Add the new candidate to the list
//           setCandidates((prev) => [...prev, data.candidate]);
//         }

//         resetForm();
//         closeModal();
//       } else {
//         handleError(data.message || 'Failed to save candidate');
//       }
//     } catch (error) {
//       console.error('Error saving candidate:', error);
//       handleError('An error occurred while saving the candidate');
//     }
//   };

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:8000/api/admin/get-candidate', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();

//         if (data.candidates && Array.isArray(data.candidates)) {
//           setCandidates(data.candidates);
//           handleSuccess(data.message);
//         } else {
//           setCandidates([]);
//           handleError(data.message);
//         }
//       } catch (error) {
//         console.log('Error fetching candidates:', error);
//         setCandidates([]);
//       }
//     };
//     fetchCandidates();
//   }, []);

//   const deleteCandidate = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this candidate?')) return;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:8000/api/admin/delete-candidate/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (data.message === "Candidate deleted successfully") {
//         handleSuccess(data.message);
//         setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate._id !== id));
//       } else {
//         handleError(data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting candidate:', error);
//       handleError('An error occurred while deleting the candidate.');
//     }
//   };

//   return (
//     <div className="p-6 mt-52">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={() => openModal()}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Add New Candidate
//         </button>
//       </div>

//       <table className="min-w-full bg-white border border-gray-200 rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Party</th>
//             <th className="border px-4 py-2">Age</th>
//             <th className="border px-4 py-2">Image</th>
//             <th className="border px-4 py-2">Vote Count</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates.map((candidate) => (
//             <tr key={candidate._id}>
//               <td className="border px-4 py-2">{candidate.name}</td>
//               <td className="border px-4 py-2">{candidate.party}</td>
//               <td className="border px-4 py-2">{candidate.age}</td>
//               <td className="border px-4 py-2">
//                 <img
//                   src={`http://localhost:8000/${candidate.candidateImageUrl}`} alt={`${candidate.name} Logo`}
//                   className="h-12 w-12 rounded"
//                 />
//               </td>
//               <td className="border px-4 py-2">{candidate.voteCount}</td>
//               <td className="border px-4 py-2 space-x-2">
//                 <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => openModal(candidate)}>
//                   Update
//                 </button>
//                 <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => deleteCandidate(candidate._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add/Update Modal */}
//       <div
//         ref={modalRef}
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden"
//       >
//         <div className="bg-white p-6 rounded shadow-lg w-96">
//           <h2 className="text-2xl font-bold mb-4">{selectedCandidate ? "Update Candidate" : "Add New Candidate"}</h2>
//           <Formik
//             initialValues={{
//               name: selectedCandidate ? selectedCandidate.name : '',
//               party: selectedCandidate ? selectedCandidate.party : '',
//               age: selectedCandidate ? selectedCandidate.age : '',
//               candidateImage: null,
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ setFieldValue }) => (
//               <Form>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Name</label>
//                   <Field
//                     type="text"
//                     name="name"
//                     placeholder="Enter name"
//                     className="w-full px-3 py-2 border rounded"
//                   />
//                   <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Party</label>
//                   <Field
//                     type="text"
//                     name="party"
//                     placeholder="Enter party"
//                     className="w-full px-3 py-2 border rounded"
//                   />
//                   <ErrorMessage name="party" component="div" className="text-red-500 text-sm" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Age</label>
//                   <Field
//                     type="number"
//                     name="age"
//                     placeholder="Enter age"
//                     className="w-full px-3 py-2 border rounded"
//                   />
//                   <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Image</label>
//                   <input
//                     type="file"
//                     name="candidateImage"
//                     accept="image/*"
//                     onChange={(event) => setFieldValue("candidateImage", event.currentTarget.files[0])}
//                     className="w-full px-3 py-2 border rounded"
//                   />
//                   <ErrorMessage name="candidateImage" component="div" className="text-red-500 text-sm" />
//                 </div>
//                 <div className="flex justify-between mt-4">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     {selectedCandidate ? "Update" : "Add"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;








