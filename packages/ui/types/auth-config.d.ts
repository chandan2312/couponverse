declare module "@repo/auth-config/client" {
  export function signIn(...args: any[]): any;
  export function signOut(...args: any[]): any;
  export function useSession(...args: any[]): any;
  export function getSession(...args: any[]): any;
  export function SessionProvider(...args: any[]): any;
  export function getCsrfToken(...args: any[]): any;
  export function getProviders(...args: any[]): any;
}
