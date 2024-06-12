import type { LoaderFunction } from "@remix-run/node";
import { auth } from "~/.server/auth";

export const loader: LoaderFunction = ({ request }) => {
	return auth.authenticate("discord", request, {
		successRedirect: "/",
		failureRedirect: "/",
	});
};
