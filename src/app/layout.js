import "./globals.css";

export const metadata = {
  title: "For Muskan 💖",
  description: "A special confession made with love, just for you Muskan ✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
