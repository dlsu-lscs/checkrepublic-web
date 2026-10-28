import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(
        {
            status: "ok",
            uptime: Math.round(process.uptime()),
            timestamp: new Date().toISOString(),
        },
        { headers: { "Cache-Control": "no-store" } },
    );
}