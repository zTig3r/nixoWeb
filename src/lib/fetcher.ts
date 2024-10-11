export async function fetcher(url: string, method: any) {
    const res = await fetch("http://" + location.hostname + ":5173/" + url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
    });
  
    return await res.json();
  }