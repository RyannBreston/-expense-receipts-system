# Sistema de Upload de Recibos de Despesas

Este projeto cria um sistema para upload de recibos em PDF usando **Google Forms**, organizando-os em pastas no **Google Drive** e registrando detalhes em uma planilha no **Google Sheets**. Usa **Google Apps Script** para automação.

## Como Funciona
- Um **Google Form** coleta:
  - Conta de despesa (ex.: "344 - Almoço, Café e Lanches").
  - Data da despesa.
  - Descrição (opcional).
  - PDF do recibo.
- Os PDFs são salvos em pastas no Google Drive, uma para cada conta.
- Uma planilha registra os detalhes (conta, data, descrição, link do PDF).
- A planilha pode ser exportada como CSV.

## Estrutura do Projeto
- `moveReceipts.js`: Script básico para mover PDFs para pastas.
- `moveReceiptsWithRename.js`: Versão alternativa com renomeação de PDFs e subpastas por ano-mês.
- `createFolders.js`: Script opcional para criar pastas no Drive.
- `README.md`: Este arquivo com instruções.

## Pré-requisitos
- Conta Google (para Forms, Drive, Sheets).
- Navegador web.

## Passo a Passo para Configurar

### 1. Criar o Google Form
1. Acesse [forms.google.com](https://forms.google.com/) e clique em "Formulário em branco".
2. Nomeie como "Upload de Recibos de Despesa".
3. Adicione quatro campos:

   **Campo 1: Conta de Despesa**
   - Tipo: Menu suspenso.
   - Título: "Conta de Despesa".
   - Copie e cole estas opções:
     ```
     344 - Almoço, Café e Lanches
     284 - Comissão Vendedores
     285 - Comissões Operador de Caixa
     199 - Cursos e Treinamentos
     347 - Decoração e Ornamentação Loja
     385 - Despesas Diversas
     203 - Estagiários e Aprendizes
     370 - Exame Médico Admissional/Demissional
     189 - Férias
     158 - Fretes
     110 - Manutenção de Máquinas e Equipamentos
     156 - Manutenção e Reparos Predial
     118 - Materiais de Expediente
     105 - Materiais de Limpeza
     312 - Material de Informática
     351 - Móveis, Utensílios e Bens
     192 - Multa Rescisória
     191 - Rescisões Contratuais
     357 - Sacolas
     324 - Salário Operadores de Caixa
     195 - Vales-Transporte
     129 - Viagens
     ```
   - Marque como obrigatória.

   **Campo 2: Data da Despesa**
   - Tipo: Data.
   - Título: "Data da Despesa".
   - Marque como obrigatória.

   **Campo 3: Descrição (Opcional)**
   - Tipo: Resposta curta.
   - Título: "Descrição (Opcional)".
   - Não marque como obrigatória.

   **Campo 4: Recibo (PDF)**
   - Tipo: Upload de arquivo.
   - Título: "Recibo (PDF)".
   - Configurações:
     - Permitir apenas "PDF".
     - Tamanho máximo: 10 MB.
     - Número máximo de arquivos: 1.
   - Marque como obrigatória.

4. Na aba "Respostas", clique no ícone de planilha verde e crie uma planilha chamada "Recibos de Despesas".
5. Teste o formulário:
   - Preencha com dados de teste (ex.: Conta: "344 - Almoço, Café e Lanches", Data: 26/04/2025, Descrição: "Teste", PDF: um PDF qualquer).
   - Confirme que a planilha registra a entrada.

### 2. Configurar o Google Drive
1. Acesse [drive.google.com](https://drive.google.com/).
2. Crie uma pasta chamada "Recibos de Despesas".
3. Dentro dela, crie 22 subpastas com os nomes exatos das contas (copie da lista do formulário).
4. Anote os IDs das pastas:
   - Clique com o botão direito em cada pasta > "Compartilhar" > "Copiar link".
   - O link será: `https://drive.google.com/drive/folders/ID_DA_PASTA`.
   - Salve os IDs em um arquivo de texto, ex.:
     ```
     344 - Almoço, Café e Lanches: ID_DA_PASTA_344
     284 - Comissão Vendedores: ID_DA_PASTA_284
     ...
     ```

   **Alternativa Rápida**:
   - Use o script em `createFolders.js` para criar as pastas e obter os IDs:
     ```javascript
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
     ```
   - Cole no Apps Script, execute e veja os IDs em "Exibir > Logs".

### 3. Configurar a Planilha
1. Abra a planilha "Recibos de Despesas" no Google Drive.
2. Verifique as colunas:
   - A: Timestamp
   - B: Conta de Despesa
   - C: Data da Despesa
   - D: Descrição (Opcional)
   - E: Recibo (PDF)
3. Adicione uma coluna:
   - Na coluna F, linha 1, escreva "Link do Arquivo".

### 4. Configurar o Google Apps Script
1. Na planilha, clique em **Extensões** > **Apps Script**.
2. Escolha uma das opções:
   - **Básica**: Use o script de `moveReceipts.js` (mover PDFs para pastas).
   - **Alternativa**: Use o script de `moveReceiptsWithRename.js` (renomear PDFs e usar subpastas por ano-mês).
3. Apague o código padrão e cole o script escolhido.
4. Substitua os `INSIRA_ID_DA_PASTA_XXX` pelos IDs das pastas coletados.
5. Salve com o nome "MoverRecibos".
6. Crie um gatilho:
   - Clique no ícone de relógio > "+ Adicionar Gatilho".
   - Função: `onFormSubmit`.
   - Evento: "No envio do formulário".
   - Tipo: "Planilha".
   - Salve e autorize.

### 5. Testar o Sistema
1. Preencha o formulário com:
   - Conta: "344 - Almoço, Café e Lanches".
   - Data: 26/04/2025.
   - Descrição: "Teste".
   - Upload: Um PDF qualquer.
2. Verifique o Drive:
   - **Básica**: Abra "Recibos de Despesas" > "344 - Almoço, Café e Lanches".
   - **Alternativa**: Abra "Recibos de Despesas" > "344 - Almoço, Café e Lanches" > "2025-04".
   - Confirme que o PDF está lá (com nome original ou renomeado, conforme o script).
3. Verifique a planilha:
   - Veja se a nova linha tem o link do PDF na coluna "Link do Arquivo".

### 6. Usar o Sistema
- **Consultar**: Abra a planilha para ver os registros.
- **Exportar**: Baixe como CSV (Arquivo > Download > CSV).
- **Organizar**: PDFs estão nas pastas do Drive.

## Versão Alternativa
- `moveReceiptsWithRename.js`: Inclui:
  - **Renomeação de PDFs**: Arquivos são renomeados como `conta_data_descrição.pdf` (ex.: `344 - Almoço, Café e Lanches_2025-04-26_Teste.pdf`).
  - **Subpastas por ano-mês**: PDFs são salvos em subpastas como `2025-04` dentro de cada conta.
  - **Como usar**: Substitua o script em **Passo 4** por `moveReceiptsWithRename.js`. O restante da configuração é o mesmo.

## Segurança
- No formulário, ative "Exige login" em **Configurações** > **Geral**.
- No Drive, restrinja as permissões da pasta "Recibos de Despesas".

## Problemas Comuns
- **Planilha vazia**: Verifique se o formulário está vinculado.
- **PDF não movido**: Confirme os IDs no script e o gatilho.
- **Erro no script**: Veja os logs (Apps Script > Exibir > Logs).

## Melhorias Futuras
- Enviar e-mails de confirmação.
- Validar o conteúdo dos PDFs.

## Licença
MIT License (veja o arquivo LICENSE).

## Contato
Abra uma issue para dúvidas.
