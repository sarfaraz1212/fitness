import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";


const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: isEditing ? "Sarah" : "",
        email: isEditing ? "sarah.johnson@email.com" : "",
        phone: isEditing ? "+1 234 567 890" : "",
    });

  
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // // Basic validation
        // if (!formData.firstName || !formData.lastName || !formData.email) {
        //     toast({
        //         title: "Missing Required Fields",
        //         description: "Please fill in all required fields.",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // toast({
        //     title: isEditing ? "Client Updated" : "Client Added",
        //     description: `${formData.firstName} ${formData.lastName}'s profile has been ${isEditing ? "updated" : "created"} successfully.`,
        // });

        // navigate("/trainer/clients");
    };



    return (
        <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            {/* Hero Header */}
            <div className="relative overflow-hidden  bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/trainer/clients")}
                        className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Clients
                    </Button>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {isEditing ? "Edit Client" : "Add New Client"}
                    </h1>
                    <p className="text-white/80">
                        {isEditing ? "Update client information and preferences" : "Fill in the details to add a new client"}
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-6 mt-5  relative z-10">
                    {/* Personal Information */}
                    <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange("name", e.target.value)
                                        }
                                        placeholder="Enter full name"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange("email", e.target.value)
                                        }
                                        placeholder="email@example.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            handleInputChange("phone", e.target.value)
                                        }
                                        placeholder="+1 234 567 890"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate("/trainer/clients")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {isEditing ? "Save Changes" : "Add Client"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Physical Information */}


                    {/* Form Actions */}

                </form>
            </main>
        </div>
    );
};

export default ClientForm;
