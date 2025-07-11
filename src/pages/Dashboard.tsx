import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Users, 
  Image as ImageIcon,
  BarChart3,
  Download,
  Eye
} from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const stats = [
    {
      title: "Images Processed",
      value: "1,247",
      change: "+12%",
      icon: ImageIcon,
      color: "text-blue-600"
    },
    {
      title: "Average Enhancement",
      value: "89.4%",
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Processing Time",
      value: "2.1s",
      change: "-15%",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Active Users",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const recentProcessing = [
    {
      id: 1,
      filename: "chest_xray_001.dcm",
      type: "X-Ray",
      enhancement: 92,
      status: "completed",
      time: "2 min ago"
    },
    {
      id: 2,
      filename: "mri_brain_scan.jpg",
      type: "MRI",
      enhancement: 87,
      status: "completed",
      time: "5 min ago"
    },
    {
      id: 3,
      filename: "ct_abdomen_slice.png",
      type: "CT Scan",
      enhancement: 94,
      status: "processing",
      time: "8 min ago"
    },
    {
      id: 4,
      filename: "ultrasound_heart.jpg",
      type: "Ultrasound",
      enhancement: 78,
      status: "completed",
      time: "12 min ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Enhancement Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your medical image processing and enhancement analytics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-medical">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>{' '}
                    from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Processing */}
          <div className="lg:col-span-2">
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Recent Processing Activity</span>
                </CardTitle>
                <CardDescription>
                  Latest medical images processed through CNN enhancement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProcessing.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <ImageIcon className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{item.filename}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {item.status === "completed" && (
                          <div className="text-right">
                            <p className="text-sm font-medium">{item.enhancement}%</p>
                            <p className="text-xs text-muted-foreground">enhancement</p>
                          </div>
                        )}
                        {item.status === "processing" && (
                          <div className="w-24">
                            <Progress value={65} className="h-2" />
                          </div>
                        )}
                        <div className="text-right">
                          {getStatusBadge(item.status)}
                          <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <div className="space-y-6">
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Image Quality</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Processing Speed</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy Rate</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>System Load</span>
                    <span>34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="medical" className="w-full">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Process New Images
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;