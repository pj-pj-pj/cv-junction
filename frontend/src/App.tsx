import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/pages/Sidebar/AppSidebar";
import CVBuilder from "./pages/CV/CVBuilder";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar>
        <CVBuilder />
      </AppSidebar>
    </SidebarProvider>
  );
}

export default App;
