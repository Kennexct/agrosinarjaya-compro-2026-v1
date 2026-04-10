import { useState } from "react";
import { motion } from "motion/react";
import {
  Leaf,
  ShieldCheck,
  Truck,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Factory,
  Ship,
  Anchor
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const scriptURL = import.meta.env.VITE_GOOGLE_SHEET_WEB_APP_URL;

    if (!scriptURL) {
      setStatus("error");
      setErrorMessage("Form submission URL is not configured. Please add VITE_GOOGLE_SHEET_WEB_APP_URL to your .env file.");
      return;
    }

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-emerald-100/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-900 text-white">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-emerald-950">Agro Sinar Jaya</span>
          </div>
          <div className="hidden space-x-8 md:flex">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">About</a>
            <a href="#values" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">Values</a>
            <a href="#specs" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">Specifications</a>
            <a href="#supply-chain" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">Supply Chain</a>
          </div>
          <a
            href="#contact"
            className={cn(buttonVariants({ className: "bg-emerald-900 hover:bg-emerald-800 text-white" }))}
          >
            Contact Us
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
            alt="Sustainable Energy"
            className="h-full w-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-white"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-emerald-500/30 px-4 py-1 text-sm backdrop-blur-sm">
              Global Biomass Exporter
            </Badge>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Powering the Future with <br />
              <span className="text-emerald-400">Sustainable Biomass</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-emerald-50/80 sm:text-xl">
              Agro Sinar Jaya is a leading exporter of premium Palm Kernel Shells (PKS),
              delivering high-calorific renewable energy solutions to international markets in Japan and Korea.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-500">
                Explore Our Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-emerald-900">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-base font-semibold uppercase tracking-wider text-emerald-600">Our Foundation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Core Values of Excellence</p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Sustainability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    Our commitment to the environment is at our core. We source exclusively from RSPO-certified mills, ensuring zero deforestation and responsible land management.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Traceability (GGL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    We adhere to Green Gold Label (GGL) standards, providing full transparency from the plantation to the final delivery port. Every shipment is documented and verified.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Globe className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Reliability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    With a robust logistics network and strategic partnerships, we guarantee consistent supply and timely delivery to meet the demands of international power plants.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Specs */}
      <section id="specs" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-base font-semibold uppercase tracking-wider text-emerald-600">Premium Quality</h2>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Technical Specifications</h3>
              <p className="mt-4 text-lg text-slate-600">
                Our Palm Kernel Shells are processed and screened to meet the highest international standards for industrial biomass fuel.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "High Calorific Value for efficient combustion",
                  "Low moisture content for better storage and handling",
                  "Minimal impurities and ash content",
                  "Uniform size distribution for automated feeding systems"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-emerald-100 bg-white p-2 shadow-xl"
            >
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <Table>
                  <TableHeader className="bg-emerald-900">
                    <TableRow className="hover:bg-emerald-900">
                      <TableHead className="text-white">Parameter</TableHead>
                      <TableHead className="text-white">Typical Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Net Calorific Value (NCV)</TableCell>
                      <TableCell>3,800 - 4,200 kcal/kg</TableCell>
                    </TableRow>
                    <TableRow className="bg-emerald-50/30">
                      <TableCell className="font-medium">Total Moisture (As Received)</TableCell>
                      <TableCell>12% - 18%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ash Content (Dry Basis)</TableCell>
                      <TableCell>Max 3%</TableCell>
                    </TableRow>
                    <TableRow className="bg-emerald-50/30">
                      <TableCell className="font-medium">Impurities</TableCell>
                      <TableCell>Max 2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sulfur Content</TableCell>
                      <TableCell>Max 0.05%</TableCell>
                    </TableRow>
                    <TableRow className="bg-emerald-50/30">
                      <TableCell className="font-medium">Chlorine Content</TableCell>
                      <TableCell>Max 0.03%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supply Chain */}
      <section id="supply-chain" className="bg-emerald-950 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-base font-semibold uppercase tracking-wider text-emerald-400">Our Process</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">From Source to Global Port</p>
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-emerald-800 lg:block"></div>

            <div className="grid gap-12 lg:grid-cols-4">
              {[
                { icon: Factory, title: "RSPO Mills", desc: "Sourcing from certified palm oil mills across Indonesia." },
                { icon: Truck, title: "Inland Transport", desc: "Secure transport to our dedicated stockpiles." },
                { icon: Anchor, title: "Port Handling", desc: "Screening and loading at strategic international ports." },
                { icon: Ship, title: "Global Export", desc: "Direct shipment to Japan, Korea, and beyond." }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-800 text-emerald-400 shadow-lg ring-4 ring-emerald-950">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold">{step.title}</h4>
                  <p className="mt-2 text-emerald-100/70">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Partner with Us</h2>
            <p className="mt-4 text-lg text-slate-600">
              Inquire about our supply capacity, pricing, and logistics for your renewable energy needs.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email Us</h4>
                  <p className="text-slate-600">sales@agrosinarjaya.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Call Us</h4>
                  <p className="text-slate-600">+62 858 9955 7779</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Headquarters</h4>
                  <p className="text-slate-600">Batam, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Company Email</label>
                  <Input id="email" name="email" value={formData.email} onChange={handleInputChange} required type="email" placeholder="john@company.com" className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="company" className="text-sm font-medium text-slate-700">Company Name</label>
                  <Input id="company" name="company" value={formData.company} onChange={handleInputChange} required placeholder="Energy Corp Japan" className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required placeholder="Tell us about your requirements..." className="min-h-[150px] border-slate-200 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                
                {status === "error" && (
                  <div className="sm:col-span-2 p-4 bg-red-50 text-red-700 rounded-md text-sm">
                    {errorMessage}
                  </div>
                )}
                
                {status === "success" && (
                  <div className="sm:col-span-2 p-4 bg-emerald-50 text-emerald-700 rounded-md text-sm border border-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Thank you for your inquiry. We will get back to you shortly!
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="h-12 w-full bg-emerald-900 hover:bg-emerald-800 sm:col-span-2 disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-900 text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-emerald-950">Agro Sinar Jaya</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 Agro Sinar Jaya. All rights reserved. Sustainable Energy for a Greener Tomorrow.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
