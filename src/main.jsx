import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { I18nProvider } from "@lingui/react";
import { i18n, dynamicActivate, defaultLocale } from "./i18n/i18n";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";

const root = createRoot(document.getElementById("root"));

// activate the default locale before the first render so no untranslated text flashes
dynamicActivate(defaultLocale).then(() => {
    root.render(
        <React.StrictMode>
            <I18nProvider i18n={i18n}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ProductListing />} />
                            <Route path="/products/:productId" element={<ProductDetails />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </I18nProvider>
        </React.StrictMode>
    );
});
