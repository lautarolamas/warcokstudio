"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    companyName: "",
    website: "",
    phone: "",
    country: "",
    howDidYouHear: "",
    investmentRange: "",
    submitted: false,
    loading: false,
  });

  const getInvestmentRanges = (country: string) => {
    // European countries
    const europeanCountries = [
      "Albania",
      "Andorra",
      "Austria",
      "Belarus",
      "Belgium",
      "Bosnia and Herzegovina",
      "Bulgaria",
      "Croatia",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "Hungary",
      "Iceland",
      "Ireland",
      "Italy",
      "Latvia",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Malta",
      "Moldova",
      "Monaco",
      "Montenegro",
      "Netherlands",
      "North Macedonia",
      "Norway",
      "Poland",
      "Portugal",
      "Romania",
      "Russia",
      "San Marino",
      "Serbia",
      "Slovakia",
      "Slovenia",
      "Spain",
      "Sweden",
      "Switzerland",
      "Ukraine",
      "United Kingdom",
      "Vatican City",
    ];

    // Latin American countries (excluding Argentina)
    const latinAmericanCountries = [
      // North America
      "Canada",
      "United States",
      "Mexico",
      // Central America
      "Belize",
      "Costa Rica",
      "El Salvador",
      "Guatemala",
      "Honduras",
      "Nicaragua",
      "Panama",
      // South America
      "Bolivia",
      "Brazil",
      "Chile",
      "Colombia",
      "Cuba",
      "Dominican Republic",
      "Ecuador",
      "Haiti",
      "Paraguay",
      "Peru",
      "Uruguay",
      "Venezuela",
    ];

    if (europeanCountries.includes(country)) {
      return [
        { value: "€250.000 - €350.000", label: "€250.000 - €350.000" },
        { value: "€400.000 - €600.000", label: "€400.000 - €600.000" },
        { value: "€600.000 - €800.000", label: "€600.000 - €800.000" },
        { value: "Otro", label: "Otro" },
      ];
    } else if (latinAmericanCountries.includes(country)) {
      return [
        { value: "$300.000 - $400.000", label: "$300.000 - $400.000" },
        { value: "$500.000 - $700.000", label: "$500.000 - $700.000" },
        { value: "$700.000 - $900.000", label: "$700.000 - $900.000" },
        { value: "Otro", label: "Otro" },
      ];
    } else {
      // Default ranges (in USD)
      return [
        { value: "$300.000 - $400.000", label: "$300.000 - $400.000" },
        { value: "$500.000 - $700.000", label: "$500.000 - $700.000" },
        { value: "$700.000 - $900.000", label: "$700.000 - $900.000" },
        { value: "Otro", label: "Otro" },
      ];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true }));

    // Enviar los datos al endpoint de contacto
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        projectDetails: formState.message,
        companyName: formState.companyName,
        website: formState.website,
        phone: formState.phone,
        country: formState.country,
        howDidYouHear: formState.howDidYouHear,
        investmentRange: formState.investmentRange,
      }),
    });

    if (res.ok) {
      setFormState((prev) => ({
        ...prev,
        submitted: true,
        loading: false,
      }));
      console.log("¡Mensaje enviado correctamente!");
    } else {
      setFormState((prev) => ({
        ...prev,
        loading: false,
      }));
      const errorData = await res.json();
      console.log("Error al enviar email:", errorData);
      alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-light mb-10">
                Contacto
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-2xl font-light mb-6">
                  Información de contacto
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light mb-2">Email</h3>
                    <p className="text-neutral-400">belenwarcok@gmail.com</p>
                  </div>
                  {/* <div>
                    <h3 className="text-lg font-light mb-2">Teléfono</h3>
                    <p className="text-neutral-400">+34 123 456 789</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Dirección</h3>
                    <p className="text-neutral-400">
                      Calle Principal 123
                      <br />
                      28001 Madrid, España
                    </p>
                  </div> */}
                  <div>
                    <h3 className="text-lg font-light mb-2">Redes sociales</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.instagram.com/brandingconbelu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.linkedin.com/in/belenwarcok/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://www.behance.net/bwarcok"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        Behance
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {formState.submitted ? (
                  <div className="p-6 border border-neutral-800 rounded-lg">
                    <h2 className="text-2xl font-light mb-4">
                      Mensaje enviado
                    </h2>
                    <p className="text-neutral-400 mb-6">
                      Gracias por contactarnos. Te responderemos lo antes
                      posible.
                    </p>
                    <Button
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, submitted: false }))
                      }
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black"
                    >
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-light mb-6">
                      Envíanos un mensaje
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Tu nombre"
                          required
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Empresa</Label>
                        <Input
                          id="companyName"
                          value={formState.companyName}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              companyName: e.target.value,
                            }))
                          }
                          placeholder="Nombre de la empresa"
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Sitio web / Red social</Label>
                        <Input
                          id="website"
                          value={formState.website}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              website: e.target.value,
                            }))
                          }
                          placeholder="www.tuweb.com / @instagram"
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="tu@email.com"
                          required
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="+34..."
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Select
                          value={formState.country}
                          onValueChange={(value) => {
                            setFormState((prev) => ({
                              ...prev,
                              country: value,
                              investmentRange: "", // Reset investment range when country changes
                            }));
                          }}
                        >
                          <SelectTrigger className="bg-transparent border-neutral-800 focus:border-white">
                            <SelectValue placeholder="Selecciona un país" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] overflow-y-auto bg-black border-neutral-800 text-white">
                            <SelectItem
                              value="Afghanistan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Afganistán
                            </SelectItem>
                            <SelectItem
                              value="Albania"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Albania
                            </SelectItem>
                            <SelectItem
                              value="Algeria"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Argelia
                            </SelectItem>
                            <SelectItem
                              value="Andorra"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Andorra
                            </SelectItem>
                            <SelectItem
                              value="Angola"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Angola
                            </SelectItem>
                            <SelectItem
                              value="Antigua and Barbuda"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Antigua y Barbuda
                            </SelectItem>
                            <SelectItem
                              value="Argentina"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Argentina
                            </SelectItem>
                            <SelectItem
                              value="Armenia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Armenia
                            </SelectItem>
                            <SelectItem
                              value="Australia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Australia
                            </SelectItem>
                            <SelectItem
                              value="Austria"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Austria
                            </SelectItem>
                            <SelectItem
                              value="Azerbaijan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Azerbaiyán
                            </SelectItem>
                            <SelectItem
                              value="Bahamas"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bahamas
                            </SelectItem>
                            <SelectItem
                              value="Bahrain"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Baréin
                            </SelectItem>
                            <SelectItem
                              value="Bangladesh"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bangladés
                            </SelectItem>
                            <SelectItem
                              value="Barbados"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Barbados
                            </SelectItem>
                            <SelectItem
                              value="Belarus"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bielorrusia
                            </SelectItem>
                            <SelectItem
                              value="Belgium"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bélgica
                            </SelectItem>
                            <SelectItem
                              value="Belize"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Belice
                            </SelectItem>
                            <SelectItem
                              value="Benin"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Benín
                            </SelectItem>
                            <SelectItem
                              value="Bhutan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bután
                            </SelectItem>
                            <SelectItem
                              value="Bolivia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bolivia
                            </SelectItem>
                            <SelectItem
                              value="Bosnia and Herzegovina"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bosnia y Herzegovina
                            </SelectItem>
                            <SelectItem
                              value="Botswana"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Botsuana
                            </SelectItem>
                            <SelectItem
                              value="Brazil"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Brasil
                            </SelectItem>
                            <SelectItem
                              value="Brunei"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Brunéi
                            </SelectItem>
                            <SelectItem
                              value="Bulgaria"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Bulgaria
                            </SelectItem>
                            <SelectItem
                              value="Burkina Faso"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Burkina Faso
                            </SelectItem>
                            <SelectItem
                              value="Burundi"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Burundi
                            </SelectItem>
                            <SelectItem
                              value="Cabo Verde"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Cabo Verde
                            </SelectItem>
                            <SelectItem
                              value="Cambodia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Camboya
                            </SelectItem>
                            <SelectItem
                              value="Cameroon"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Camerún
                            </SelectItem>
                            <SelectItem
                              value="Canada"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Canadá
                            </SelectItem>
                            <SelectItem
                              value="Central African Republic"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              República Centroafricana
                            </SelectItem>
                            <SelectItem
                              value="Chad"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Chad
                            </SelectItem>
                            <SelectItem
                              value="Chile"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Chile
                            </SelectItem>
                            <SelectItem
                              value="China"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              China
                            </SelectItem>
                            <SelectItem
                              value="Colombia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Colombia
                            </SelectItem>
                            <SelectItem
                              value="Comoros"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Comoras
                            </SelectItem>
                            <SelectItem
                              value="Congo"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Congo
                            </SelectItem>
                            <SelectItem
                              value="Costa Rica"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Costa Rica
                            </SelectItem>
                            <SelectItem
                              value="Croatia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Croacia
                            </SelectItem>
                            <SelectItem
                              value="Cuba"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Cuba
                            </SelectItem>
                            <SelectItem
                              value="Cyprus"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Chipre
                            </SelectItem>
                            <SelectItem
                              value="Czech Republic"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              República Checa
                            </SelectItem>
                            <SelectItem
                              value="Denmark"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Dinamarca
                            </SelectItem>
                            <SelectItem
                              value="Djibouti"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Yibuti
                            </SelectItem>
                            <SelectItem
                              value="Dominica"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Dominica
                            </SelectItem>
                            <SelectItem
                              value="Dominican Republic"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              República Dominicana
                            </SelectItem>
                            <SelectItem
                              value="Ecuador"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Ecuador
                            </SelectItem>
                            <SelectItem
                              value="Egypt"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Egipto
                            </SelectItem>
                            <SelectItem
                              value="El Salvador"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              El Salvador
                            </SelectItem>
                            <SelectItem
                              value="Equatorial Guinea"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Guinea Ecuatorial
                            </SelectItem>
                            <SelectItem
                              value="Eritrea"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Eritrea
                            </SelectItem>
                            <SelectItem
                              value="Estonia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Estonia
                            </SelectItem>
                            <SelectItem
                              value="Eswatini"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Suazilandia
                            </SelectItem>
                            <SelectItem
                              value="Ethiopia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Etiopía
                            </SelectItem>
                            <SelectItem
                              value="Fiji"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Fiyi
                            </SelectItem>
                            <SelectItem
                              value="Finland"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Finlandia
                            </SelectItem>
                            <SelectItem
                              value="France"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Francia
                            </SelectItem>
                            <SelectItem
                              value="Gabon"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Gabón
                            </SelectItem>
                            <SelectItem
                              value="Gambia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Gambia
                            </SelectItem>
                            <SelectItem
                              value="Georgia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Georgia
                            </SelectItem>
                            <SelectItem
                              value="Germany"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Alemania
                            </SelectItem>
                            <SelectItem
                              value="Ghana"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Ghana
                            </SelectItem>
                            <SelectItem
                              value="Greece"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Grecia
                            </SelectItem>
                            <SelectItem
                              value="Grenada"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Granada
                            </SelectItem>
                            <SelectItem
                              value="Guatemala"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Guatemala
                            </SelectItem>
                            <SelectItem
                              value="Guinea"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Guinea
                            </SelectItem>
                            <SelectItem
                              value="Guinea-Bissau"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Guinea-Bisáu
                            </SelectItem>
                            <SelectItem
                              value="Guyana"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Guyana
                            </SelectItem>
                            <SelectItem
                              value="Haiti"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Haití
                            </SelectItem>
                            <SelectItem
                              value="Honduras"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Honduras
                            </SelectItem>
                            <SelectItem
                              value="Hungary"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Hungría
                            </SelectItem>
                            <SelectItem
                              value="Iceland"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Islandia
                            </SelectItem>
                            <SelectItem
                              value="India"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              India
                            </SelectItem>
                            <SelectItem
                              value="Indonesia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Indonesia
                            </SelectItem>
                            <SelectItem
                              value="Iran"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Irán
                            </SelectItem>
                            <SelectItem
                              value="Iraq"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Irak
                            </SelectItem>
                            <SelectItem
                              value="Ireland"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Irlanda
                            </SelectItem>
                            <SelectItem
                              value="Israel"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Israel
                            </SelectItem>
                            <SelectItem
                              value="Italy"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Italia
                            </SelectItem>
                            <SelectItem
                              value="Jamaica"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Jamaica
                            </SelectItem>
                            <SelectItem
                              value="Japan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Japón
                            </SelectItem>
                            <SelectItem
                              value="Jordan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Jordania
                            </SelectItem>
                            <SelectItem
                              value="Kazakhstan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Kazajistán
                            </SelectItem>
                            <SelectItem
                              value="Kenya"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Kenia
                            </SelectItem>
                            <SelectItem
                              value="Kiribati"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Kiribati
                            </SelectItem>
                            <SelectItem
                              value="Kuwait"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Kuwait
                            </SelectItem>
                            <SelectItem
                              value="Kyrgyzstan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Kirguistán
                            </SelectItem>
                            <SelectItem
                              value="Laos"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Laos
                            </SelectItem>
                            <SelectItem
                              value="Latvia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Letonia
                            </SelectItem>
                            <SelectItem
                              value="Lebanon"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Líbano
                            </SelectItem>
                            <SelectItem
                              value="Lesotho"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Lesoto
                            </SelectItem>
                            <SelectItem
                              value="Liberia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Liberia
                            </SelectItem>
                            <SelectItem
                              value="Libya"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Libia
                            </SelectItem>
                            <SelectItem
                              value="Liechtenstein"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Liechtenstein
                            </SelectItem>
                            <SelectItem
                              value="Lithuania"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Lituania
                            </SelectItem>
                            <SelectItem
                              value="Luxembourg"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Luxemburgo
                            </SelectItem>
                            <SelectItem
                              value="Madagascar"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Madagascar
                            </SelectItem>
                            <SelectItem
                              value="Malawi"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Malaui
                            </SelectItem>
                            <SelectItem
                              value="Malaysia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Malasia
                            </SelectItem>
                            <SelectItem
                              value="Maldives"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Maldivas
                            </SelectItem>
                            <SelectItem
                              value="Mali"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Malí
                            </SelectItem>
                            <SelectItem
                              value="Malta"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Malta
                            </SelectItem>
                            <SelectItem
                              value="Marshall Islands"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Islas Marshall
                            </SelectItem>
                            <SelectItem
                              value="Mauritania"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Mauritania
                            </SelectItem>
                            <SelectItem
                              value="Mauritius"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Mauricio
                            </SelectItem>
                            <SelectItem
                              value="Mexico"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              México
                            </SelectItem>
                            <SelectItem
                              value="Micronesia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Micronesia
                            </SelectItem>
                            <SelectItem
                              value="Moldova"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Moldavia
                            </SelectItem>
                            <SelectItem
                              value="Monaco"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Mónaco
                            </SelectItem>
                            <SelectItem
                              value="Mongolia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Mongolia
                            </SelectItem>
                            <SelectItem
                              value="Montenegro"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Montenegro
                            </SelectItem>
                            <SelectItem
                              value="Morocco"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Marruecos
                            </SelectItem>
                            <SelectItem
                              value="Mozambique"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Mozambique
                            </SelectItem>
                            <SelectItem
                              value="Myanmar"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Myanmar
                            </SelectItem>
                            <SelectItem
                              value="Namibia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Namibia
                            </SelectItem>
                            <SelectItem
                              value="Nauru"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Nauru
                            </SelectItem>
                            <SelectItem
                              value="Nepal"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Nepal
                            </SelectItem>
                            <SelectItem
                              value="Netherlands"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Países Bajos
                            </SelectItem>
                            <SelectItem
                              value="New Zealand"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Nueva Zelanda
                            </SelectItem>
                            <SelectItem
                              value="Nicaragua"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Nicaragua
                            </SelectItem>
                            <SelectItem
                              value="Niger"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Níger
                            </SelectItem>
                            <SelectItem
                              value="Nigeria"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Nigeria
                            </SelectItem>
                            <SelectItem
                              value="North Korea"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Corea del Norte
                            </SelectItem>
                            <SelectItem
                              value="North Macedonia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Macedonia del Norte
                            </SelectItem>
                            <SelectItem
                              value="Norway"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Noruega
                            </SelectItem>
                            <SelectItem
                              value="Oman"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Omán
                            </SelectItem>
                            <SelectItem
                              value="Pakistan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Pakistán
                            </SelectItem>
                            <SelectItem
                              value="Palau"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Palaos
                            </SelectItem>
                            <SelectItem
                              value="Palestine"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Palestina
                            </SelectItem>
                            <SelectItem
                              value="Panama"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Panamá
                            </SelectItem>
                            <SelectItem
                              value="Papua New Guinea"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Papúa Nueva Guinea
                            </SelectItem>
                            <SelectItem
                              value="Paraguay"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Paraguay
                            </SelectItem>
                            <SelectItem
                              value="Peru"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Perú
                            </SelectItem>
                            <SelectItem
                              value="Philippines"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Filipinas
                            </SelectItem>
                            <SelectItem
                              value="Poland"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Polonia
                            </SelectItem>
                            <SelectItem
                              value="Portugal"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Portugal
                            </SelectItem>
                            <SelectItem
                              value="Qatar"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Catar
                            </SelectItem>
                            <SelectItem
                              value="Romania"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Rumanía
                            </SelectItem>
                            <SelectItem
                              value="Russia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Rusia
                            </SelectItem>
                            <SelectItem
                              value="Rwanda"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Ruanda
                            </SelectItem>
                            <SelectItem
                              value="Saint Kitts and Nevis"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              San Cristóbal y Nieves
                            </SelectItem>
                            <SelectItem
                              value="Saint Lucia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Santa Lucía
                            </SelectItem>
                            <SelectItem
                              value="Saint Vincent and the Grenadines"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              San Vicente y las Granadinas
                            </SelectItem>
                            <SelectItem
                              value="Samoa"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Samoa
                            </SelectItem>
                            <SelectItem
                              value="San Marino"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              San Marino
                            </SelectItem>
                            <SelectItem
                              value="Sao Tome and Principe"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Santo Tomé y Príncipe
                            </SelectItem>
                            <SelectItem
                              value="Saudi Arabia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Arabia Saudita
                            </SelectItem>
                            <SelectItem
                              value="Senegal"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Senegal
                            </SelectItem>
                            <SelectItem
                              value="Serbia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Serbia
                            </SelectItem>
                            <SelectItem
                              value="Seychelles"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Seychelles
                            </SelectItem>
                            <SelectItem
                              value="Sierra Leone"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Sierra Leona
                            </SelectItem>
                            <SelectItem
                              value="Singapore"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Singapur
                            </SelectItem>
                            <SelectItem
                              value="Slovakia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Eslovaquia
                            </SelectItem>
                            <SelectItem
                              value="Slovenia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Eslovenia
                            </SelectItem>
                            <SelectItem
                              value="Solomon Islands"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Islas Salomón
                            </SelectItem>
                            <SelectItem
                              value="Somalia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Somalia
                            </SelectItem>
                            <SelectItem
                              value="South Africa"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Sudáfrica
                            </SelectItem>
                            <SelectItem
                              value="South Korea"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Corea del Sur
                            </SelectItem>
                            <SelectItem
                              value="South Sudan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Sudán del Sur
                            </SelectItem>
                            <SelectItem
                              value="Spain"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              España
                            </SelectItem>
                            <SelectItem
                              value="Sri Lanka"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Sri Lanka
                            </SelectItem>
                            <SelectItem
                              value="Sudan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Sudán
                            </SelectItem>
                            <SelectItem
                              value="Suriname"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Surinam
                            </SelectItem>
                            <SelectItem
                              value="Sweden"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Suecia
                            </SelectItem>
                            <SelectItem
                              value="Switzerland"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Suiza
                            </SelectItem>
                            <SelectItem
                              value="Syria"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Siria
                            </SelectItem>
                            <SelectItem
                              value="Taiwan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Taiwán
                            </SelectItem>
                            <SelectItem
                              value="Tajikistan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Tayikistán
                            </SelectItem>
                            <SelectItem
                              value="Tanzania"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Tanzania
                            </SelectItem>
                            <SelectItem
                              value="Thailand"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Tailandia
                            </SelectItem>
                            <SelectItem
                              value="Timor-Leste"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Timor Oriental
                            </SelectItem>
                            <SelectItem
                              value="Togo"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Togo
                            </SelectItem>
                            <SelectItem
                              value="Tonga"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Tonga
                            </SelectItem>
                            <SelectItem
                              value="Trinidad and Tobago"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Trinidad y Tobago
                            </SelectItem>
                            <SelectItem
                              value="Tunisia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Túnez
                            </SelectItem>
                            <SelectItem
                              value="Turkey"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Turquía
                            </SelectItem>
                            <SelectItem
                              value="Turkmenistan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Turkmenistán
                            </SelectItem>
                            <SelectItem
                              value="Tuvalu"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Tuvalu
                            </SelectItem>
                            <SelectItem
                              value="Uganda"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Uganda
                            </SelectItem>
                            <SelectItem
                              value="Ukraine"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Ucrania
                            </SelectItem>
                            <SelectItem
                              value="United Arab Emirates"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Emiratos Árabes Unidos
                            </SelectItem>
                            <SelectItem
                              value="United Kingdom"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Reino Unido
                            </SelectItem>
                            <SelectItem
                              value="United States"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Estados Unidos
                            </SelectItem>
                            <SelectItem
                              value="Uruguay"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Uruguay
                            </SelectItem>
                            <SelectItem
                              value="Uzbekistan"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Uzbekistán
                            </SelectItem>
                            <SelectItem
                              value="Vanuatu"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Vanuatu
                            </SelectItem>
                            <SelectItem
                              value="Vatican City"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Ciudad del Vaticano
                            </SelectItem>
                            <SelectItem
                              value="Venezuela"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Venezuela
                            </SelectItem>
                            <SelectItem
                              value="Vietnam"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Vietnam
                            </SelectItem>
                            <SelectItem
                              value="Yemen"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Yemen
                            </SelectItem>
                            <SelectItem
                              value="Zambia"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Zambia
                            </SelectItem>
                            <SelectItem
                              value="Zimbabwe"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Zimbabue
                            </SelectItem>
                            <SelectItem
                              value="Other"
                              className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                              Otro
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea
                          id="message"
                          value={formState.message}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          placeholder="Cuéntanos sobre tu proyecto..."
                          required
                          className="min-h-[150px] bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="howDidYouHear">
                          ¿Cómo nos conociste?
                        </Label>
                        <select
                          id="howDidYouHear"
                          value={formState.howDidYouHear}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              howDidYouHear: e.target.value,
                            }))
                          }
                          className="bg-transparent border-neutral-800 focus:border-white w-full py-2 px-3 rounded"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="referral">Recomendación</option>
                          <option value="google">Google</option>
                          <option value="social">Redes sociales</option>
                          <option value="other">Otro</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investmentRange">
                          Rango de inversión
                        </Label>
                        <select
                          id="investmentRange"
                          value={formState.investmentRange}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              investmentRange: e.target.value,
                            }))
                          }
                          className="bg-transparent border-neutral-800 focus:border-white w-full py-2 px-3 rounded"
                        >
                          <option value="">Selecciona un rango</option>
                          {getInvestmentRanges(formState.country).map(
                            (range) => (
                              <option key={range.value} value={range.value}>
                                {range.label}
                          </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={formState.loading}
                      className="bg-white text-black hover:bg-neutral-200"
                    >
                      {formState.loading ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Belen Warcok
          </p>
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/brandingconbelu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/belenwarcok/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/bwarcok"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              Behance
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
