/**
 * Get the correct asset path with base URL for GitHub Pages deployment
 * @param path - The asset path starting with /assets/...
 * @returns The full path including the base URL
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Get base URL from Vite (will be /hhindex/ in production, / in development)
  const baseUrl = import.meta.env.BASE_URL;
  
  // Combine base URL with asset path
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get the correct image path
 * @param imagePath - The image path starting with /assets/images/...
 * @returns The full path including the base URL
 */
export function getImagePath(imagePath: string): string {
  return getAssetPath(imagePath);
}
