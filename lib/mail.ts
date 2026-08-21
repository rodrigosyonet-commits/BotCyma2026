
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function sendTicketMail(data:any){

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "arrendamiento.cyma2025@gmail.com",
    subject: `Nuevo Ticket CYMA`,
    text: `
Cliente: ${data.name}
Teléfono: ${data.phone}
Correo: ${data.email || "Sin correo"}

Categoría: ${data.category}
Subcategoría: ${data.subcategory}
    `
  });

}
