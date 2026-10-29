# LP Brenda Lopes Advocacia e Consultoria Jurídica — Vercel

Direito Trabalhista (defesa do trabalhador) e Direito Previdenciário · Pernambuco · Meta Ads.

Site estático, sem build. Publique todos os arquivos desta pasta na raiz do projeto, inclusive `config.js` e `vercel.json`.

- `/` → página (`index.html`)
- `/redirect` → página de 3 segundos que abre o WhatsApp (`redirect.html`). O formulário leva para ela depois que o lead é gravado, e o botão flutuante leva direto para ela.
- `/dashboard` → painel de leads (`dashboard.html`), com o usuário Admin
- `config.js` → WhatsApp, OAB, Pixel do Meta e Google tag. Se faltar, a página usa os valores padrão.
- `vercel.json` → endereços limpos (`/redirect`, `/dashboard`) e noindex nas páginas internas

## Captura de leads

Supabase "ADS BR CLIENTES" (`qxhnjzyhtllmtdrcyygi`), com `site = brenda-lopes` nas tabelas `lp_visits` e `lp_leads`.
O formulário pede só nome e WhatsApp. O lead é gravado **antes** do redirecionamento. Se o envio falhar, a pessoa vê o erro e o envio não é dado como concluído.
A origem (UTM, fbclid, gclid) vai na coluna `origem`. Nenhum dado de saúde, benefício ou documento é coletado.

## Pendências antes de ativar as campanhas

1. **Pixel do Meta:** preencher `tracking.metaPixelId` no `config.js`. O evento `Lead` só dispara com o lead gravado, e `Contact` dispara no clique do botão flutuante.
2. **Painel `/dashboard`:** criar no Supabase o usuário `admin@brenda-lopes.adsbr.internal` e o vínculo em `lp_acessos` para o site `brenda-lopes`, igual às outras LPs.
3. **Domínio:** apontar o domínio da cliente para o projeto no Vercel.
4. **Política de privacidade (opcional):** preencher `privacyPolicyUrl`.

## Imagens

As fotos em `assets/img/` foram geradas por IA (Magnific) para esta LP. Nenhuma retrata a advogada ou clientes reais.
A logo e o selo foram recortados do arquivo de identidade enviado pela cliente.
