// import React from 'react'

// function LiveCounting() {
//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-white space-y-6 my-36'>
//         <div className='grid md:grid-cols-1 text-center'>
//              <div className="mb-6">
//              <img
//               src="vote.svg"
//               alt="Profile Icon"
//               className="mx-auto w-24 h-24 rounded-full"
//             />
//              </div>
//              <div className="mb-6">
//              <label className='text-black'>Name</label><br/>
//              <label className='text-black'>Party</label><br/>
//              <label className='text-black'>Age</label>
//              </div>
//         </div>

//         <div className='grid md:grid-cols-1 text-center'>
//              <div className="mb-6">
//              <img
//               src="vote.svg"
//               alt="Profile Icon"
//               className="mx-auto w-24 h-24 rounded-full"
//             />
//              </div>
//              <div className="mb-6">
//              <label className='text-black'>Name</label><br/>
//              <label className='text-black'>Party</label><br/>
//              <label className='text-black'>Age</label>
//              </div>
//         </div>



//         <div className='grid md:grid-cols-1 text-center'>
//              <div className="mb-6">
//              <img
//               src="vote.svg"
//               alt="Profile Icon"
//               className="mx-auto w-24 h-24 rounded-full"
//             />
//              </div>
//              <div className="mb-6">
//              <label className='text-black'>Name</label><br/>
//              <label className='text-black'>Party</label><br/>
//              <label className='text-black'>Age</label>
//              </div>
//         </div>


//         <div className='grid md:grid-cols-1 text-center'>
//              <div className="mb-6">
//              <img
//               src="vote.svg"
//               alt="Profile Icon"
//               className="mx-auto w-24 h-24 rounded-full"
//             />
//              </div>
//              <div className="mb-6">
//              <label className='text-black'>Name</label><br/>
//              <label className='text-black'>Party</label><br/>
//              <label className='text-black'>Age</label>
//              </div>
//         </div>




//         <div className='grid md:grid-cols-1 text-center'>
//              <div className="mb-6">
//              <img
//               src="vote.svg"
//               alt="Profile Icon"
//               className="mx-auto w-24 h-24 rounded-full"
//             />
//              </div>
//              <div className="mb-6">
//              <label className='text-black'>Name</label><br/>
//              <label className='text-black'>Party</label><br/>
//              <label className='text-black'>Age</label>
//              </div>
//         </div>


//     </div>
//   )
// }

// export default LiveCounting










import React, { useEffect, useState } from 'react'

function LiveCounting() {
     const [lives,setLives] = useState([]);
     useEffect(()=>{
          const fetchcount = async()=>{
                try{
                    const token = localStorage.getItem('token');
                    const response = await fetch('http://localhost:8000/api/user/voteCounting',{
                    method:'GET',
                    headers:{
                         'Content-Type':'application/json',
                         Authorization:`Bearer ${token}`,
                    },
                    });
                    const result = await response.json();
                    console.log("api response",result);
                    if(Array.isArray(result)){
                         setLives(result);
                    }else{
                         console.error('Unexpected API response format');
                         setLives([]); 
                    }

                }catch(error){
                    console.log('there is an error',error);
                    setLives([]);
                }
          };
          fetchcount();
     },[]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white space-y-6 my-36'>
       {lives.map((live)=>(
        <div className='grid md:grid-cols-1 text-center'>
             <div className="mb-6">
             <img
              src={`http://localhost:8000/uploads/admin/candidate/${live.candidateImage}`}
              alt="Profile Icon"
              className="mx-auto w-24 h-24 rounded-full"
            />
             </div>
             <div className="mb-6">
             <label className='text-black'>{live.name}   ({live.count})</label><br/>
             <label className='text-black'>{live.party}</label><br/>
             <label className='text-black'>{live.age}</label>
             </div>
        </div>
        ))};

       </div>
  )
}

export default LiveCounting











