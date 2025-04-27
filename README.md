# Sistema de Upload de Recibos de Despesas

Este projeto implementa um sistema simples para upload e organização de recibos de despesas em formato PDF, usando **Google Forms**, **Google Drive** e **Google Apps Script**. Ele permite associar recibos a contas de despesas específicas, salvá-los em pastas organizadas no Drive e registrar os detalhes em uma planilha do Google Sheets.

## Funcionalidades
- **Google Form** para coletar:
  - Conta de despesa (escolhida de uma lista com 22 contas).
  - Data da despesa.
  - Descrição (opcional).
  - Arquivo PDF (recibo).
- **Google Drive** para armazenar PDFs em pastas separadas por conta (ex.: "344 - Almoço, Café e Lanches").
- **Google Sheets** para registrar detalhes de cada upload (conta, data, descrição, link do PDF).
- Exportação manual da planilha como CSV para relatórios ou integração.

## Pré-requisitos
- Conta Google (para acessar Forms, Drive e Sheets).
- Conhecimento básico de Google Apps Script.
- Navegador web (ex.: Chrome, Firefox).

## Estrutura do Projeto
- `moveReceipts.js`: Script para mover PDFs para as pastas corretas no Drive e registrar links na planilha.
- `README.md`: Este arquivo com instruções de configuração.

## Configuração Passo a Passo

### 1. Criar o Google Form
1. Acesse [forms.google.com](https://forms.google.com/) e crie um novo formulário.
2. Nomeie como "Upload de Recibos de Despesa".
3. Adicione os seguintes campos:

   **Campo 1: Conta de Despesa (Menu Suspenso)**
   - Título: "Conta de Despesa".
   - Tipo: Menu suspenso.
   - Opções (copie e cole):
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

   **Campo 2: Data da Despesa (Data)**
   - Título: "Data da Despesa".
   - Tipo: Data.
   - Marque como obrigatória.

   **Campo 3: Descrição (Opcional) (Resposta Curta)**
   - Título: "Descrição (Opcional)".
   - Tipo: Resposta curta.
   - Não marque como obrigatória.

   **Campo 4: Recibo (PDF) (Upload de Arquivo)**
   - Título: "Recibo (PDF)".
   - Tipo: Upload de arquivo.
   - Configurações:
     - Permitir apenas "PDF".
     - Tamanho máximo: 10 MB.
     - Número máximo de arquivos: 1.
   - Marque como obrigatória.

4. Na aba "Respostas", clique no ícone de planilha (verde) e crie uma nova planilha chamada "Recibos de Despesas".
5. Teste o formulário:
   - Preencha com dados de teste (ex.: Conta: "344 - Almoço, Café e Lanches", Data: 26/04/2025, Descrição: "Teste", PDF: arquivo de teste).
   - Verifique se a planilha registra a entrada.

### 2. Configurar o Google Drive
1. Acesse [drive.google.com](https://drive.google.com/).
2. Crie uma pasta chamada "Recibos de Despesas".
3. Dentro dela, crie 22 subpastas com os nomes exatos das contas:
