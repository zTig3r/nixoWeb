export async function fetcher(url: string, method: any) {
    const res = await fetch("https://" + location.hostname + "/" + url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
    });
  
    return await res.json();
  }