import { generateRandomString } from "$lib/random";
import { CLIENT_ID, REDIRECT_URL } from "$env/static/private";

const authURL = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URL + "&scope=chat:read&state=";

export async function GET() {
    const state = generateRandomString(32);
    const uri = `${authURL}${state}`;

    return new Response(JSON.stringify({ uri: uri }), { status: 200 });
}