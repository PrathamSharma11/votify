//designing code
// import React from 'react';
// import { Link } from 'react-router-dom';
// const Home = () => {
// return (
// <div className="bg-white">
//     <div className="container my-40">
//         <div className="text-center">
//             <h1 className="text-5xl font-bold text-red-800">VOTE NOW!!</h1>
//             <div className="flex justify-center items-center min-h-screen">
//                 <div
//                     className="mt-8 -mt-20 transform translate-y-[-20px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

//                     <img className="rounded-t-lg" src="/donald.jpeg" alt="donald Logo" />

//                     <div className="p-5">

//                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             DONALD J TRUMP
//                         </h5>

//                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                             REPUBLICAN
//                         </p>
//                         <button onClick={()=> window.location.href = '/read-more'}
//                             className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >VOTE</button>
//                         <button />
//                     </div>
//                 </div>
//             </div>



//             <div className="flex justify-center items-center min-h-screen">
//                 <div
//                     className="mt-8 -mt-20 transform translate-y-[-20px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

//                     <img className="rounded-t-lg" src="/Narendra.jpeg" alt="Narendra Logo" />

//                     <div className="p-5">

//                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             NARENDRA MODI
//                         </h5>

//                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                             BJP
//                         </p>
//                         <button onClick={()=> window.location.href = '/read-more'}
//                             className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >VOTE</button>
//                         <button />
//                     </div>
//                 </div>
//             </div>

//             <div className="flex justify-center items-center min-h-screen">
//                 <div
//                     className="mt-8 -mt-20 transform translate-y-[-20px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

//                     <img className="rounded-t-lg" src="/Putin.jpg" alt="Putin Logo" />

//                     <div className="p-5">

//                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             VLADIMIR PUTIN
//                         </h5>

//                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                             UNITED RUSSIA
//                         </p>
//                         <button onClick={()=> window.location.href = '/read-more'}
//                             className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >VOTE</button>
//                         <button />
//                     </div>
//                 </div>
//             </div>

//             <div className="flex justify-center items-center min-h-screen">
//                 <div
//                     className="mt-8 -mt-20 transform translate-y-[-20px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

//                     <img className="rounded-t-lg" src="/XiJinping.jpeg" alt="XiJinping Logo" />

//                     <div className="p-5">

//                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             XI JINPING
//                         </h5>

//                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                             CHINESE COMMUNIST 
//                         </p>
//                         <button onClick={()=> window.location.href = '/read-more'}
//                             className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >VOTE</button>
//                         <button />
//                     </div>
//                 </div>
//             </div>


//             <div className="flex justify-center items-center min-h-screen">
//                 <div
//                     className="mt-8 -mt-20 transform translate-y-[-20px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

//                     <img className="rounded-t-lg" src="/Kamala.jpeg" alt="Kamala Logo" />

//                     <div className="p-5">

//                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             KAMALA HARRIS
//                         </h5>

//                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                             DEMORATIC
//                         </p>
//                         <button onClick={()=> window.location.href = '/read-more'}
//                             className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >VOTE</button>
//                         <button />
//                     </div>
//                 </div>
//             </div>

//         </div>
//     </div>
// </div>

// );
// };

// export default Home;









//my right code
import React, { useEffect, useState } from 'react';
import { handleError,handleSuccess } from '../utils';
import { Link } from 'react-router-dom';
const Home = () => {
    const [scandidates,setCandidates] = useState([]);
    const [hasVoted,setHasVoted] = useState(false);

    useEffect(()=>{
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
                console.log('API RESPONSE:',data);
                if(data.candidates && Array.isArray(data.candidates)){
                    setCandidates(data.candidates);
                }else{
                    console.log('unexpected api response response format');
                    setCandidates([]);
                }
                
            } catch (error) {
                console.log('error fetching candidates:',error);
                setCandidates([]);
            }
        };
        fetchCandidates();
    },[]);
    const vote = async(candidateId)=>{
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/user/voting/${candidateId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`,
                },
            });
            const data = await response.json();
            const {message} = data;
            if (data.message && data.message === 'vote recorded successfully') {
                setHasVoted(true); // Set the state to true after successful voting
                alert('Thank you for voting!');
              } else {
                
                return handleError(message || "Something went wrong. Please try again.");
              }
            
            
        } catch (error) {
            console.log('Error voting:', error);
      alert('There was an error while voting. Please try again.');
        }
    };

return (
<div className="bg-white">
    <div className="container my-40">
        <div className="text-center">
            <h1 className="text-5xl font-bold text-red-800">VOTE NOW!!</h1>
            <div className="flex flex-col justify-center items-center min-h-screen">
                {scandidates.map((scandidate)=>(
                <div 
                    key={scandidate._id}
                    className="mt-8 -mt-20 transform translate-y-[-20px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <img className="rounded-t-lg" src={`http://localhost:8000/${scandidate.candidateImageUrl}`} alt={`${scandidate.name} Logo`} />

                    <div className="p-5">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {scandidate.name}
                        </h5>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {scandidate.party}
                        </p>
                        <button onClick={() => vote(scandidate._id)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            disabled={hasVoted}>{hasVoted?'Voted':'Vote'}</button>
                        <button />
                    </div>
                </div>
                ))}
            </div>



           







        </div>
    </div>

</div>


);
};

export default Home;

























