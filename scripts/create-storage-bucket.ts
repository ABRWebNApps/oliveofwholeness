import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client with admin rights
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Note: This needs to be the service_role key, not the anon key
);

async function createStorageBucket() {
  try {
    // Create the bucket
    const { data: bucket, error: createError } =
      await supabase.storage.createBucket("community-images", {
        public: true, // Makes the bucket public
        fileSizeLimit: 5242880, // 5MB in bytes
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ],
      });

    if (createError) {
      throw createError;
    }

    console.log("Successfully created bucket:", bucket);

    // Set up public policy for the bucket
    const { error: policyError } = await supabase.storage
      .from("community-images")
      .createSignedUrl("test.txt", 60); // This is just to test the bucket is working

    if (policyError) {
      console.log("Error setting bucket policy:", policyError);
      return;
    }

    console.log("Successfully configured bucket with public access!");
  } catch (error) {
    if (error instanceof Error) {
      // If the bucket already exists, this is fine
      if (error.message.includes("Bucket already exists")) {
        console.log("Bucket already exists, skipping creation.");
        return;
      }
      console.error("Error creating bucket:", error.message);
    }
  }
}

// Run the function
createStorageBucket();
