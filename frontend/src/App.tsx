import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/pages/Sidebar/AppSidebar";
import CVBuilder from "./pages/CV/CVBuilder";
import { CVProvider } from "./context/CVContext";

function App() {
  return (
    <CVProvider>
      <SidebarProvider>
        <AppSidebar>
          <CVBuilder />
        </AppSidebar>
      </SidebarProvider>
    </CVProvider>
  );
}

export default App;
