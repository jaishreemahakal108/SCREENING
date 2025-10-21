// "use client"
// import { useUser } from '@/app/provider';
// import { supabase } from '@/services/supabaseClient';
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import InterviewDetailContainer from '../../_components/InterviewDetailContainer';
// import CandidateList from '../../_components/CandidateList';

// function InterviewDetail() {

//     const {interview_id} = useParams();
//     const {user} = useUser();
//     const [interviewDetail,setInterviewDetail] = useState();

//     useEffect(() => {
//         if (user?.email) {
//           GetInterviewList();
//         }
//     }, [user]);

//     const GetInterviewList = async () => {
//         console.log("interview_id:", interview_id, "type:", typeof interview_id);

//         const { data, error } = await supabase
//         .from("Interviews")
//         .select(`
//             jobDescription,
//             jobPosition,
//             type,
//             duration,
//             questionList,
//             interview_id,
//             userEmail,
//             created_at,
//             interview-feedback(userEmail,userName,feedback,created_at)
//         `)
//         .eq("userEmail", user?.email)
//         .eq("interview_id", interview_id)
//         .single();

//         if (error) {
//             console.error("Supabase error:", error.message || error);
//             return;
//         }

//         console.log("Fetched interview:", data);
//         setInterviewDetail(data);   
//     };


//   return (
//     <div className='mt-5'>
//         <h2 className='font-bold text-2xl'>Interview Detail</h2>
//         <InterviewDetailContainer interviewDetail={interviewDetail} />
//         <CandidateList candidateList={interviewDetail?.['interview-feedback']} />
//     </div>
//   )
// }

// export default InterviewDetail

// "use client"
// import { useUser } from '@/app/provider';
// import { supabase } from '@/services/supabaseClient';
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import InterviewDetailContainer from '../../_components/InterviewDetailContainer';
// import CandidateList from '../../_components/CandidateList';

// function InterviewDetail() {
//   const { interview_id } = useParams();
//   const { user } = useUser();
//   const [interviewDetail, setInterviewDetail] = useState();

//   useEffect(() => {
//     if (user?.email) {
//       GetInterviewDetail();
//     }
//   }, [user]);

//   const GetInterviewDetail = async () => {
//     const { data, error } = await supabase
//       .from("Interviews")
//       .select(`
//         jobDescription,
//         jobPosition,
//         type,
//         duration,
//         questionList,
//         interview_id,
//         userEmail,
//         created_at,
//         interview-feedback(userEmail,userName,feedback,created_at)
//       `)
//       .eq("userEmail", user?.email)
//       .eq("interview_id", interview_id)
//       .single();

//     if (error) {
//       console.error("Supabase error:", error.message || error);
//       return;
//     }
//     setInterviewDetail(data);
//   };

//   return (
//     <div className="mt-8 space-y-6">
//       <h2 className="font-bold text-3xl mb-6">Interview Detail</h2>
      
//       <InterviewDetailContainer interviewDetail={interviewDetail} />

//       <CandidateList candidateList={interviewDetail?.['interview-feedback']} />
//     </div>
//   )
// }

// export default InterviewDetail


"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from '../../_components/InterviewDetailContainer';
import CandidateList from '../../_components/CandidateList';

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      GetInterviewDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetInterviewDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Interviews")
      .select(`
        jobDescription,
        jobPosition,
        type,
        duration,
        questionList,
        interview_id,
        userEmail,
        created_at,
        interview-feedback(userEmail,userName,feedback,created_at)
      `)
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id)
      .single();

    setLoading(false);

    if (error) {
      console.error("Supabase error:", error.message || error);
      return;
    }
    setInterviewDetail(data);
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="font-extrabold text-3xl mb-2 text-gray-900">Interview Detail</h2>

      <InterviewDetailContainer interviewDetail={interviewDetail} loading={loading} />

      <CandidateList candidateList={interviewDetail?.['interview-feedback']} loading={loading} />
    </div>
  )
}

export default InterviewDetail