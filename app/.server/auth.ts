// app/auth.server.ts
import { Authenticator } from "remix-auth";
import type { DiscordProfile, PartialDiscordGuild } from "remix-auth-discord";
import { DiscordStrategy } from "remix-auth-discord";
import { sessionStorage } from "~/.server/session"

/**
 * In this example we will remove the features of the guilds the user is in,
 * so we have to create our own (slightly changed) type for the guilds.
 * You might need to edit this in your use case.
 */
type CustomDiscordGuild = Omit<PartialDiscordGuild, "features">;

export interface DiscordUser {
	id: DiscordProfile["id"];
	displayName: DiscordProfile["displayName"];
	avatar: DiscordProfile["__json"]["avatar"];
	email: DiscordProfile["__json"]["email"];
	locale?: string;
	guilds?: Array<CustomDiscordGuild>;
	accessToken: string;
	refreshToken: string | undefined;
}

export const auth = new Authenticator<DiscordUser>(sessionStorage);

const discordStrategy = new DiscordStrategy(
	{
		clientID: "1162319033048240280",
		clientSecret: "X02ggMrDLvqcUepvDdQjWWmgPVXveyqy",
		callbackURL: "http://localhost:3000/auth/discord/callback",
		// Provide all the scopes you want as an array
		scope: ["identify", "email", "guilds"],
	},
	async ({
		accessToken,
		refreshToken,
		profile,
	}): Promise<DiscordUser> => {

		return {
			id: profile.id,
			displayName: profile.displayName,
			avatar: profile.__json.avatar,
			email: profile.__json.email,
			locale: profile.__json.locale,
			accessToken,
			refreshToken,
		};
	},
);

auth.use(discordStrategy);
