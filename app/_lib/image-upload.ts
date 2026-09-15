export const imageUploadEndpoint = "https://mini.liyansheng.top/v1/api/image/upload";

type ImageUploadResponse = {
  imageUrl?: string[];
  msg?: string;
  message?: string;
};

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(imageUploadEndpoint, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error("图片上传失败，请检查网络连接后重试");
  }

  if (!response.ok) {
    throw new Error(`图片上传失败（${response.status}），请稍后重试`);
  }

  const data = (await response.json()) as ImageUploadResponse;
  const imageUrl = data.imageUrl?.[0];

  if (!imageUrl) {
    throw new Error(data.msg || data.message || "图片上传失败，服务未返回图片地址");
  }

  return imageUrl;
}
