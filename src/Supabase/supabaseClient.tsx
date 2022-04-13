import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabaseUrl = "https://oiypxopjelkiypbcmmmz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9peXB4b3BqZWxraXlwYmNtbW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcyMDUzMjEsImV4cCI6MTk2Mjc4MTMyMX0.zbfMbDVaoF-jO-wCPG-aYoOrePzz-5CWLcxPhs2uuA8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
