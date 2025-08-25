export default async function fetchUtil<T>(endpoint: string) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`[ERROR]: ${response.statusText}`);
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(`[ERROR]: ${error}`)
  }
}
