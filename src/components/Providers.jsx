"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "../context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./ScrollToTop";
import AcilAssistant from "./AcilAssistant";
import SplashScreen from "./SplashScreen";

// Lightweight Route-aware Scroll Observer
const ScrollObserver = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", "G-B6DSED8QNG", { page_path: pathname });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".section-header, .wisata-reveal, .wisata-reveal-left, .wisata-reveal-right");
      elements.forEach((el) => {
        if (!el.classList.contains("scroll-animate") && !el.classList.contains("in-view")) {
          el.classList.add("scroll-animate");
          observer.observe(el);
        } else if (!el.classList.contains("in-view")) {
          observer.observe(el);
        }
      });
    }, 120);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

export default function Providers({ children }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    const initialSeen = typeof window !== "undefined" && sessionStorage.getItem("hasSeenSplash") === "true";
    if (!initialSeen) {
      setShowSplash(true);
      
      // Start exit animation after 3.5 seconds
      const readyTimer = setTimeout(() => {
        setIsSplashReady(true);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 3500);

      // Remove from DOM completely after 4.5 seconds (allowing 1s for animation)
      const removeTimer = setTimeout(() => {
        setShowSplash(false);
      }, 4500);

      return () => {
        clearTimeout(readyTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  useEffect(() => {
    try {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    } catch (e) {}
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        {showSplash && <SplashScreen isReady={isSplashReady} />}
        <ScrollToTop />
        <ScrollObserver />
        <main id="main-content">
          {children}
        </main>
        <AcilAssistant />
      </LanguageProvider>
    </HelmetProvider>
  );
}
