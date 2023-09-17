import transferBuilder from '../builders/transferBuilder'

interface Intent {
    intent: string;
    amount: string;
    currency: string;
    to: string;
}

async function intentAnalyser(params:Intent) {
    const intent = params.intent;
    switch (intent) {
        case 'transfer':
            const res = await transferBuilder(params);
            return res;
    }
}

export default intentAnalyser;