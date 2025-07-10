import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from "./pages/Index";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

import {Language, supportedLanguages} from "@/i18n";
import {useEffect} from "react";

const queryClient = new QueryClient();

const LanguageRedirect = () => {
    useEffect(() => {
        // Get browser language (first 2 chars)
        const browserLang = navigator.language.substring(0, 2);

        // Check if it's supported, otherwise use 'en'
        const lang = supportedLanguages.includes(browserLang as Language)
            ? browserLang
            : 'en';

        // Redirect to the language path
        window.location.href = `/${lang}`;
    }, []);

    return null;
};

// Path-preserving language redirect
const PathPreservingLanguageRedirect = () => {
    useEffect(() => {
        // Get current path (without leading slash)
        const currentPath = window.location.pathname.substring(1);

        // Get browser language (first 2 chars)
        const browserLang = navigator.language.substring(0, 2);

        // Check if it's supported, otherwise use 'en'
        const lang = supportedLanguages.includes(browserLang as Language)
            ? browserLang
            : 'en';

        // Redirect to the language path while preserving the current path
        window.location.href = `/${lang}/${currentPath}`;
    }, []);

    return null;
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster/>
            <Sonner/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LanguageRedirect/>}/>

                    <Route path="resume" element={<PathPreservingLanguageRedirect/>}/>

                    <Route path="/:lang">
                        <Route index element={<Index/>}/>
                        <Route path="resume" element={<Resume/>}/>
                    </Route>

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
