import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, FileText, Quote, Calendar, Users } from 'lucide-react';

export function Publications() {
  const publications = [
    {
      title: "Efficient Neural Architecture Search for Edge Computing Devices",
      authors: ["Alex Chen", "Sarah Johnson", "Michael Zhang", "Dr. Lisa Wang"],
      venue: "International Conference on Machine Learning (ICML)",
      year: "2024",
      type: "Conference Paper",
      status: "Published",
      citations: 47,
      abstract: "We present a novel approach to neural architecture search that optimizes for both accuracy and efficiency on resource-constrained edge devices. Our method reduces search time by 75% while maintaining competitive performance.",
      keywords: ["Neural Architecture Search", "Edge Computing", "Model Optimization", "Efficient AI"],
      links: {
        paper: "#",
        arxiv: "#",
        code: "#"
      },
      impact: "Best Paper Award",
      category: "AI/ML"
    },
    {
      title: "Privacy-Preserving Federated Learning with Differential Privacy",
      authors: ["Alex Chen", "Robert Kim", "Dr. Amanda Rodriguez"],
      venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
      year: "2023",
      type: "Journal Article",
      status: "Published",
      citations: 124,
      abstract: "This work introduces a federated learning framework that combines differential privacy with secure aggregation to protect user data while maintaining model utility across distributed clients.",
      keywords: ["Federated Learning", "Differential Privacy", "Security", "Privacy-Preserving ML"],
      links: {
        paper: "#",
        arxiv: "#",
        code: "#"
      },
      impact: "Editor's Choice",
      category: "Privacy"
    },
    {
      title: "Multimodal Transformers for Real-time Anomaly Detection",
      authors: ["Alex Chen", "David Park", "Dr. Emily Chen"],
      venue: "Neural Information Processing Systems (NeurIPS)",
      year: "2023",
      type: "Conference Paper",
      status: "Published",
      citations: 89,
      abstract: "We propose a multimodal transformer architecture that processes text, images, and sensor data simultaneously for real-time anomaly detection in industrial settings.",
      keywords: ["Multimodal Learning", "Transformers", "Anomaly Detection", "Real-time Systems"],
      links: {
        paper: "#",
        arxiv: "#",
        code: "#"
      },
      impact: "Spotlight Presentation",
      category: "AI/ML"
    },
    {
      title: "Quantum-Enhanced Machine Learning for Drug Discovery",
      authors: ["Alex Chen", "Dr. Thomas Liu", "Prof. Maria Garcia"],
      venue: "Nature Machine Intelligence",
      year: "2023",
      type: "Journal Article",
      status: "Published",
      citations: 156,
      abstract: "This study demonstrates how quantum computing can accelerate molecular property prediction for drug discovery applications, achieving 10x speedup over classical methods.",
      keywords: ["Quantum Computing", "Drug Discovery", "Molecular ML", "Quantum ML"],
      links: {
        paper: "#",
        arxiv: "#"
      },
      impact: "Cover Article",
      category: "Quantum"
    },
    {
      title: "Explainable AI for Medical Diagnosis: A Comprehensive Survey",
      authors: ["Alex Chen", "Dr. Jennifer Wu", "Dr. Mark Thompson", "Prof. Alan Smith"],
      venue: "AI in Medicine",
      year: "2022",
      type: "Survey Paper",
      status: "Published",
      citations: 312,
      abstract: "A comprehensive review of explainable AI techniques in medical diagnosis, covering interpretability methods, evaluation metrics, and regulatory considerations.",
      keywords: ["Explainable AI", "Medical AI", "Interpretability", "Healthcare"],
      links: {
        paper: "#",
        arxiv: "#"
      },
      impact: "Most Cited",
      category: "Healthcare"
    },
    {
      title: "Efficient Training of Large Language Models on Distributed Systems",
      authors: ["Alex Chen", "Kevin Zhang", "Dr. Lisa Chen"],
      venue: "ArXiv Preprint",
      year: "2024",
      type: "Preprint",
      status: "Under Review",
      citations: 23,
      abstract: "We present novel techniques for efficient distributed training of large language models, reducing communication overhead by 60% while maintaining convergence guarantees.",
      keywords: ["Large Language Models", "Distributed Training", "Optimization", "Scalability"],
      links: {
        arxiv: "#",
        code: "#"
      },
      impact: "Under Review at ICLR 2024",
      category: "AI/ML"
    }
  ];

  const categories = ["All", "AI/ML", "Privacy", "Quantum", "Healthcare"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPublications = selectedCategory === "All" 
    ? publications 
    : publications.filter(pub => pub.category === selectedCategory);

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);
  const hIndex = calculateHIndex(publications.map(pub => pub.citations));

  function calculateHIndex(citations: number[]): number {
    const sorted = citations.sort((a, b) => b - a);
    let h = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] >= i + 1) {
        h = i + 1;
      } else {
        break;
      }
    }
    return h;
  }

  return (
    <section id="publications" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Publications & Research</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contributing to the advancement of AI through peer-reviewed research and open-source publications
          </p>
        </motion.div>

        {/* Research Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{publications.length}</div>
                  <div className="text-sm text-muted-foreground">Publications</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">{totalCitations}</div>
                  <div className="text-sm text-muted-foreground">Total Citations</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">{hIndex}</div>
                  <div className="text-sm text-muted-foreground">H-Index</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-muted-foreground">Best Paper Awards</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((publication, index) => (
            <motion.div
              key={publication.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-0 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold leading-tight hover:text-primary transition-colors">
                            {publication.title}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{publication.authors.join(", ")}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{publication.year}</span>
                            </div>
                            <span className="font-medium">{publication.venue}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {publication.abstract}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {publication.keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:min-w-[200px]">
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant={publication.status === "Published" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {publication.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {publication.type}
                        </Badge>
                      </div>

                      {publication.impact && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded">
                          <Quote className="h-3 w-3" />
                          <span>{publication.impact}</span>
                        </div>
                      )}

                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{publication.citations}</span> citations
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {publication.links.paper && (
                          <Button size="sm" variant="outline" className="text-xs">
                            <FileText className="mr-1 h-3 w-3" />
                            Paper
                          </Button>
                        )}
                        {publication.links.arxiv && (
                          <Button size="sm" variant="outline" className="text-xs">
                            <ExternalLink className="mr-1 h-3 w-3" />
                            arXiv
                          </Button>
                        )}
                        {publication.links.code && (
                          <Button size="sm" variant="outline" className="text-xs">
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

