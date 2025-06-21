import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { ReservationsProps } from "@/lib/mockData";

export function useReservationsByUser(userid: string | null) {
  const [reservations, setReservations] = useState<ReservationsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userid) return;

    const fetchReservations = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("userid", userid)
        .order("time", { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setReservations(data as ReservationsProps[]);
      }

      setLoading(false);
    };

    fetchReservations();

    const channel = supabase
      .channel(`user-reservations-${userid}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reservations",
          filter: `userid=eq.${userid}`,
        },
        () => {
          fetchReservations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userid]);

  return { reservations, loading, error };
}
