function onFormSubmit(e) {
  const responses = e.namedValues;
  const conta = responses['Conta de Despesa'][0];
  const data = responses['Data da Despesa'][0];
  const descricao = responses['Descrição (Opcional)'][0] || 'SemDescrição';
  const fileUrl = responses['Recibo (PDF)'][0];

  // Mapear contas para IDs de pastas no Drive
  const folderIds = {
    '344 - Almoço, Café e Lanches': 'INSIRA_ID_DA_PASTA_344',
    '284 - Comissão Vendedores': 'INSIRA_ID_DA_PASTA_284',
    '285 - Comissões Operador de Caixa': 'INSIRA_ID_DA_PASTA_285',
    '199 - Cursos e Treinamentos': 'INSIRA_ID_DA_PASTA_199',
    '347 - Decoração e Ornamentação Loja': 'INSIRA_ID_DA_PASTA_347',
    '385 - Despesas Diversas': 'INSIRA_ID_DA_PASTA_385',
    '203 - Estagiários e Aprendizes': 'INSIRA_ID_DA_PASTA_203',
    '370 - Exame Médico Admissional/Demissional': 'INSIRA_ID_DA_PASTA_370',
    '189 - Férias': 'INSIRA_ID_DA_PASTA_189',
    '158 - Fretes': 'INSIRA_ID_DA_PASTA_158',
    '110 - Manutenção de Máquinas e Equipamentos': 'INSIRA_ID_DA_PASTA_110',
    '156 - Manutenção e Reparos Predial': 'INSIRA_ID_DA_PASTA_156',
    '118 - Materiais de Expediente': 'INSIRA_ID_DA_PASTA_118',
    '105 - Materiais de Limpeza': 'INSIRA_ID_DA_PASTA_105',
    '312 - Material de Informática': 'INSIRA_ID_DA_PASTA_312',
    '351 - Móveis, Utensílios e Bens': 'INSIRA_ID_DA_PASTA_351',
    '192 - Multa Rescisória': 'INSIRA_ID_DA_PASTA_192',
    '191 - Rescisões Contratuais': 'INSIRA_ID_DA_PASTA_191',
    '357 - Sacolas': 'INSIRA_ID_DA_PASTA_357',
    '324 - Salário Operadores de Caixa': 'INSIRA_ID_DA_PASTA_324',
    '195 - Vales-Transporte': 'INSIRA_ID_DA_PASTA_195',
    '129 - Viagens': 'INSIRA_ID_DA_PASTA_129'
  };

  const folderId = folderIds[conta];
  if (!folderId) {
    Logger.log('Conta não encontrada: ' + conta);
    return;
  }

  // Extrair ano e mês da data
  const date = new Date(data);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const yearMonth = `${year}-${month}`;

  // Criar/acessar subpasta por ano-mês
  const mainFolder = DriveApp.getFolderById(folderId);
  let subFolder;
  const subFolders = mainFolder.getFoldersByName(yearMonth);
  if (subFolders.hasNext()) {
    subFolder = subFolders.next();
  } else {
    subFolder = mainFolder.createFolder(yearMonth);
  }

  // Extrair ID do arquivo e renomear
  const fileId = fileUrl.match(/[-\w]{25,}/)[0];
  const file = DriveApp.getFileById(fileId);
  const safeDescription = descricao.replace(/[^a-zA-Z0-9]/g, '_'); // Remove caracteres especiais
  const newFileName = `${conta}_${data}_${safeDescription}.pdf`;
  file.setName(newFileName);

  // Mover arquivo para a subpasta
  file.moveTo(subFolder);

  // Registrar link na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, sheet.getLastColumn()).setValue(file.getUrl());
}
