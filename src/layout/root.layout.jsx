import { Outlet } from "react-router-dom"
import { ThemeProvider } from "@/components/ui/theme-provider"
function RootLayout () {
    return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main>
            <Outlet/>
        </main>
    </ThemeProvider>
        
    )
}

export default RootLayout