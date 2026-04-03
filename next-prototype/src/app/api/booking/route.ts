import { NextRequest, NextResponse } from 'next/server';

const SUPA_URL = process.env.SUPABASE_URL!;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY!;
const TG_TOKEN = process.env.TG_BOT_TOKEN!;
const TG_ADMIN = '1093152998';

interface BookingBody {
  name: string;
  phone: string;
  service: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingBody = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json({ ok: false, error: 'name and phone required' }, { status: 400 });
    }

    // Save to Supabase
    const supaRes = await fetch(`${SUPA_URL}/rest/v1/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPA_KEY,
        Authorization: `Bearer ${SUPA_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        name: body.name,
        phone: body.phone,
        service: body.service || '',
        source: 'website',
      }),
    });

    if (!supaRes.ok) {
      const err = await supaRes.text();
      console.error('Supabase error:', err);
      return NextResponse.json({ ok: false, error: 'db error' }, { status: 500 });
    }

    const rows = await supaRes.json();
    const id = rows[0]?.id;

    // Send TG notification
    const serviceMap: Record<string, string> = {
      v: 'Вініры',
      i: 'Імплантацыя',
      o: 'Артадонтыя',
      e: 'Эстэтыка',
      t: 'Тэрапія',
    };
    const svc = serviceMap[body.service] || body.service || '—';
    const text = `🦷 Новая запись!\n\n👤 ${body.name}\n📞 ${body.phone}\n🏥 ${svc}\n\n#booking`;

    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_ADMIN, text, parse_mode: 'HTML' }),
    }).catch(() => {});

    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: 'server error' }, { status: 500 });
  }
}
