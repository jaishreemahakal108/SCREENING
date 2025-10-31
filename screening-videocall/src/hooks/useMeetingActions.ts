// import { useRouter } from "next/navigation";
// import { useStreamVideoClient } from "@stream-io/video-react-sdk";
// import toast from "react-hot-toast";

// const useMeetingActions = () => {
//   const router = useRouter();
//   const client = useStreamVideoClient();

//   const createInstantMeeting = async () => {
//     if (!client) return;

//     try {
//       const id = crypto.randomUUID();
//       const call = client.call("default", id);

//       await call.getOrCreate({
//         data: {
//           starts_at: new Date().toISOString(),
//           custom: {
//             description: "Instant Meeting",
//           },
//         },
//       });

//       router.push(`/meeting/${call.id}`);
//       toast.success("Meeting Created");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to create meeting");
//     }
//   };

//   const joinMeeting = (callId: string) => {
//     if (!client) return toast.error("Failed to join meeting. Please try again.");
//     router.push(`/meeting/${callId}`);
//   };

//   return { createInstantMeeting, joinMeeting };
// };

// export default useMeetingActions;

import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();

  const createInstantMeeting = async (sendEmail: boolean = false) => {
    if (!client) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Instant Meeting",
          },
        },
      });

      const hostUrl = process.env.NEXT_PUBLIC_HOST_URL || window.location.origin;
      const meetingLink = `${hostUrl}/meeting/${call.id}`;

      if (sendEmail) {
        const subject = `Interview Invitation - Technical Interview`;
        const body = `Dear Candidate,

        I hope this message finds you well.

        You have been invited to attend a technical interview.

        Please join the interview using the link below:
        ${meetingLink}

        Duration: 30 minutes

        If you have any questions or scheduling conflicts, feel free to reply to this email.

        Best regards,
        Rajaswa Anand`;

        // ✅ open default mail client
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      router.push(`/meeting/${call.id}`);
      toast.success(sendEmail ? "Meeting created and invite opened!" : "Meeting created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting");
    }
  };

  const joinMeeting = (callId: string) => {
    if (!client) return toast.error("Failed to join meeting. Please try again.");
    router.push(`/meeting/${callId}`);
  };

  return { createInstantMeeting, joinMeeting };
};

export default useMeetingActions;