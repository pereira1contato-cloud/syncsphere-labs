import { useState } from "react";
import { Star, MapPin, Phone, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnalysisModal } from "@/components/AnalysisModal";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
  hasWebsite?: boolean;
  hasPhone?: boolean;
  isOnline?: boolean;
}

export const BusinessCard = ({
  id,
  name,
  category,
  rating,
  reviewCount,
  address,
  image,
  hasWebsite = true,
  hasPhone = true,
  isOnline = true,
}: BusinessCardProps) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-rating-excellent";
    if (rating >= 3.5) return "text-rating-good";
    if (rating >= 2.5) return "text-rating-fair";
    return "text-rating-poor";
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excelente";
    if (rating >= 3.5) return "Mediano";
    return "Fraco";
  };

  return (
    <Card className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 hover:scale-[1.02] group overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className={`h-4 w-4 fill-current ${getRatingColor(rating)}`} />
          <span className="text-sm font-medium text-white">{rating}</span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm">{category}</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Star className={`h-4 w-4 fill-current ${getRatingColor(rating)}`} />
          <span className="text-foreground font-medium">{rating}</span>
          <span className="text-muted-foreground">({reviewCount} avaliações)</span>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>

        {!isOnline && (
          <div className="text-sm text-muted-foreground">
            Sem contato online
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          {hasWebsite && (
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Globe className="h-4 w-4 mr-1" />
              Site
            </Button>
          )}
          {hasPhone && (
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4 mr-1" />
              Telefone
            </Button>
          )}
        </div>

        <Button 
          onClick={() => setShowAnalysis(true)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Analisar Perfil
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <AnalysisModal 
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        business={{
          id,
          name,
          category,
          rating,
          reviewCount,
          address,
          hasWebsite,
          hasPhone
        }}
      />
    </Card>
  );
};