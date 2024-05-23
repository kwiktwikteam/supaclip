import "server-only";

import Stripe from "stripe";
import { env } from "~/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  appInfo: {
    name: "supaclip.pro",
    url: "https://www.supaclip.pro",
  },
});
