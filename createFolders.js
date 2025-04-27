function createFolders() {
  const mainFolder = DriveApp.createFolder('Recibos de Despesas');
  const accounts = [
    '344 - Almoço, Café e Lanches',
    '284 - Comissão Vendedores',
    '285 - Comissões Operador de Caixa',
    '199 - Cursos e Treinamentos',
    '347 - Decoração e Ornamentação Loja',
    '385 - Despesas Diversas',
    '203 - Estagiários e Aprendizes',
    '370 - Exame Médico Admissional/Demissional',
    '189 - Férias',
    '158 - Fretes',
    '110 - Manutenção de Máquinas e Equipamentos',
    '156 - Manutenção e Reparos Predial',
    '118 - Materiais de Expediente',
    '105 - Materiais de Limpeza',
    '312 - Material de Informática',
    '351 - Móveis, Utensílios e Bens',
    '192 - Multa Rescisória',
    '191 - Rescisões Contratuais',
    '357 - Sacolas',
    '324 - Salário Operadores de Caixa',
    '195 - Vales-Transporte',
    '129 - Viagens'
  ];
  accounts.forEach(account => {
    const subFolder = mainFolder.createFolder(account);
    Logger.log(`${account}: ${subFolder.getId()}`);
  });
}
