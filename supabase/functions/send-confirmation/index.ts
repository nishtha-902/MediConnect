import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-CONFIRMATION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    
    const { email, patientName, doctorName, specialty, appointmentDate, appointmentTime, consultationType } = await req.json();
    logStep("Request parsed", { email, doctorName, appointmentDate });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #0D9488 0%, #14B8A6 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; }
          .success-icon { text-align: center; margin-bottom: 30px; }
          .details-card { background-color: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #6b7280; font-size: 14px; }
          .detail-value { color: #111827; font-weight: 600; font-size: 14px; }
          .reminder { background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #0D9488 0%, #14B8A6 100%); color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .footer { text-align: center; padding: 30px; color: #6b7280; font-size: 12px; background-color: #f8f9fa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MediConnect</h1>
          </div>
          <div class="content">
            <div class="success-icon">
              <span style="display: inline-flex; width: 80px; height: 80px; background-color: #10B981; border-radius: 50%; align-items: center; justify-content: center; font-size: 40px; color: white;">✓</span>
            </div>
            <h2 style="text-align: center; color: #111827; margin-bottom: 10px;">Appointment Confirmed!</h2>
            <p style="text-align: center; color: #6b7280;">Hello ${patientName}, your consultation has been successfully booked.</p>
            
            <div class="details-card">
              <div class="detail-row">
                <span class="detail-label">Doctor</span>
                <span class="detail-value">${doctorName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Specialty</span>
                <span class="detail-value">${specialty}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date</span>
                <span class="detail-value">${appointmentDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time</span>
                <span class="detail-value">${appointmentTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Type</span>
                <span class="detail-value">${consultationType || 'Video Consultation'}</span>
              </div>
            </div>

            <div class="reminder">
              <strong>Reminder:</strong> You'll receive another email 30 minutes before your consultation with the link to join.
            </div>

            <div style="text-align: center;">
              <a href="https://id-preview--f244afee-160c-4404-82b3-667a8883a952.lovable.app/appointments" class="cta-button">
                View My Appointments
              </a>
            </div>
          </div>
          <div class="footer">
            <p>2024 MediConnect. All rights reserved.</p>
            <p>Questions? Contact us at support@mediconnect.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MediConnect <onboarding@resend.dev>",
        to: [email],
        subject: "Appointment Confirmation - MediConnect",
        html: htmlContent,
      }),
    });

    const data = await res.json();
    logStep("Email sent successfully", { data });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    logStep("ERROR", { message: error.message });
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
