import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { absoluteUrl, SITE } from "@/config/site";
import styles from "./privacy.module.css";

const PATH = "/politica-de-privacidade";
const UPDATED_AT = "22 de outubro de 2026";
const TITLE = "Política de Privacidade";
const DESCRIPTION =
  "Saiba como a ORBYTS Tecnologia coleta, utiliza e protege os dados informados em nossos formulários e coletados em nosso site.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Orbyts` },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl(PATH) },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${TITLE} | Orbyts`,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1714",
  colorScheme: "dark",
};

export default function PrivacyPolicyPage() {
  const email = SITE.contact.email;

  return (
    <div className={styles.page}>
      <main id="conteudo-principal" className={styles.content}>
        <Link href="/" className={styles.back}>
          ← Voltar ao site
        </Link>

        <h1 className={styles.title}>{TITLE}</h1>
        <p className={styles.updated}>Última atualização: {UPDATED_AT}</p>

        <p>
          Esta política explica como a {SITE.legalName} (&ldquo;Orbyts&rdquo;, &ldquo;nós&rdquo;) trata os dados
          pessoais de quem visita nosso site e preenche nossos formulários de contato e de solicitação de
          proposta, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
        </p>

        <h2>1. Quem é o controlador dos dados</h2>
        <p>
          O controlador é a {SITE.legalName}, com atuação em {SITE.location.city}/{SITE.location.region}. Para
          qualquer assunto sobre privacidade e dados pessoais, fale com a gente pelo e-mail{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>

        <h2>2. Quais dados coletamos</h2>
        <p>Dependendo de como você interage com o site, podemos tratar:</p>
        <ul>
          <li>
            <strong>Dados de contato:</strong> nome, telefone com DDD (preferencialmente WhatsApp) e, se você
            quiser informar, e-mail.
          </li>
          <li>
            <strong>Respostas do formulário:</strong> para quem será a solução (empresa em operação, negócio em
            criação ou projeto pessoal), o que você precisa que ela faça, quando precisa dela funcionando, se o
            investimento anunciado é compatível com o que você considera contratar e qual é a sua participação na
            decisão de contratação.
          </li>
          <li>
            <strong>Origem do acesso:</strong> parâmetros do link que trouxe você até o site (por exemplo,
            campanha, anúncio e identificadores de clique), usados para saber de qual divulgação veio a sua
            solicitação.
          </li>
          <li>
            <strong>Dados técnicos de navegação:</strong> endereço IP, tipo de dispositivo e navegador, páginas
            acessadas e cookies ou identificadores semelhantes, coletados automaticamente por ferramentas de
            mensuração (veja o item 4).
          </li>
          <li>
            <strong>Conversas:</strong> mensagens que você enviar por WhatsApp, telefone ou e-mail quando
            entrarmos em contato ou você falar conosco.
          </li>
        </ul>
        <p>
          Pedimos apenas o necessário para avaliar o seu projeto. Evite incluir nas respostas livres dados
          sensíveis ou de terceiros (por exemplo, documentos pessoais, dados de saúde ou senhas).
        </p>

        <h2>3. Para que usamos os dados e em que base legal</h2>
        <ul>
          <li>
            <strong>Avaliar a sua solicitação e entrar em contato</strong> sobre o projeto, por telefone,
            WhatsApp ou e-mail, incluindo agendar conversa e apresentar proposta. Base legal: procedimentos
            preliminares relacionados a um possível contrato, a pedido do titular (art. 7º, V, da LGPD).
          </li>
          <li>
            <strong>Medir e melhorar nossas campanhas e o site</strong>, entendendo, por exemplo, quais
            divulgações geram solicitações. Base legal: legítimo interesse (art. 7º, IX), respeitados seus
            direitos, e consentimento quando a lei o exigir.
          </li>
          <li>
            <strong>Segurança e prevenção a fraudes e spam</strong> nos formulários. Base legal: legítimo
            interesse (art. 7º, IX).
          </li>
          <li>
            <strong>Cumprir obrigações legais ou regulatórias</strong> e exercer direitos em processos, quando
            necessário (art. 7º, II e VI).
          </li>
        </ul>
        <p>Não vendemos seus dados pessoais e não os usamos para finalidades incompatíveis com as descritas aqui.</p>

        <h2>4. Cookies, pixels e ferramentas de mensuração</h2>
        <p>
          Nosso site utiliza o <strong>Meta Pixel</strong> (Meta Platforms) e uma <strong>tag do Google Ads</strong>.
          Essas ferramentas usam cookies e identificadores para registrar visitas e ações, como a conclusão de um
          formulário, e para medir o resultado de anúncios.
        </p>
        <p>
          Os eventos que enviamos a essas plataformas informam que uma ação ocorreu (por exemplo, que um
          formulário foi concluído e qual serviço ele se refere). Eles <strong>não incluem</strong> seu nome,
          telefone, e-mail nem o texto das suas respostas. As próprias plataformas podem coletar dados técnicos,
          como endereço IP e informações do navegador, conforme as respectivas políticas de privacidade.
        </p>
        <p>
          Você pode limitar essa coleta nas configurações do seu navegador (bloqueio ou exclusão de cookies), nas
          preferências de anúncios da sua conta Meta e nas configurações de anúncios da sua conta Google.
        </p>

        <h2>5. Com quem compartilhamos</h2>
        <ul>
          <li>
            <strong>Provedores de tecnologia</strong> que nos ajudam a operar o site, hospedar a aplicação e enviar
            as notificações por e-mail com as solicitações recebidas, que tratam os dados apenas para prestar
            esses serviços.
          </li>
          <li>
            <strong>Meta e Google</strong>, nos termos do item 4, para mensuração de anúncios.
          </li>
          <li>
            <strong>Autoridades públicas</strong>, quando houver obrigação legal ou ordem de autoridade
            competente.
          </li>
        </ul>

        <h2>6. Transferência internacional</h2>
        <p>
          Alguns provedores e plataformas que utilizamos podem tratar dados em servidores fora do Brasil. Nesses
          casos, buscamos garantir que a transferência ocorra com um dos mecanismos previstos na LGPD, como
          cláusulas contratuais adequadas ou país com grau de proteção compatível.
        </p>

        <h2>7. Por quanto tempo guardamos os dados</h2>
        <p>
          Mantemos os dados pelo tempo necessário para avaliar a sua solicitação, conduzir a conversa comercial e
          cumprir obrigações legais. Se não houver prosseguimento, eliminamos ou anonimizamos os dados quando
          deixarem de ser necessários, ou antes disso, se você pedir a exclusão e não houver motivo legal para
          mantê-los.
        </p>

        <h2>8. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados, como conexão criptografada
          (HTTPS), validação dos formulários e controle de acesso às informações recebidas. Nenhum sistema é
          totalmente imune a falhas, mas trabalhamos para reduzir os riscos e, se houver incidente relevante,
          agiremos conforme a lei.
        </p>

        <h2>9. Seus direitos</h2>
        <p>Nos termos do art. 18 da LGPD, você pode pedir:</p>
        <ul>
          <li>confirmação de que tratamos seus dados e acesso a eles;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
          <li>portabilidade, nos termos da regulamentação;</li>
          <li>informação sobre com quem compartilhamos seus dados;</li>
          <li>eliminação dos dados tratados com base em consentimento e revogação do consentimento;</li>
          <li>oposição a tratamento feito com base em legítimo interesse, quando houver descumprimento da lei.</li>
        </ul>
        <p>
          Para exercer esses direitos, escreva para <a href={`mailto:${email}`}>{email}</a>. Podemos pedir
          informações para confirmar a sua identidade antes de atender ao pedido. Você também pode apresentar
          reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
        </p>

        <h2>10. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta política para refletir mudanças no site, nas ferramentas que usamos ou na
          legislação. A data da última atualização aparece no topo desta página.
        </p>

        <h2>11. Contato</h2>
        <p>
          Dúvidas sobre esta política ou sobre o tratamento dos seus dados: <a href={`mailto:${email}`}>{email}</a>{" "}
          ou {SITE.contact.phoneDisplay}.
        </p>
      </main>
    </div>
  );
}
