import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  console.log(`[SCHEDULE-REMINDER] ${step}`, details ? JSON.stringify(details) : '');
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { appointmentId, appointmentDateTime, email, patientName, doctorName, specialty } = await req.json();
    
    logStep("Scheduling reminder", { appointmentId, appointmentDateTime, email });

    // Calculate reminder time (10 minutes before appointment)
    const appointmentTime = new Date(appointmentDateTime);
    const reminderTime = new Date(appointmentTime.getTime() - 10 * 60 * 1000);
    
    logStep("Reminder scheduled for", { reminderTime: reminderTime.toISOString() });

    // For immediate testing and demo purposes, we'll trigger the reminder check
    // In production, you'd use pg_cron to check for upcoming appointments
    const now = new Date();
    const timeDiff = reminderTime.getTime() - now.getTime();
    
    if (timeDiff > 0 && timeDiff <= 15 * 60 * 1000) {
      // If reminder time is within 15 minutes, send immediately
      logStep("Appointment is within 15 minutes, sending reminder now");
      
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      // Call send-reminder function
      const { error } = await supabase.functions.invoke('send-reminder', {
        body: {
          email,
          patientName,
          doctorName,
          specialty,
          appointmentDate: appointmentTime.toLocaleDateString(),
          appointmentTime: appointmentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      });

      if (error) {
        logStep("Error sending reminder", { error: error.message });
      } else {
        logStep("Reminder sent successfully");
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Reminder scheduled",
        reminderTime: reminderTime.toISOString()
      }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    logStep("Error scheduling reminder", { error: error.message });
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
