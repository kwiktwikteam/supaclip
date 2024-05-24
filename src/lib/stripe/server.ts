import "server-only";

import Stripe from "stripe";
import { env } from "~/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-04-10",
  appInfo: {
    name: "launchify.club",
    url: "https://www.launchify.club",
  },
});
