import "../../index.css";

export const metadata = {
  title: "Admin Panel - Visit Banjarmasin",
  description: "CMS for Visit Banjarmasin",
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
