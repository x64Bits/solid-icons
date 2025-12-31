export interface MetaFile {
  shortName: string;
  packName: string;
  license: string;
  url: string;
  path: string;
  count: number;
}

const getMetaFile = async (): Promise<MetaFile[]> => {
  // Determine the base path based on environment
  const baseUrl = import.meta.env.PROD
    ? window.location.origin // or your specific production domain
    : window.location.origin;

  // Point to the file in /public/meta.js (served at root /meta.js)
  const path = `${baseUrl}/meta.js`;

  try {
    const module = await import(/* @vite-ignore */ path);
    return module.default;
  } catch (error) {
    console.error("Failed to load meta.js from public folder:", error);
    return [];
  }
};

export default getMetaFile;
