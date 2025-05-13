import { CloudCog } from "lucide-react";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Web <noreply@resend.dev>",
      to: ["belenwarcok@gmail.com"],
      subject: "Nuevo mensaje de contacto desde el portfolio",
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><b>Nombre:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Teléfono:</b> ${data.phone}</p>
        <p><b>Empresa:</b> ${data.companyName}</p>
        <p><b>Sitio web / Red social:</b> ${data.website}</p>
        <p><b>País:</b> ${data.country}</p>
        <p><b>¿Cómo nos conociste?:</b> ${data.howDidYouHear}</p>
        <p><b>Rango de inversión:</b> ${data.investmentRange}</p>
        <p><b>Mensaje:</b> ${data.projectDetails}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    console.log("Email enviado correctamente");
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.log("Error en envío de email:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
} 