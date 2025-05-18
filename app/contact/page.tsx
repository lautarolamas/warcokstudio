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
import { Footer } from "@/components/footer";
import { Instagram, Linkedin } from "lucide-react";

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
                        <Input
                          id="country"
                          value={formState.country}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              country: e.target.value,
                            }))
                          }
                          placeholder="Argentina, España, ..."
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
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
                          <option value="$300.000 - $400.000">
                            $300.000 - $400.000
                          </option>
                          <option value="$500.000 - $700.000">
                            $500.000 - $700.000
                          </option>
                          <option value="$700.000 - $900.000">
                            $700.000 - $900.000
                          </option>
                          <option value="Otro">Otro</option>
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

      <Footer />
    </div>
  );
}
