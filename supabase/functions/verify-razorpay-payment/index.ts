import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-RAZORPAY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    logStep("Request body parsed", { razorpay_order_id, razorpay_payment_id });

    // Retrieve authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { email: user.email });

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeySecret) {
      throw new Error("Razorpay secret not configured");
    }

    // Verify signature using Web Crypto API
    const encoder = new TextEncoder();
    const data_to_verify = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(razorpayKeySecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(data_to_verify)
    );
    
    const generated_signature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    logStep("Signature verification", { 
      generated: generated_signature.substring(0, 20) + "...", 
      received: razorpay_signature.substring(0, 20) + "..." 
    });

    if (generated_signature !== razorpay_signature) {
      throw new Error("Payment verification failed - invalid signature");
    }

    logStep("Payment verified successfully", { payment_id: razorpay_payment_id });

    return new Response(JSON.stringify({ 
      success: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage, success: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
