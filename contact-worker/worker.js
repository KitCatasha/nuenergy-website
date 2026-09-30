import { EmailMessage } from 'cloudflare:email';

const emailPattern =
  /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/;

const isEmail = value =>
  typeof value === 'string' &&
  value.length <= 254 &&
  emailPattern.test(value);

function emailSubject(value) {
  const words = [];
  let chunk = '';
  let size = 0;

  for (const character of value.replace(/[\r\n]/g, ' ')) {
    const length = new TextEncoder().encode(character).length;

    if (size + length > 42) {
      words.push(chunk);
      chunk = '';
      size = 0;
    }

    chunk += character;
    size += length;
  }

  if (chunk) words.push(chunk);

  return words.map(word => {
    const bytes = new TextEncoder().encode(word);
    const encoded = btoa(
      Array.from(bytes, byte => String.fromCharCode(byte)).join('')
    );
    return `=?UTF-8?B?${encoded}?=`;
  }).join('\r\n ');
}

export async function handleContact(request, env, deps) {
  const origin = request.headers.get('Origin');

  const origins = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

  const allowed = origins.includes(origin);

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  };

  if (allowed) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  const reply = (data, status = 200) =>
    new Response(JSON.stringify(data), { status, headers });

  if (!allowed) {
    return reply(
      { error: 'This website is not allowed to send messages.' },
      403
    );
  }

  if (new URL(request.url).pathname !== '/contact') {
    return reply({ error: 'Not found.' }, 404);
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...headers,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return reply({ error: 'Method not allowed.' }, 405);
  }

  if (
    !env.TURNSTILE_SECRET ||
    !isEmail(env.FROM_EMAIL) ||
    !isEmail(env.TO_EMAIL) ||
    !env.EMAIL
  ) {
    return reply(
      { error: 'The contact form is temporarily unavailable.' },
      503
    );
  }

  const contentType = request.headers.get('Content-Type') || '';

  if (!contentType.toLowerCase().startsWith('application/json')) {
    return reply({ error: 'Invalid request.' }, 415);
  }

  const reader = request.body?.getReader();

  if (!reader) {
    return reply({ error: 'Empty request.' }, 400);
  }

  const chunks = [];
  let size = 0;

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    size += value.byteLength;

    if (size > 24000) {
      await reader.cancel();
      return reply({ error: 'Your message is too long.' }, 413);
    }

    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }

  let data;

  try {
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return reply({ error: 'Invalid request.' }, 400);
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return reply({ error: 'Invalid request.' }, 400);
  }

  // Hidden field used to catch automated submissions.
  if (data.website) {
    return reply({ error: 'Please try again.' }, 400);
  }

  const { name, email, subject, message, token } = data;

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.length > 100 ||
    !isEmail(email) ||
    !['Product enquiry', 'Orders', 'Partnerships', 'Other'].includes(subject) ||
    typeof message !== 'string' ||
    message.trim().length < 10 ||
    message.length > 5000 ||
    typeof token !== 'string' ||
    !token ||
    token.length > 2048
  ) {
    return reply(
      { error: 'Please check your name, email and message.' },
      400
    );
  }

  try {
    const check = await deps.fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET,
          response: token,
          remoteip:
            request.headers.get('CF-Connecting-IP') || undefined,
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    const result = await check.json();

    if (
      !check.ok ||
      !result.success ||
      result.action !== 'contact' ||
      result.hostname !== new URL(origin).hostname
    ) {
      return reply(
        { error: 'Please complete the verification again.' },
        403
      );
    }

    const text = [
      'New NÜenergy website enquiry',
      '',
      `Name: ${name.trim()}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      message.trim(),
    ].join('\n');

    const encoded = btoa(
      Array.from(
        new TextEncoder().encode(text),
        byte => String.fromCharCode(byte)
      ).join('')
    )
      .match(/.{1,76}/g)
      .join('\r\n');

    const raw = [
      `From: Nuenergy Website <${env.FROM_EMAIL}>`,
      `To: ${env.TO_EMAIL}`,
      `Reply-To: ${email}`,
      `Subject: ${emailSubject(`Nuenergy — ${name.trim()} — ${subject}`)}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${crypto.randomUUID()}@${env.FROM_EMAIL.split('@')[1]}>`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      encoded,
      '',
    ].join('\r\n');

    await env.EMAIL.send(
      new deps.EmailMessage(env.FROM_EMAIL, env.TO_EMAIL, raw)
    );

    return reply({ ok: true });
  } catch (error) {
  console.error('Contact form error:', error.name, error.message);
  return reply(
      {
        error:
          'We could not send your message. Please try again later or email us directly.',
      },
      502
    );
  }
}

export default {
  fetch: (request, env) =>
    handleContact(request, env, {
      fetch: (url, options) => fetch(url, options),
      EmailMessage,
    }),
};