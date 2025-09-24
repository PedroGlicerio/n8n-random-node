import { IExecuteFunctions } from 'n8n-workflow';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from 'n8n-workflow';
import axios from 'axios';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'trueRandomNumberGenerator',
    icon: 'file:icon.svg',
    group: ['transform'],
    version: 1,
    description: 'True Random Number Generator (via random.org)',
    defaults: {
      name: 'Random',
      color: '#6c5ce7',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Mínimo',
        name: 'min',
        type: 'number',
        default: 1,
        description: 'Número inteiro mínimo (inclusivo)',
        required: true,
      },
      {
        displayName: 'Máximo',
        name: 'max',
        type: 'number',
        default: 100,
        description: 'Número inteiro máximo (inclusivo)',
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter('min', i) as number;
      const max = this.getNodeParameter('max', i) as number;

      if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new NodeOperationError(this.getNode(), 'Mínimo e Máximo devem ser números.', { itemIndex: i });
      }

      if (min > max) {
        throw new NodeOperationError(this.getNode(), 'O valor mínimo deve ser menor ou igual ao valor máximo.', { itemIndex: i });
      }

      const url = `https://www.random.org/integers/?num=1&min=${Math.floor(min)}&max=${Math.floor(max)}&col=1&base=10&format=plain&rnd=new`;

      try {
        const resp = await axios.get<string>(url, { responseType: 'text', timeout: 10000 });
        const raw = String(resp.data).trim();
        const value = parseInt(raw, 10);

        if (Number.isNaN(value)) {
          throw new Error(`Resposta inválida do random.org: "${raw}"`);
        }

        returnData.push({
          json: {
            Resultado: value,
            Minimo: Math.floor(min),
            Maximo: Math.floor(max),
            DataHora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            Fonte: 'random.org',
          },
        });
      } catch (err: any) {
        throw new NodeOperationError(this.getNode(), `Erro ao chamar random.org: ${err?.message ?? err}`, { itemIndex: i });
      }
    }

    return [returnData];
  }
}