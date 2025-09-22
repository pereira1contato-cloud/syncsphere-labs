import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  onSearch: () => void;
}

export const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  return (
    <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <Select defaultValue="brasil">
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="País" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brasil">Brasil</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="sp">
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sp">São Paulo</SelectItem>
            <SelectItem value="rj">Rio de Janeiro</SelectItem>
            <SelectItem value="mg">Minas Gerais</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="sao-paulo">
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="Cidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sao-paulo">São Paulo</SelectItem>
            <SelectItem value="campinas">Campinas</SelectItem>
            <SelectItem value="santos">Santos</SelectItem>
          </SelectContent>
        </Select>

        <Input 
          placeholder="Bairro" 
          className="bg-secondary border-border placeholder:text-muted-foreground"
        />

        <Input 
          placeholder="Nicho (ex: restaurante)" 
          className="bg-secondary border-border placeholder:text-muted-foreground"
        />

        <Button 
          onClick={onSearch}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Filtrar por Nota:</span>
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="bg-primary text-primary-foreground">
            Todos
          </Button>
          <Button variant="outline" size="sm" className="border-rating-excellent text-rating-excellent hover:bg-rating-excellent hover:text-white">
            🔥 Excelente
            <span className="ml-1 text-xs opacity-75">Nota ≥ 4.2</span>
          </Button>
          <Button variant="outline" size="sm" className="border-rating-good text-rating-good hover:bg-rating-good hover:text-white">
            😊 Mediano
            <span className="ml-1 text-xs opacity-75">Nota 3.5-4.1</span>
          </Button>
          <Button variant="outline" size="sm" className="border-rating-fair text-rating-fair hover:bg-rating-fair hover:text-white">
            😐 Fraco
            <span className="ml-1 text-xs opacity-75">Nota ≤ 3.5</span>
          </Button>
        </div>
      </div>
    </div>
  );
};