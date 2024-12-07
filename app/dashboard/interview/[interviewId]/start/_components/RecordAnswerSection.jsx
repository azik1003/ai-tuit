"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
   
      } = useSpeechToText({
        continuous:true,
        useLegacyResults: false
      });

      useEffect(()=>{
       
        results?.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer?.length>10)
        {
          UpdateUserAnswer();
        } 
      },[userAnswer])

      useEffect(() => {
        if (results?.length) {
            const transcript = results.map((r) => r.transcript).join(" ");
            setUserAnswer((prev) => prev + " " + transcript);
            setResults([]); // Clear results to avoid duplication
        }
    }, [results]);
    
         
      const StartStopRecording=async()=>{
        if(isRecording)
        {
          stopSpeechToText()
        }
        else{
          startSpeechToText();
        }
      }

      const UpdateUserAnswer = async () => {
        setLoading(true);
    
        try {
            const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please provide feedback as JSON with "rating" and "feedback" fields.`;
            const result = await chatSession.sendMessage(feedbackPrompt);
            const responseText = await result.response.text();
    
            let JsonFeedbackResp;
            try {
                JsonFeedbackResp = JSON.parse(responseText.replace('```json', '').replace('```', ''));
            } catch (jsonError) {
                console.error("JSON Parse Error:", jsonError);
                toast.error("Failed to parse AI feedback. Please try again.");
                setLoading(false);
                return;
            }
    
            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-yyyy"),
            });
    
            if (resp) {
                toast.success("User Answer recorded successfully");
                setUserAnswer('');
                setResults([]);
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to save user answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    


  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
            <Image src={'/webcam.png'} width={200} height={200} alt={'camera'}
            className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:500,
                width:500,
                zIndex:10,
            }}
            />
        </div>
        <Button 
        disabled={loading}
        variant="outline" className="my-10"
        onClick={StartStopRecording}
        >
            {isRecording?
            <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                <StopCircle/>Stop Recording
            </h2>
            :
            
            <h2 className='text-primary flex gap-2 items-center'>
              <Mic/>  Record Answer</h2> }</Button>
      
     
    </div>
  )
}

export default RecordAnswerSection