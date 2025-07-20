"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Recommendation = {
  prompt: string;
  reason: string;
  searchVolume: number;
  relevanceScore: number;
  buyerIntentScore: number;
};

export default function Page() {
  const [domain, setDomain] = useState("itstelepathic.com");
  const [userPrompts, setUserPrompts] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        body: JSON.stringify({
          domain,
          userPrompts: userPrompts.split("\n").map((p) => p.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error("Failed to get recommendations");

      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const addToPromptList = (prompt: string) => {
    setUserPrompts((prev) => (prev ? `${prev}\n${prompt}` : prompt));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🔍 AI Prompt Recommender</h1>

      <p className="text-sm text-muted-foreground mb-4">
         Each prompt includes its estimated monthly <strong>search volume</strong>,{' '}
        <strong>relevance to your domain</strong> (0–1), and{' '}
        <strong>buyer intent</strong> (0–1). You can copy or add suggestions to your list.
      </p>

      <p className="text-sm text-muted-foreground">
        Recommended Prompt Actions:
        <br />
        <strong>Add</strong>: Adds the recommended prompt to your list for easy management.
        <br />
        <strong>Copy</strong>: Copies the recommended prompt to clipboard for quick pasting.
      </p>


      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Product Domain</label>
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. itstelepathic.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Past Prompts</label>
          <Textarea
            value={userPrompts}
            onChange={(e) => setUserPrompts(e.target.value)}
            placeholder="Enter one prompt per line"
            rows={10}
          />
        </div>

        <Button onClick={generateRecommendations} disabled={loading}>
          {loading ? "Generating..." : "Generate Recommendations"}
        </Button>
      </div>

      {recommendations.length > 0 && (
        <div className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold">📌 Suggested Prompts</h2>
          {recommendations.map((rec, i) => (
            <Card key={i} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-base font-medium">{rec.prompt}</div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => copyToClipboard(rec.prompt)}>
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addToPromptList(rec.prompt)}>
                    Add
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{rec.reason}</p>
              <div className="text-sm mt-2 space-y-1">
                <p>🔍 <strong>Search Volume:</strong> {rec.searchVolume.toLocaleString()}</p>
                <p>🎯 <strong>Relevance:</strong> {rec.relevanceScore}</p>
                <p>💰 <strong>Buyer Intent:</strong> {rec.buyerIntentScore}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
