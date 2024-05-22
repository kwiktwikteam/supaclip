
declare module "next-auth" {
  interface User {
    id: number;
  }
  interface Session {
    id: string;
  }
}