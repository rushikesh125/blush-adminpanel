export const productsURL = "https://fakestoreapi.com/products";
export const productURL = `https://fakestoreapi.com/products/`;

export const Domain = "https://blush-shop.vercel.app"
export async function fetchProductInfo(id) {
  try {
    const response = await fetch(productURL + id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const productInfo = await response.json();
    return { success: true, data: productInfo };
  } catch (error) {
    console.error("Error fetching product info:", error);
    return { success: false, error: error.message };
  }
}

export function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;
}