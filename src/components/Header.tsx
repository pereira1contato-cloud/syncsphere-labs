import { MapPin } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <MapPin className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Local Freela</h1>
        </div>
        
        <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
          <div className="w-6 h-6 bg-foreground rounded-full"></div>
        </div>
      </div>
    </header>
  );
};