export const CTT_TARIFF = {
  year: 2026,
  source: 'https://www.ctt.pt/application/themes/pdfs/tarifario_2026_MSV4_16_01.pdf',
  services: {
    normal: {
      label: 'Correio Normal',
      detail: 'Pacote postal nacional',
      bands: [[20,1.58],[50,1.58],[100,1.58],[500,2.34],[2000,5.55]],
    },
    azul: {
      label: 'Correio Azul',
      detail: 'Pacote postal nacional prioritário',
      bands: [[20,2.10],[50,2.10],[100,2.10],[500,3.90],[2000,7.80]],
    },
    registado: {
      label: 'Correio Registado',
      detail: 'Rastreio e entrega com assinatura',
      bands: [[20,4.60],[50,4.60],[100,4.60],[500,5.40],[2000,8.93]],
      extras: true,
    },
    registado_simples: {
      label: 'Registado Simples',
      detail: 'Rastreio e depósito na caixa de correio',
      bands: [[20,4.05],[50,4.05],[100,4.05]],
    },
  },
  extras: {
    receipt: {label:'Aviso de receção', price:1.79, taxable:false},
    electronic: {label:'Aviso eletrónico', price:0.73, taxable:true},
    own: {label:'Entrega ao próprio', price:1.60, taxable:false},
    cod: {label:'Envio à cobrança', price:4.31, taxable:true, maxAmount:2500},
  },
};

function priceForWeight(bands, weight){
  const band = bands.find(([max])=>weight<=max);
  return band ? {maxWeight:band[0], price:band[1]} : null;
}

function roundedMoney(value){
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateShippingQuote(input = {}){
  const weight = Number(input.weight);
  if(!Number.isFinite(weight) || weight<=0){
    return {error:'Indica o peso total do envio.'};
  }

  const service = CTT_TARIFF.services[input.service];
  if(!service) return {error:'Seleciona um tipo de envio válido.'};
  const base = priceForWeight(service.bands, weight);
  if(!base){
    const limit = service.bands[service.bands.length-1][0];
    return {error:`Este serviço admite bens apenas até ${limit} g.`};
  }

  const vatRate = Number.isFinite(Number(input.vatRate)) ? Number(input.vatRate) : 0.23;
  const lines = [{label:'Porte base', value:base.price, taxable:false}];
  let vat = 0;

  const addExtra = key => {
    const extra = CTT_TARIFF.extras[key];
    const extraVat = extra.taxable ? extra.price * vatRate : 0;
    vat += extraVat;
    lines.push({label:extra.label, value:roundedMoney(extra.price + extraVat), taxable:extra.taxable, net:extra.price, vat:roundedMoney(extraVat)});
  };

  if(service.extras){
    if(input.cod){
      const amount = Number(input.codAmount);
      if(!Number.isFinite(amount) || amount<=0) return {error:'Indica o valor a cobrar ao destinatário.'};
      if(amount>CTT_TARIFF.extras.cod.maxAmount) return {error:'O envio à cobrança está limitado a 2 500 €.'};
      addExtra('cod');
    }
    if(input.receipt || input.own) addExtra('receipt');
    if(input.own) addExtra('own');
    if(input.electronic) addExtra('electronic');
  }

  const total = roundedMoney(lines.reduce((sum,line)=>sum+line.value,0));
  return {
    service:service.label,
    detail:service.detail,
    weight,
    maxWeight:base.maxWeight,
    lines,
    vat:roundedMoney(vat),
    total,
    tariffYear:CTT_TARIFF.year,
  };
}
