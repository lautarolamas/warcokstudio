import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Verificar que la API key existe
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      name,
      email,
      projectDetails,
      companyName,
      website,
      phone,
      country,
      howDidYouHear,
      investmentRange,
    } = body;

    // Validar campos requeridos
    if (!name || !email || !projectDetails) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Validar que el email sea válido
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Enviar email usando el dominio verificado
    const { data, error } = await resend.emails.send({
      from: "Branding con Belu <contacto@brandingconbelu.com>",
      to: ["belenwarcok@gmail.com"],
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${companyName ? `<p><strong>Empresa:</strong> ${companyName}</p>` : ""}
        ${website ? `<p><strong>Sitio web:</strong> ${website}</p>` : ""}
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
        ${country ? `<p><strong>País:</strong> ${country}</p>` : ""}
        ${howDidYouHear ? `<p><strong>¿Cómo nos conoció?:</strong> ${howDidYouHear}</p>` : ""}
        ${investmentRange ? `<p><strong>Rango de inversión:</strong> ${investmentRange}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${projectDetails}</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { 
          error: "Error al enviar el email",
          details: error.message || "Error desconocido"
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    return NextResponse.json(
      { 
        error: "Error interno del servidor",
        details: error.message || "Error desconocido"
      },
      { status: 500 }
    );
  }
} 