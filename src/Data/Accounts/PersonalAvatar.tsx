import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Avatar, AvatarsGroup, Button } from "@mantine/core";

const PersonalAvatar = ({ url, onUpload }: any) => {
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: any) {
    try {
      const { data, error }: any = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url: any = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <Avatar size="xl" src={avatarUrl} alt="Avatar" mb={4} />
      ) : (
        <Avatar size="xl" src={avatarUrl} alt="Avatar" mb={4} />
      )}
      <div>
        <Button size="lg">
          <label className="button primary block" htmlFor="single">
            {uploading ? "Uploading ..." : "Upload"}
          </label>
        </Button>

        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default PersonalAvatar;
