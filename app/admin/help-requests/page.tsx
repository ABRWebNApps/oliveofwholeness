import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Clock, CheckCircle } from "lucide-react";

export default async function AdminHelpRequestsPage() {
  const supabase = await createClient();

  const { data: helpRequests } = await supabase
    .from("help_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "destructive";
      case "reviewed":
        return "secondary";
      case "responded":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Mail className="h-4 w-4" />;
      case "reviewed":
        return <Clock className="h-4 w-4" />;
      case "responded":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Help Requests
          </h1>
          <p className="text-muted-foreground">
            View and manage visitor help requests and contact form submissions.
          </p>
        </div>

        {helpRequests && helpRequests.length > 0 ? (
          <div className="space-y-6">
            {helpRequests.map((request) => (
              <Card
                key={request.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">
                          {request.name}
                        </CardTitle>
                        <Badge
                          variant={getStatusColor(request.status)}
                          className="flex items-center space-x-1"
                        >
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </Badge>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        <a
                          href={`mailto:${request.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {request.email}
                        </a>
                        {" • "}
                        {new Date(
                          request.created_at
                        ).toLocaleDateString()} at{" "}
                        {new Date(request.created_at).toLocaleTimeString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button asChild size="sm">
                        <a
                          href={`mailto:${request.email}?subject=Re: Your Help Request&body=Dear ${request.name},%0D%0A%0D%0AThank you for reaching out to Olive of Wholeness.%0D%0A%0D%0A`}
                        >
                          Reply via Email
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Message:
                      </h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {request.message}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {request.consent_given ? (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            Consent Given
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-600"
                          >
                            No Consent
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Request ID: {request.id.substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="mb-2">No Help Requests Yet</CardTitle>
              <CardDescription className="mb-4">
                When visitors submit help requests through the contact form,
                they will appear here.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
