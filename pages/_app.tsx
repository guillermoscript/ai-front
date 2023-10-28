import { AuthProvider } from "@/providers/Auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		// Provide the client to your App
		<AuthProvider
			// To toggle between the REST and GraphQL APIs,
			// change the `api` prop to either `rest` or `gql`
			api="rest" // change this to `gql` to use the GraphQL API
		>
			<QueryClientProvider client={queryClient}>
				{/* typescript flags this `@ts-expect-error` declaration as unneeded, but types are breaking the build process
        Remove these comments when the issue is resolved
        See more here: https://github.com/facebook/react/issues/24304
        */}
				
				<Component {...pageProps} />
				<Toaster />
			</QueryClientProvider>
		</AuthProvider>
	);
}
