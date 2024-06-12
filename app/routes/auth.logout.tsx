import type { ActionFunction } from "@remix-run/node";
import { auth } from "~/.server/auth";


export const action: ActionFunction = ({ request }) => {
	return auth.logout(request, { redirectTo: "/" });
};
