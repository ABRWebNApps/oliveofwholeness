# Setting up Storage Bucket for Community Images

Follow these steps to set up the storage bucket for community images:

## Method 1: Using the Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Click on "Storage" in the left sidebar
3. Click "Create new bucket"
4. Enter "community-images" as the bucket name
5. Check "Public bucket" to make it publicly accessible
6. Click "Create bucket"
7. After creation, click on "Policies"
8. Add the following policies:

For SELECT (download/view) operations:

```sql
true  -- This allows anyone to view the images
```

For INSERT (upload) operations:

```sql
role() = 'authenticated'  -- This allows only authenticated users to upload
```

## Method 2: Using the Script (Alternative)

1. First, get your service role key:

   - Go to your Supabase project dashboard
   - Click on "Project Settings" (the gear icon)
   - Click on "API"
   - Copy the "service_role" key (NOT the anon/public key)

2. Set up your environment variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. Run the script:
   ```bash
   npx tsx scripts/create-storage-bucket.ts
   ```

## Verifying the Setup

1. Go to "Storage" in your Supabase dashboard
2. You should see a "community-images" bucket
3. The bucket should be marked as public
4. Click on the bucket and try uploading a test image
5. You should be able to access the image via its public URL

## Important Notes

- The bucket is configured with a 5MB file size limit
- Allowed file types: JPEG, PNG, GIF, and WebP
- Only authenticated users can upload images
- Anyone can view the uploaded images
- Image URLs will be in the format: `https://[PROJECT_ID].supabase.co/storage/v1/object/public/community-images/[FILE_NAME]`

If you encounter any issues or need to modify these settings, you can adjust them in the Supabase dashboard under Storage > Buckets > community-images > Settings.
