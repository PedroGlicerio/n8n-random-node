"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const axios_1 = __importDefault(require("axios"));
class Random {
    constructor() {
        this.description = {
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
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i);
            const max = this.getNodeParameter('max', i);
            if (!Number.isFinite(min) || !Number.isFinite(max)) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Mínimo e Máximo devem ser números.', { itemIndex: i });
            }
            if (min > max) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'O valor mínimo deve ser menor ou igual ao valor máximo.', { itemIndex: i });
            }
            const url = `https://www.random.org/integers/?num=1&min=${Math.floor(min)}&max=${Math.floor(max)}&col=1&base=10&format=plain&rnd=new`;
            try {
                const resp = await axios_1.default.get(url, { responseType: 'text', timeout: 10000 });
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
            }
            catch (err) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Erro ao chamar random.org: ${(_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err}`, { itemIndex: i });
            }
        }
        return [returnData];
    }
}
exports.Random = Random;
