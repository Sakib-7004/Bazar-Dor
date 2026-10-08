import "./globals.css";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer"; import Providers from "@/components/Providers";
export const metadata={title:"বাজার দর | BazarDor",description:"বাংলাদেশের দৈনন্দিন পণ্যের বাজারদর ট্র্যাকার"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body><Providers><Navbar/>{children}<Footer/></Providers></body></html>}