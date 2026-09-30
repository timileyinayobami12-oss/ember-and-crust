"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./header";
import { Footer } from "./footer";
import { Hero } from "./hero";
import {
  DealBanner,
  FeaturesRow,
  FeaturedProduct,
  GalleryStrip,
  GoesGreatWith,
  PromoTiles,
  TabbedMenu,
} from "./home-sections";
import { MenuPage } from "./menu-page";
import { AboutPage } from "./about-page";
import { ContactPage } from "./contact-page";
import { CartPage } from "./cart-page";
import { CheckoutPage, SuccessPage } from "./checkout-page";
import { useRoute } from "@/lib/store";

function HomePage() {
  return (
    <>
      <Hero />
      <PromoTiles />
      <TabbedMenu />
      <DealBanner />
      <GoesGreatWith />
      <FeaturedProduct />
      <FeaturesRow />
      <GalleryStrip />
    </>
  );
}

export function SiteApp() {
  const page = useRoute((s) => s.page);
  const menuCategory = useRoute((s) => s.menuCategory);

  // scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [page]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {page === "home" && <HomePage />}
            {page === "menu" && <MenuPage key={menuCategory} />}
            {page === "about" && <AboutPage />}
            {page === "contact" && <ContactPage />}
            {page === "cart" && <CartPage />}
            {page === "checkout" && <CheckoutPage />}
            {page === "success" && <SuccessPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
