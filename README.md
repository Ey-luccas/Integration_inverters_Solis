# Solis Inverters API

Integração com a API Solis Cloud para monitoramento de inversores solares.

## 📁 Estrutura do Projeto

```
Solis-Inverters/
├── lib/
│   ├── client.js            # Cliente HTTP com autenticação HMAC
│   └── normalize.js         # Normalização de dados dos inversores
├── services/
│   └── solis.js            # Regras de negócio e serviços da API
├── schedulers/
│   └── collector.js        # Coleta periódica de dados
├── main.js                  # Exemplos de uso
├── .env                     # Configurações (não versionado)
└── package.json
```

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Solis-Inverters
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:
```
SOLIS_API_ID=seu_api_id_aqui
SOLIS_API_SECRET=seu_api_secret_aqui
```

## 📖 Uso

### Exemplo básico

```javascript
import { getUserStations, getInverterDetailFormatted } from './services/solis.js';

// Buscar usinas
const stations = await getUserStations();

// Buscar detalhes formatados de um inversor
const inverter = await getInverterDetailFormatted('110B40212230194');
console.log(inverter);
```

### Coleta periódica

```javascript
import { startPeriodicCollection } from './schedulers/collector.js';

const collector = startPeriodicCollection(5, (data) => {
  console.log('Dados coletados:', data);
  // Processar dados aqui
});

// Para parar a coleta
// collector.stop();
```

## 🔧 Módulos

### `lib/client.js`
Cliente HTTP com autenticação HMAC-SHA1 para comunicação com a API Solis.

**Funções:**
- `solisPost(path, body)` - Faz requisições POST autenticadas

### `lib/normalize.js`
Normalização de dados brutos da API para formato padronizado.

**Funções:**
- `formatInverterData(data)` - Formata dados do inversor

### `services/solis.js`
Serviços de negócio para interagir com a API.

**Funções:**
- `getUserStations(pageNo, pageSize)` - Lista usinas do usuário
- `getInverters(stationId, pageNo, pageSize)` - Lista inversores de uma usina
- `getInverterDetail(sn)` - Detalhes brutos de um inversor
- `getInverterDetailFormatted(sn)` - Detalhes formatados de um inversor
- `getAllInvertersFormatted(stationId)` - Todos os inversores formatados de uma usina

### `schedulers/collector.js`
Coleta periódica automática de dados.

**Funções:**
- `startPeriodicCollection(intervalMinutes, onData)` - Inicia coleta periódica

## 📝 Formato de Dados do Inversor

```javascript
{
  inverterId: string,
  sn: string,
  model: string,
  status: 'ONLINE' | 'OFFLINE',
  lastUpdate: timestamp,
  powerKw: number,
  powerW: number,
  energyTodayKwh: number,
  energyMonthKwh: number,
  energyYearKwh: number,
  energyTotalMwh: number,
  voltageAc: number,
  currentAc: number,
  frequency: number,
  mppt1: { voltage, current, power },
  mppt2: { voltage, current, power },
  temperature: number
}
```

## 🔐 Segurança

- Nunca commite o arquivo `.env` no Git
- Mantenha suas credenciais seguras
- Use variáveis de ambiente em produção

## 📄 Licença

ISC
