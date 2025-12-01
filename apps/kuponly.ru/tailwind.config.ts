import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ec4913", // Orange
            },
            fontFamily: {
                sans: ["var(--font-be-vietnam-pro)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
