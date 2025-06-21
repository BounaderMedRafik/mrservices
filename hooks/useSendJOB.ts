// lib/hooks/useSendJobRequest.ts
import { RequestOfJOBprops } from "@/lib/mockData";
import supabase from "@/lib/supabase";
import { useState } from "react";

export function useSendJobRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendRequest = async (
    data: Omit<RequestOfJOBprops, "id" | "created_at">
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.from("requests").insert({
      ...data,
      skills: data.skills, // ensure array is passed correctly
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      console.log(error);
    } else {
      setSuccess(true);
    }
  };

  return { sendRequest, loading, error, success };
}
