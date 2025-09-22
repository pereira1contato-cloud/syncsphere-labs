import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { GeminiService } from "@/services/geminiService";
import { useToast } from "@/components/ui/use-toast";

export const AIInsights = () => {
  const [generalInsights, setGeneralInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const generateInsights = async () => {
    setLoading(true);
    try {
      const insights = await GeminiService.generateMarketInsights("São Paulo, Brasil", "Negócios Locais");
      setGeneralInsights(insights);
      setExpanded(true);
      
      toast({
        title: "Insights Gerados!",
        description: "Análise de mercado atualizada com IA.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar os insights. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-card border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 rounded-full p-2">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Insights de IA</h3>
            <p className="text-sm text-muted-foreground">Análise inteligente do mercado local</p>
          </div>
        </div>
        <Badge variant="outline" className="text-primary border-primary">
          <Sparkles className="h-3 w-3 mr-1" />
          Powered by Gemini
        </Badge>
      </div>

      {!generalInsights.length && !loading && (
        <div className="text-center py-6">
          <Button 
            onClick={generateInsights}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Gerar Insights de Mercado
          </Button>
        </div>
      )}

      {loading && (
        <div className="text-center py-6">
          <div className="animate-pulse">
            <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-muted-foreground">Analisando tendências de mercado...</p>
          </div>
        </div>
      )}

      {generalInsights.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Tendências do Mercado Local</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Recolher
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Expandir
                </>
              )}
            </Button>
          </div>

          <div className={`grid gap-3 transition-all duration-300 ${expanded ? 'grid-rows-1' : 'grid-rows-[1fr] max-h-24 overflow-hidden'}`}>
            {generalInsights.slice(0, expanded ? generalInsights.length : 2).map((insight, index) => (
              <div key={index} className="p-4 bg-secondary/30 rounded-lg border-l-4 border-primary">
                <p className="text-sm text-foreground">{insight}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={generateInsights}
              disabled={loading}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Atualizar Insights
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};