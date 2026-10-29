/*
 * Configuração central da LP — Brenda Lopes Advocacia e Consultoria Jurídica
 * (Direito Trabalhista e Direito Previdenciário · Pernambuco)
 * Tudo que depende do cliente ou de acessos externos fica aqui.
 * Alterar este arquivo NÃO exige mexer no HTML, CSS ou JS da página.
 */
window.BL_CONFIG = {
  office: {
    name: "Brenda Lopes Advocacia e Consultoria Jurídica",
    shortName: "Brenda Lopes",
    area: "Direito Trabalhista e Previdenciário",
    city: "",
    state: "Pernambuco",
    oab: "OAB/PE 65.727"
  },

  // Identificador desta LP na coluna "site" de lp_visits / lp_leads
  site: "brenda-lopes",
  // Página dentro do site (vai no fim da coluna "origem" do lead)
  pageKey: "principal",

  whatsapp: {
    // Número informado no briefing: (81) 98214-5074
    number: "5581982145074",
    confirmed: true,
    // Mensagem enviada ao abrir o WhatsApp (sem dados pessoais ou sensíveis)
    message: "Olá! Vim pela página da Brenda Lopes Advocacia e gostaria de informações sobre atendimento jurídico."
  },

  // Backend de captura — Supabase "ADS BR CLIENTES" (mesmo das outras LPs da ADS BR).
  // Chave publicável (anon): só permite INSERIR visitas e leads; a leitura exige login (RLS + lp_acessos).
  backend: {
    supabaseUrl: "https://qxhnjzyhtllmtdrcyygi.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aG5qenlodGxsbXRkcmN5eWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzczNjgsImV4cCI6MjA5NzgxMzM2OH0.DWf4I_x9F--H7ZZHUt_n4V3B__Nlsf1jNZdUV0vNBLU",
    timeoutMs: 12000
  },

  redirect: {
    path: "/redirect",   // com o vercel.json (cleanUrls) o endereço final fica /redirect
    delayMs: 3000
  },

  // Mensuração — deixar vazio até existirem IDs reais. Nada é carregado enquanto estiver vazio.
  // O evento Lead do Meta só é disparado depois que o lead é gravado no banco.
  tracking: {
    metaPixelId: "",
    googleTagId: "",
    googleAdsConversionLabel: ""
  },

  // URL de uma política de privacidade publicada. Vazio = o link não aparece.
  privacyPolicyUrl: ""
};
