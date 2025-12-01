import { ReactNode } from "react";
import { Header } from "../components/global/Header";
import { Footer } from "../components/global/Footer";

interface AppHomeLayoutProps {
    children: ReactNode;
    lang: "en" | "ru";
}

export const AppHomeLayout = ({ children, lang }: AppHomeLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header lang={lang} />
            <main className="flex-1">{children}</main>
            <Footer lang={lang} />
        </div>
    );
};
