import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, User, Mail, Phone, MapPin, FileText, Copy, Download } from "lucide-react";
import { faker } from "@faker-js/faker";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";

type DataType = 'person' | 'address' | 'contact' | 'lorem' | 'json';

export default function FakeDataGenerator() {
  const seoConfig = getSEOConfig("fakedatagenerator");
  const [dataType, setDataType] = useState<DataType>('person');
  const [count, setCount] = useState(5);
  const [generatedData, setGeneratedData] = useState<string>('');
  const { toast } = useToast();

  const generatePersonData = (num: number) => {
    const people = [];
    for (let i = 0; i < num; i++) {
      people.push({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        dateOfBirth: faker.date.birthdate().toISOString().split('T')[0],
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        job: {
          title: faker.person.jobTitle(),
          company: faker.company.name(),
          department: faker.person.jobArea()
        }
      });
    }
    return JSON.stringify(people, null, 2);
  };

  const generateAddressData = (num: number) => {
    const addresses = [];
    for (let i = 0; i < num; i++) {
      addresses.push({
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude()
        }
      });
    }
    return JSON.stringify(addresses, null, 2);
  };

  const generateContactData = (num: number) => {
    const contacts = [];
    for (let i = 0; i < num; i++) {
      contacts.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        website: faker.internet.url(),
        company: faker.company.name()
      });
    }
    return JSON.stringify(contacts, null, 2);
  };

  const generateLoremText = (num: number) => {
    const paragraphs = [];
    for (let i = 0; i < num; i++) {
      paragraphs.push(faker.lorem.paragraph());
    }
    return paragraphs.join('\n\n');
  };

  const generateJsonData = (num: number) => {
    const objects = [];
    for (let i = 0; i < num; i++) {
      objects.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        inStock: faker.datatype.boolean(),
        createdAt: faker.date.recent().toISOString(),
        attributes: {
          color: faker.color.human(),
          size: faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
          weight: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 })
        }
      });
    }
    return JSON.stringify(objects, null, 2);
  };

  const generateData = () => {
    let data = '';
    
    switch (dataType) {
      case 'person':
        data = generatePersonData(count);
        break;
      case 'address':
        data = generateAddressData(count);
        break;
      case 'contact':
        data = generateContactData(count);
        break;
      case 'lorem':
        data = generateLoremText(count);
        break;
      case 'json':
        data = generateJsonData(count);
        break;
    }
    
    setGeneratedData(data);
    toast({ title: "Success", description: "Data generated successfully!" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedData);
    toast({ title: "Copied", description: "Data copied to clipboard!" });
  };

  const downloadData = () => {
    const blob = new Blob([generatedData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fake-data-${dataType}-${Date.now()}.${dataType === 'lorem' ? 'txt' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const dataTypes = [
    { value: 'person', label: 'Person Data', icon: User },
    { value: 'address', label: 'Address Data', icon: MapPin },
    { value: 'contact', label: 'Contact Info', icon: Mail },
    { value: 'lorem', label: 'Lorem Ipsum', icon: FileText },
    { value: 'json', label: 'Product JSON', icon: Database }
  ];

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Fake Data Generator</h1>
              <p className="text-xl text-muted-foreground">Generate test data for development and testing</p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Generate Test Data
                </CardTitle>
                <CardDescription>
                  Select data type and configure generation options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Type</label>
                    <Select value={dataType} onValueChange={(value) => setDataType(value as DataType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {dataType === 'lorem' ? 'Number of Paragraphs' : 'Number of Items'}
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                <Button onClick={generateData} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Generate Data
                </Button>
              </CardContent>
            </Card>

            {generatedData && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Generated Data</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" onClick={downloadData}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedData}
                    readOnly
                    className="min-h-[400px] font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}
          </motion.div>
                </div>
      </ToolLayout>
    </>
  );
}