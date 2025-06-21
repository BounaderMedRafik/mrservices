// hooks/useCreateReservation.ts
import { ReservationsProps } from "@/lib/mockData";
import supabase from "@/lib/supabase";
import { useState } from "react";

export function useCreateReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const createReservation = async (
    data: Omit<ReservationsProps, "uuid" | "created_at">
  ) => {
    setLoading(true);
    setError(null);

    const { data: inserted, error } = await supabase
      .from("reservations")
      .insert(data)
      .select()
      .single();

    setLoading(false);

    if (error) {
      setError(error.message);
      return null;
    }

    return inserted;
  };

  return { createReservation, loading, error };
}
