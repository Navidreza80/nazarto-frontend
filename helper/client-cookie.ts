/* eslint-disable */

export const setClientCookie = (name: string, value: string, eMin: number) => {
  let expires = "";
  if (eMin) {
    const date = new Date();
    date.setTime(date.getTime() + eMin * 60 * 1000);
    expires = `; expires = ${date.toUTCString()} `;
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export function getClientCookie(name: string) {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca: any = typeof window != "undefined" && document.cookie.split(";");
  const cookieValue = ca
    .map((c: any) => c.trim())
    .find((c: any) => c.indexOf(nameEQ) === 0);
  if (cookieValue) {
    return cookieValue.substring(nameEQ.length, cookieValue.length);
  }
  return null;
}

export const deleteClientCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
