import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload as UploadIcon, Image, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    toast({
      title: "Files uploaded",
      description: `${acceptedFiles.length} medical image(s) ready for processing`,
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.dicom', '.dcm']
    },
    maxFiles: 10
  });

  const handleProcess = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          // Simulate results
          const mockResults = files.map((file, index) => ({
            id: index,
            filename: file.name,
            originalSize: file.size,
            enhancementScore: Math.random() * 30 + 70, // 70-100%
            processingTime: Math.random() * 2 + 1, // 1-3 seconds
            insights: [
              "Noise reduction: 89%",
              "Contrast enhancement: 92%",
              "Edge sharpening: 76%"
            ]
          }));
          
          setResults(mockResults);
          toast({
            title: "Processing complete",
            description: "All images have been enhanced successfully",
          });
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Medical Image Enhancement
          </h1>
          <p className="text-muted-foreground">
            Upload medical images to enhance quality and interpretability using our advanced CNN technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UploadIcon className="h-5 w-5" />
                  <span>Upload Medical Images</span>
                </CardTitle>
                <CardDescription>
                  Supported formats: JPEG, PNG, DICOM (.dcm)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                    ${isDragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }`}
                >
                  <input {...getInputProps()} />
                  <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-primary">Drop the files here...</p>
                  ) : (
                    <div>
                      <p className="text-foreground font-medium mb-2">
                        Drag & drop medical images here
                      </p>
                      <p className="text-muted-foreground text-sm">
                        or click to select files
                      </p>
                    </div>
                  )}
                </div>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium">Selected Files:</h4>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Image className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{file.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    ))}
                    
                    <Button
                      onClick={handleProcess}
                      variant="medical"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      {isProcessing ? "Processing..." : "Enhance Images"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Progress */}
            {isProcessing && (
              <Card className="shadow-medical">
                <CardHeader>
                  <CardTitle>Processing Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Applying CNN enhancement algorithms... {progress}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Enhancement Results</span>
                </CardTitle>
                <CardDescription>
                  Analysis and enhancement metrics for processed images
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Upload and process images to see results
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((result) => (
                      <Card key={result.id} className="border border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{result.filename}</CardTitle>
                          <CardDescription>
                            Processing time: {result.processingTime.toFixed(1)}s
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Enhancement Score:</span>
                              <span className="text-sm font-bold text-primary">
                                {result.enhancementScore.toFixed(1)}%
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <span className="text-sm font-medium">Improvements:</span>
                              {result.insights.map((insight: string, idx: number) => (
                                <div key={idx} className="text-xs text-muted-foreground pl-4">
                                  • {insight}
                                </div>
                              ))}
                            </div>
                            
                            <Button variant="outline" size="sm" className="w-full mt-3">
                              Download Enhanced Image
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;