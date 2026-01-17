import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-REMINDER] ${step}${detailsStr}`);
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
    
    const { email, patientName, doctorName, specialty, appointmentTime, consultationLink } = await req.json();
    logStep("Request parsed", { email, doctorName });

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
          .alert-box { background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 30px; }
          .alert-box .time { font-size: 48px; font-weight: bold; color: #92400E; }
          .alert-box p { color: #92400E; margin: 10px 0 0 0; }
          .details-card { background-color: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #6b7280; font-size: 14px; }
          .detail-value { color: #111827; font-weight: 600; font-size: 14px; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #0D9488 0%, #14B8A6 100%); color: white; text-decoration: none; padding: 18px 36px; border-radius: 8px; font-weight: 600; font-size: 18px; margin: 20px 0; }
          .tips { background-color: #EFF6FF; border-radius: 12px; padding: 20px; margin: 24px 0; }
          .tips h4 { color: #1E40AF; margin: 0 0 12px 0; }
          .tips ul { color: #3B82F6; margin: 0; padding-left: 20px; }
          .tips li { margin: 8px 0; }
          .footer { text-align: center; padding: 30px; color: #6b7280; font-size: 12px; background-color: #f8f9fa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MediConnect</h1>
          </div>
          <div class="content">
            <div class="alert-box">
              <div class="time">30 min</div>
              <p>Until your consultation begins</p>
            </div>

            <h2 style="text-align: center; color: #111827;">Hi ${patientName}!</h2>
            <p style="text-align: center; color: #6b7280;">Your video consultation is about to start. Make sure you're ready!</p>
            
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
                <span class="detail-label">Time</span>
                <span class="detail-value">${appointmentTime}</span>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${consultationLink || 'https://id-preview--f244afee-160c-4404-82b3-667a8883a952.lovable.app/consultation/1'}" class="cta-button">
                Join Consultation Now
              </a>
            </div>

            <div class="tips">
              <h4>Quick Checklist:</h4>
              <ul>
                <li>Find a quiet, well-lit space</li>
                <li>Check your camera and microphone</li>
                <li>Have your medical documents ready</li>
                <li>Prepare any questions you want to ask</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <p>2024 MediConnect. All rights reserved.</p>
            <p>Need help? Contact us at support@mediconnect.com</p>
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
        subject: "Your Consultation Starts in 30 Minutes - MediConnect",
        html: htmlContent,
      }),
    });

    const data = await res.json();
    logStep("Reminder email sent successfully", { data });

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
