import { generateRandomString } from "$lib/random";

import { CLIENT_ID, ACCEPT } from "$env/static/private";

export async function GET({ url }: { url: any }) {
	const token = url.searchParams.get("token");

	const headers = {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json",
		"Client-Id": CLIENT_ID,
	};

	try {
		const res = await fetch("https://api.twitch.tv/helix/users", { method: "GET", headers });
		const data = await res.json();

		const twitchID = data["data"][0]["id"];

		if (twitchID === ACCEPT) {
			return new Response(JSON.stringify({ authorized: true, login: data["data"][0]["login"], auth: btoa(generateRandomString(64)), profileImage : data["data"][0]["profile_image_url"] }), { status: 200 });
		} else return new Response(JSON.stringify({ authorized: false }), { status: 403 });

	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
	}
}