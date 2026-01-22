export function formatInverterData(data) {
  return {
    inverterId: data.id,
    sn: data.sn,
    model: data.machine,

    // Status
    status: data.state === 2 ? 'OFFLINE' : 'ONLINE',
    lastUpdate: data.dataTimestamp,

    // Potência
    powerKw: data.psumCal,     // 0.02 kW
    powerW: data.pvAndAcCoupledPowerOrigin, // 20 W

    // Energia
    energyTodayKwh: data.eToday,
    energyMonthKwh: data.eMonth,
    energyYearKwh: data.eYear,
    energyTotalMwh: data.eTotal,

    // Elétrico básico
    voltageAc: data.uAc1,
    currentAc: data.iAc1,
    frequency: data.fac,

    // Fotovoltaico
    mppt1: {
      voltage: data.mpptUpv1,
      current: data.mpptIpv1,
      power: data.mpptPow1,
    },
    mppt2: {
      voltage: data.mpptUpv2,
      current: data.mpptIpv2,
      power: data.mpptPow2,
    },

    temperature: data.inverterTemperature
  };
}
