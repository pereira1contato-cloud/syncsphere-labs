import { Header } from "@/components/Header";
import { SearchFilters } from "@/components/SearchFilters";
import { BusinessCard } from "@/components/BusinessCard";
import { AIInsights } from "@/components/AIInsights";
import padariaImg from "@/assets/padaria.jpg";
import clinicaImg from "@/assets/clinica.jpg";
import restauranteImg from "@/assets/restaurante.jpg";
import lojaTechImg from "@/assets/loja-tech.jpg";

const businesses = [
  {
    id: "1",
    name: "Padaria Doce Pão",
    category: "Padaria",
    rating: 4.6,
    reviewCount: 200,
    address: "R. das Flores, 123, São Paulo, SP",
    image: padariaImg,
    hasWebsite: true,
    hasPhone: true,
    isOnline: true,
  },
  {
    id: "2",
    name: "Clínica Saúde Total",
    category: "Serviços de Saúde",
    rating: 4.2,
    reviewCount: 50,
    address: "Av. Principal, 456, Rio de Janeiro, RJ",
    image: clinicaImg,
    hasWebsite: true,
    hasPhone: true,
    isOnline: true,
  },
  {
    id: "3",
    name: "Restaurante Sabor Caseiro",
    category: "Restaurante",
    rating: 3.8,
    reviewCount: 30,
    address: "Pc. da Liberdade, 789, Belo Horizonte, MG",
    image: restauranteImg,
    hasWebsite: false,
    hasPhone: true,
    isOnline: false,
  },
  {
    id: "4",
    name: "Loja Tech Pro",
    category: "Loja de Eletrônicos",
    rating: 4.0,
    reviewCount: 300,
    address: "R. da Consolação, 101, Salvador, BA",
    image: lojaTechImg,
    hasWebsite: true,
    hasPhone: true,
    isOnline: true,
  },
];

const Index = () => {
  const handleSearch = () => {
    console.log("Searching...");
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Encontre Negócios Locais
            <span className="text-primary">✨</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Use os filtros abaixo para encontrar oportunidades de negócio em sua região<br />
            e analise a presença digital com o poder da IA.
          </p>
        </div>

        {/* AI Insights */}
        <AIInsights />

        {/* Search Filters */}
        <div className="mb-12">
          <SearchFilters onSearch={handleSearch} />
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;