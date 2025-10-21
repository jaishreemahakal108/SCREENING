// import axios from 'axios';
// import { Loader2Icon } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner';

// function QuestionList({formData}) {

//     const [loading,setLoading] = useState(true);

//     useEffect(() => {
//         if(formData){
//             GenerateQuestionList();
//         }
//     },[formData])

//     const GenerateQuestionList = async () => {
//         setLoading(true);
//         try {
//             const result = await axios.post('/api/ai-model',{
//                 ...formData
//             })
//             console.log(result.data.questions);
//             setLoading(false);
//         } 
//         catch (error) {
//             toast('Server Error,Try Again!')
//             setLoading(false); 
//         }
//     }
//   return (
//     <div>
//         {
//             loading&&(<div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>
//                 <Loader2Icon className='animate-spin'/>
//                 <div>
//                     <h2>Please Wait , Generating Interview Questions</h2>
//                     <p>AI-Model is crafting personalized questions based on your job position & description </p>
//                 </div>
//             </div>
//         )}
//     </div>
//   )
// }

// export default QuestionList

import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData , onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const {user} = useUser();
  const [saveLoading , setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      const Content = result.data.content || "";
      const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");

      let parsed = [];
      try {
        parsed = JSON.parse(FINAL_CONTENT)?.interviewQuestions || [];
      } catch (err) {
        console.error("JSON Parse Error:", err);
        toast("Invalid AI response format. Try again!");
      }

      setQuestionList(parsed);
    } catch (error) {
      toast("Server Error, Try Again!");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    if (Number(user?.credits) <= 0) {
      toast("You don’t have enough credits. Please add credits.");
      return;
    }

    setSaveLoading(true);
    const interview_id = uuidv4();

    // Save interview
    const { data, error } = await supabase
    .from('Interviews')
    .insert([
    { 
      ...formData,
      questionList:questionList, 
      userEmail:user?.email,
      interview_id:interview_id
    },
  ])
  .select()

  //Update User Credits
  const { data: updatedUser, error: updateError } = await supabase
    .from('Users')
    .update({ credits: Number(user?.credits)-1 })
    .eq('email',user?.email)
    .select()
        
    console.log(userUpdate);

  setSaveLoading(false);
  // console.log(data);

  onCreateLink(interview_id);

  }

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-bold">Please Wait, Generating Interview Questions</h2>
            <p>
              AI-Model is crafting personalized questions based on your job
              position & description
            </p>
          </div>
        </div>
      )}
      <div>
        <h2 className="font-bold text-lg mb-5">Generated Interview Questions :-</h2>
      </div>
      {questionList.length > 0 && 
      (
        <div className="p-5 border border-gray-300 rounded-xl space-y-3">
          {questionList.map((item, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-xl mb-3">
              <h2 className="font-bold">{item.question}</h2>
              <h2 className="text-sm text-gray-500">Type: {item?.type}</h2>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-10">
        <Button onClick={()=>onFinish()} disabled={saveLoading}>
          {saveLoading&&<Loader2Icon className="animate-spin"/>}
          Create Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;