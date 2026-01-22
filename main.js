import { getUserStations, getInverters, getInverterDetailFormatted } from './services/solis.js';
import { startPeriodicCollection } from './schedulers/collector.js';

// ===== EXEMPLOS DE USO =====

// Exemplo 1: Buscar usinas
(async () => {
  try {
    const stations = await getUserStations();
    console.log('Usinas:', JSON.stringify(stations, null, 2));
  } catch (err) {
    console.error('Erro ao buscar usinas:', err.message);
  }
})();

// Exemplo 2: Buscar inversores de uma usina
(async () => {
  try {
    const stations = await getUserStations();
    if (stations.length > 0) {
      const stationId = stations[0].id;
      const inverters = await getInverters(stationId);
      console.log('Inversores:', JSON.stringify(inverters, null, 2));
    }
  } catch (err) {
    console.error('Erro ao buscar inversores:', err.message);
  }
})();

// Exemplo 3: Buscar detalhes formatados de um inversor
(async () => {
  try {
    const formattedData = await getInverterDetailFormatted('110B40212230194');
    console.log('Inverter Detail (Formatado):', JSON.stringify(formattedData, null, 2));
  } catch (err) {
    console.error('Erro inverterDetail:', err.message);
  }
})();

// Exemplo 4: Coleta periódica (descomente para usar)
// const collector = startPeriodicCollection(5, (data) => {
//   console.log('Dados coletados:', JSON.stringify(data, null, 2));
// });
  