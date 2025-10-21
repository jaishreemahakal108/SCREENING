import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";
import { Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, UsersIcon } from "lucide-react"; 


export const SideBarOptions = [
    {
        name : 'Dashboard',
        icon : LayoutDashboard,
        path : '/dashboard'
    },

    {
        name : 'Scheduled Interview',
        icon : Calendar,
        path : '/scheduled-interview'
    },

    {
        name : 'All Interview',
        icon : List,
        path : '/all-interview'
    },

    {
        name : 'Billing',
        icon : WalletCards,
        path : '/billing'
    },

    // {
    //     name : 'Settings',
    //     icon : Settings,
    //     path : '/settings'
    // },
]

export const InterviewType = [
  {
    title: 'Technical',
    icon: Code2Icon,
  },
  {
    title: 'Behavioral',
    icon: User2Icon,
  },
  {
    title: 'Experience',
    icon: BriefcaseBusinessIcon,
  },
  {
    title: 'Problem Solving',
    icon: Puzzle,
  },
  {
    title: 'Leadership',
    icon: UsersIcon,
  },
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration.
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

🍀 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
 {
 question:"",
 type:'Technical/Behavioral/Experience/Problem Solving/Leadership'
 },
 ...
] 

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;


export const FEEDBACK_PROMPT=
`
  {{conversation}}

  Based on this Interview Conversation between assistant and user,  
  give me structured feedback in JSON format.  

  Include the following:  
  - Rating out of 10 for: technicalSkills, communication, problemSolving, experience, teamwork, attitude  
  - OverallScore (average of ratings) and OverallGrade (Excellent/Good/Average/Poor)  
  - A short summary in 3 lines about the candidate’s performance  
  - Strengths (list of positive points)  
  - Weaknesses (list of areas to improve)  
  - Suggestions (actionable improvements for the candidate)  
  - Recommendation (Yes/No)  
  - RecommendationMsg (1 line reason for hire or not)  
  - InterviewMeta: duration, interviewer, jobPosition  

  Format your response in valid JSON only.  

  Example output:
  {
    "feedback": {
      "rating": {
        "technicalSkills": 7,
        "communication": 8,
        "problemSolving": 6,
        "experience": 7,
        "teamwork": 8,
        "attitude": 9
      },
      "overallScore": 7.5,
      "overallGrade": "Good",
      "summary": "The candidate showed strong communication and teamwork skills. Technical knowledge was good but problem-solving can be improved. Overall, they demonstrated a positive attitude and readiness to learn.",
      "strengths": ["Clear communication", "Positive attitude", "Good teamwork"],
      "weaknesses": ["Needs more practice in problem-solving", "Backend fundamentals could be stronger"],
      "suggestions": ["Solve 2-3 coding challenges daily", "Revise backend concepts like Node.js"],
      "Recommendation": "Yes",
      "RecommendationMsg": "Recommended for hire with focus on technical improvement",
      "interviewMeta": {
        "duration": "40 mins",
        "interviewer": "AI Recruiter",
        "jobPosition": "Full Stack Developer"
      }
    }
  }
`