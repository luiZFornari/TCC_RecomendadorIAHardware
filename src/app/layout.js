import "./globals.css";
import Navbar from "./components/NavBar";

export const metadata = {
  title: "Recomendador de PC Inteligente",
  description:
    "Encontre a configuração ideal para o seu computador usando Inteligência Artificial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
