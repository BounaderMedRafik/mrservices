import { ReservationsProps } from "@/lib/mockData";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useReservationsByProfessional(professsionalid: string | null) {
  const [reservations, setReservations] = useState<ReservationsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!professsionalid) return;

    const fetchReservations = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("professsionalid", professsionalid)
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
      .channel(`reservation-changes-${professsionalid}`)
      .on(
        "postgres_changes",
        {
          event: "*", // listen to INSERT, UPDATE, DELETE
          schema: "public",
          table: "reservations",
          filter: `professsionalid=eq.${professsionalid}`,
        },
        () => {
          fetchReservations(); // re-fetch reservations on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // cleanup on unmount
    };
  }, [professsionalid]);

  return { reservations, loading, error };
}
