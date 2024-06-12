import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { auth } from "~/.server/auth"
import type { DiscordUser } from "~/.server/auth";

export const loader: LoaderFunction = async ({ request }) => {
	return await auth.isAuthenticated(request);
};

export default function DashboardPage() {
	const user = useLoaderData<DiscordUser>();
	if (user) {
		return (
			<div>
				<h1>Welcome {user.displayName}</h1>
				<Form action="/auth/logout" method="post">
					<button type="submit">Logout</button>
				</Form>
			</div>
		)
	} else {
		return (
			<div>
				<Form action="/auth/discord" method="post">
					<button>Login with Discord</button>
				</Form>
			</div>
		)
	}
}

export const meta: MetaFunction = () => {
	return [
		{ title: "Example Remix Discord Auth" },
	];
};

