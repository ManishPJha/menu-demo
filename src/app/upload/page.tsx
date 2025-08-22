import Link from "next/link";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

export default function UploadMenu() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4">
        <Tabs defaultValue="manual" className="w-full max-w-xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Create Manually</TabsTrigger>
            <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Create New Menu</CardTitle>
                <CardDescription>
                  Start by giving your new menu a name. You can add items and sections next.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Menu Name</Label>
                  <Input id="name" defaultValue="My New Menu" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/menu/new-menu" className="w-full">
                  <Button className="w-full">Create Menu</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="pdf">
            <Card>
              <CardHeader>
                <CardTitle>Upload PDF</CardTitle>
                <CardDescription>
                  Upload your existing menu in PDF format. We'll try to parse it automatically.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-muted rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground"/>
                    <p className="text-sm text-muted-foreground">Drag & drop your PDF here, or click to browse</p>
                    <Input id="pdf-upload" type="file" className="sr-only"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>Upload and Process</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
