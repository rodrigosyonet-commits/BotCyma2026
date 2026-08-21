import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type CustomerRow = {
  phone: string;
  customerNumber: string;
  name: string;
};

function parseCsv(csvText: string): CustomerRow[] {
  const lines = csvText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return [];
  }

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || "";
    });

    return {
      phone: row.phone,
      customerNumber: row.customerNumber,
      name: row.name,
    };
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Archivo no encontrado",
        },
        {
          status: 400,
        }
      );
    }

    const csvContent = await file.text();

    const customers = parseCsv(csvContent);

    let created = 0;
    let updated = 0;
    const errors: any[] = [];

    for (const customer of customers) {
      try {
        if (
          !customer.phone ||
          !customer.customerNumber ||
          !customer.name
        ) {
          errors.push({
            row: customer,
            error: "Campos obligatorios vacíos",
          });

          continue;
        }

        const existing =
          await prisma.customer.findUnique({
            where: {
              phone: customer.phone,
            },
          });

        if (existing) {
          await prisma.customer.update({
            where: {
              phone: customer.phone,
            },
            data: {
              name: customer.name,
              customerNumber:
                customer.customerNumber,
            },
          });

          updated++;
        } else {
          await prisma.customer.create({
            data: {
              phone: customer.phone,
              name: customer.name,
              customerNumber:
                customer.customerNumber,
            },
          });

          created++;
        }
      } catch (error: any) {
        errors.push({
          row: customer,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      total: customers.length,
      created,
      updated,
      errors,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
