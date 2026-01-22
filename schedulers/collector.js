import { getUserStations, getAllInvertersFormatted } from '../services/solis.js';

/**
 * Coleta periódica de dados dos inversores
 * @param {number} intervalMinutes - Intervalo em minutos entre coletas
 * @param {Function} onData - Callback chamado com os dados coletados
 */
export function startPeriodicCollection(intervalMinutes = 5, onData = null) {
  const intervalMs = intervalMinutes * 60 * 1000;

  async function collect() {
    try {
      console.log(`[${new Date().toISOString()}] Iniciando coleta...`);

      // Buscar todas as usinas
      const stations = await getUserStations();
      console.log(`Encontradas ${stations.length} usina(s)`);

      const allData = [];

      // Para cada usina, buscar todos os inversores formatados
      for (const station of stations) {
        console.log(`Coletando inversores da usina ${station.id}...`);
        const inverters = await getAllInvertersFormatted(station.id);
        allData.push({
          stationId: station.id,
          stationName: station.stationName,
          inverters
        });
      }

      console.log(`Coleta concluída: ${allData.reduce((sum, s) => sum + s.inverters.length, 0)} inversor(es)`);

      // Chamar callback se fornecido
      if (onData) {
        onData(allData);
      }

      return allData;
    } catch (err) {
      console.error('Erro na coleta periódica:', err.message);
      throw err;
    }
  }

  // Executar imediatamente
  collect();

  // Configurar intervalo
  const intervalId = setInterval(collect, intervalMs);

  return {
    stop: () => clearInterval(intervalId),
    collect: () => collect()
  };
}
