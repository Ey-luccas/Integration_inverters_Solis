import 'dotenv/config';
import crypto from 'crypto';

const API_BASE = 'https://www.soliscloud.com:13333';
const CONTENT_TYPE = 'application/json';

// Validação das variáveis de ambiente
if (!process.env.SOLIS_API_ID) {
  throw new Error('SOLIS_API_ID não está definido no arquivo .env');
}
if (!process.env.SOLIS_API_SECRET) {
  throw new Error('SOLIS_API_SECRET não está definido no arquivo .env');
}

function gmtDate() {
  return new Date().toUTCString();
}

function md5Base64(str) {
  return crypto.createHash('md5').update(str, 'utf8').digest('base64');
}

function hmacSha1Base64(secret, str) {
  return crypto.createHmac('sha1', secret).update(str, 'utf8').digest('base64');
}

export async function solisPost(path, body = {}) {
  const bodyStr = JSON.stringify(body);
  const date = gmtDate();
  const contentMd5 = md5Base64(bodyStr);

  const stringToSign =
    `POST\n${contentMd5}\n${CONTENT_TYPE}\n${date}\n${path}`;

  const sign = hmacSha1Base64(
    process.env.SOLIS_API_SECRET,
    stringToSign
  );

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-MD5': contentMd5,
      'Content-Type': CONTENT_TYPE,
      'Date': date,
      'Authorization': `API ${process.env.SOLIS_API_ID}:${sign}`,
    },
    body: bodyStr,
  });

  const text = await res.text();
  
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  return data;
}
