import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, AlertTriangle, Lightbulb, Target, Star } from "lucide-react";
import { GeminiService, BusinessAnalysis } from "@/services/geminiService";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviewCount: number;
    address: string;
    hasWebsite?: boolean;
    hasPhone?: boolean;
  };
}

export const AnalysisModal = ({ isOpen, onClose, business }: AnalysisModalProps) => {
  const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const { toast } = useToast();

  const startAnalysis = async () => {
    setLoading(true);
    try {
      const [businessAnalysis, marketInsights] = await Promise.all([
        GeminiService.analyzeBusinessProfile({
          name: business.name,
          category: business.category,
          rating: business.rating,
          reviewCount: business.reviewCount,
          address: business.address,
          hasWebsite: business.hasWebsite || false,
          hasPhone: business.hasPhone || false,
        }),
        GeminiService.generateMarketInsights(business.address, business.category)
      ]);

      setAnalysis(businessAnalysis);
      setInsights(marketInsights);
      
      toast({
        title: "Análise Concluída!",
        description: "A análise com IA foi gerada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro na Análise",
        description: "Não foi possível completar a análise. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-rating-excellent";
    if (score >= 60) return "text-rating-good";
    if (score >= 40) return "text-rating-fair";
    return "text-rating-poor";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Análise IA - {business.name}
          </DialogTitle>
        </DialogHeader>

        {!analysis && !loading && (
          <div className="text-center py-8 space-y-4">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Análise Inteligente de Negócio
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Nossa IA analisará a presença digital, oportunidades de mercado e fornecerá 
              recomendações personalizadas para {business.name}.
            </p>
            <Button 
              onClick={startAnalysis}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Iniciar Análise com IA
            </Button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <h3 className="text-lg font-semibold text-foreground">
              Analisando com IA...
            </h3>
            <p className="text-muted-foreground">
              Processando dados e gerando insights personalizados
            </p>
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            {/* Score Overview */}
            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Presença Digital</h3>
                <Badge variant="outline" className={`text-lg font-bold ${getScoreColor(analysis.digitalPresenceScore)}`}>
                  {analysis.digitalPresenceScore}/100
                </Badge>
              </div>
              <Progress value={analysis.digitalPresenceScore} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">{analysis.summary}</p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card className="p-6 bg-gradient-card border-border">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-rating-excellent" />
                  Pontos Fortes
                </h4>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-2 h-2 bg-rating-excellent rounded-full mt-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Weaknesses */}
              <Card className="p-6 bg-gradient-card border-border">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rating-fair" />
                  Pontos de Melhoria
                </h4>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-2 h-2 bg-rating-fair rounded-full mt-2 flex-shrink-0" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="p-6 bg-gradient-card border-border">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Recomendações Estratégicas
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Market Opportunities */}
            <Card className="p-6 bg-gradient-card border-border">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-rating-good" />
                Oportunidades de Mercado
              </h4>
              <div className="space-y-3">
                {analysis.marketOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                    <div className="w-6 h-6 bg-rating-good rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{opportunity}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Market Insights */}
            {insights.length > 0 && (
              <Card className="p-6 bg-gradient-card border-border">
                <h4 className="font-bold text-foreground mb-4">Insights de Mercado Local</h4>
                <div className="grid gap-3">
                  {insights.map((insight, index) => (
                    <div key={index} className="p-3 bg-secondary/20 rounded-lg border-l-4 border-primary">
                      <p className="text-sm text-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Competitive Advantage */}
            <Card className="p-6 bg-gradient-card border-border">
              <h4 className="font-bold text-foreground mb-3">Vantagem Competitiva</h4>
              <p className="text-foreground bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                {analysis.competitiveAdvantage}
              </p>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};