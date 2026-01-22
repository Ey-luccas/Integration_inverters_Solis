import { solisPost } from '../lib/client.js';
import { formatInverterData } from '../lib/normalize.js';

/**
 * Busca lista de usinas do usuário
 */
export async function getUserStations(pageNo = 1, pageSize = 20) {
  const response = await solisPost('/v1/api/userStationList', {
    pageNo,
    pageSize
  });
  return response.data?.page?.records || [];
}

/**
 * Busca lista de inversores de uma usina
 */
export async function getInverters(stationId, pageNo = 1, pageSize = 10) {
  const response = await solisPost('/v1/api/inverterList', {
    stationId,
    pageNo,
    pageSize
  });
  return response.data?.page?.records || [];
}

/**
 * Busca detalhes de um inversor pelo serial number
 */
export async function getInverterDetail(sn) {
  const response = await solisPost('/v1/api/inverterDetail', { sn });
  return response.data;
}

/**
 * Busca detalhes formatados de um inversor
 */
export async function getInverterDetailFormatted(sn) {
  const data = await getInverterDetail(sn);
  return formatInverterData(data);
}

/**
 * Busca todos os inversores de uma usina com detalhes formatados
 */
export async function getAllInvertersFormatted(stationId) {
  const inverters = await getInverters(stationId);
  const formattedInverters = [];

  for (const inverter of inverters) {
    try {
      const detail = await getInverterDetailFormatted(inverter.sn);
      formattedInverters.push(detail);
    } catch (err) {
      console.error(`Erro ao buscar detalhes do inversor ${inverter.sn}:`, err.message);
    }
  }

  return formattedInverters;
}
