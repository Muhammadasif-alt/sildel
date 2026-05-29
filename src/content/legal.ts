import type { Locale } from "@/lib/i18n/config";

/**
 * Legal & policy content. Terms and Privacy are reproduced from the live
 * sildel.pt pages (the company's own, legally-reviewed text). Shipping &
 * Returns combines the real returns / right-of-withdrawal policy with the
 * relaunch's free-worldwide-shipping promise. FAQ is written fresh.
 */
export type LegalSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
};

export type Faq = { q: string; a: string };

/* ───────────────────────── Terms ───────────────────────── */

const termsEn: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  updated: "Last updated May 2026",
  intro:
    "These general conditions of sale are agreed between SILDEL – Arte e Conceito no Mobiliário, Lda. (VAT no. 505184419), with registered office at Rua das Ruivas, 108, 3885-494 Esmoriz, Portugal (“Sildel”), and any person wishing to make purchases through www.sildel.pt (the “User”). Purchases made through www.sildel.pt are governed exclusively by this contract, excluding any conditions previously available on the website.",
  sections: [
    {
      heading: "Customer service",
      paragraphs: [
        "For additional information or to clarify any question, you can contact Sildel by email at sildel@sildel.pt.",
      ],
    },
    {
      heading: "Article 1 — Object",
      paragraphs: [
        "The purpose of these general conditions of sale is to provide and define all the information the User needs regarding the ordering, sale, payment and delivery of purchases made on www.sildel.pt.",
        "These conditions regulate every step necessary to place an order and to ensure its follow-up between the contracting parties.",
      ],
    },
    {
      heading: "Article 2 — Order",
      paragraphs: [
        "The User completes an order through the purchase process presented on www.sildel.pt, adding the product(s) or service(s) to the shopping cart. To send an order, the User must:",
      ],
      list: [
        "Register on www.sildel.pt, providing the information requested.",
        "Log in (with the email and password chosen at registration).",
        "Complete the information and choose the available options throughout the order (delivery and billing address, shipping method, payment method, as well as the tax number and name to appear on the invoice).",
      ],
    },
    {
      paragraphs: [
        "Final confirmation of the order by the User constitutes full and complete acceptance of the prices and product descriptions, as well as of these General Conditions of Sale, which are the only ones applicable to the contract thus concluded.",
        "Sildel honours online orders only up to the limit of available stock. Where a product is unavailable, Sildel undertakes to inform the User as soon as possible.",
        "The data on the invoice are the sole responsibility of the User. Once issued, an invoice cannot be reissued with changes.",
        "Order requests are valid for 4 (four) days, unless registered under a promotional campaign that defines a different period; prices, discounts, promotions and offers cannot be guaranteed beyond this period. If payment is not received within that period, the order cannot be validated, and any amount received afterwards will be returned or applied to a new order.",
      ],
    },
    {
      heading: "Article 3 — Payment",
      paragraphs: ["Sildel proposes the following payment methods to the User:"],
      list: ["Multibanco (ATM)", "MB WAY", "Cash on delivery (+€3.69)"],
    },
    {
      heading: "Article 4 — Delivery",
      paragraphs: [
        "Mainland Portugal: if payment is made by 2 p.m. (mainland Portugal time) on a business day, the order is processed immediately and dispatched the next business day by courier or carrier, and delivered within 1 to 3 business days after processing.",
        "Madeira and Azores: if payment is made by 2 p.m. on a business day, the order is processed immediately and shipped the same day, arriving 4 to 10 business days later. Payments received after 2 p.m. ship the next business day. Delivery is carried out by CTT or a contracted carrier.",
        "Shipping costs are added to the order where applicable.",
      ],
    },
    {
      heading: "Article 5 — Prices",
      paragraphs: [
        "Prices are in Euros, with fees and taxes included, taking into account the VAT in force on the date of payment.",
        "If the price of any product increases, the User will be informed immediately and may choose to receive the order (paying the difference) or to cancel it.",
      ],
    },
    {
      heading: "Article 6 — Cancellation & return",
      paragraphs: [
        "Cancellations and returns are handled case by case by Sildel. The request must be sent in writing to sildel@sildel.pt up to 15 days after the order; cancellation or return instructions are answered and defined by Sildel through the same channel.",
        "Whenever possible, a refund is made through the same payment method. Where this is not possible, the User must provide proof of payment and of account or card ownership so the refund can be made by bank transfer.",
        "Sildel undertakes to reimburse the User within a maximum of 60 days.",
        "Returned products must be in sale condition — the same state in which they reached the User, without any anomaly, damage or signs of use.",
        "If the value of an exchange is lower or higher than the original, Sildel will indicate the adjustment conditions.",
      ],
    },
    {
      heading:
        "Article 7 — Product availability and order confirmation / cancellation",
      paragraphs: [
        "Sildel processes an order only after confirmation of payment, and so may not guarantee item availability until processing begins.",
        "Sildel strives to keep all items in stock, but items are subject to stock limits. Sildel reserves the right not to accept, or to cancel, confirmed orders for products no longer in stock. In case of unavailability, Sildel will immediately inform the consumer of the partial or total cancellation, and the buyer is entitled to a refund of the amount paid.",
      ],
    },
    {
      heading: "Article 8 — Privacy policy",
      paragraphs: [
        "Your data is processed in compliance with personal-data protection legislation. Subject to computer processing, it is held in Sildel's database(s) for the registration and presentation of products, services and institutional information. Its provision is optional, and you are guaranteed the right to access, rectify and cancel any data concerning you, under the terms of the law. See our full Privacy Policy for details.",
      ],
    },
    {
      heading: "Disclaimer",
      paragraphs: [
        "Following a policy of continuous product improvement, Sildel reserves the right to make changes while retaining a product's essential distinguishing characteristics. Consequently, photographic representations and technical characteristics are merely indicative; Sildel is bound by the agreement between both parties to the purchase order.",
      ],
    },
  ],
};

const termsPt: LegalDoc = {
  eyebrow: "Legal",
  title: "Termos e Condições",
  updated: "Última atualização em maio de 2026",
  intro:
    "Estas condições gerais de venda são acordadas entre a SILDEL – Arte e Conceito no Mobiliário, Lda. (NIF 505184419), com sede na Rua das Ruivas, 108, 3885-494 Esmoriz (“Sildel”), e as pessoas que desejem efetuar compras através do website www.sildel.pt (o “Utilizador”). As compras efetuadas através do www.sildel.pt são reguladas exclusivamente pelo presente contrato, com exclusão de quaisquer condições previamente disponíveis no website.",
  sections: [
    {
      heading: "Serviço de apoio ao cliente",
      paragraphs: [
        "Para informações adicionais ou esclarecimento de qualquer dúvida, pode contactar a Sildel através do e-mail sildel@sildel.pt.",
      ],
    },
    {
      heading: "Artigo 1 — Objeto",
      paragraphs: [
        "As presentes condições gerais de venda têm por objeto disponibilizar e definir todas as informações necessárias ao Utilizador sobre as modalidades de encomenda, venda, pagamento e entrega das compras efetuadas no website www.sildel.pt.",
        "Estas condições regulam todas as etapas necessárias para realizar a encomenda e garantem o seu seguimento entre as Partes Contratantes.",
      ],
    },
    {
      heading: "Artigo 2 — Encomenda",
      paragraphs: [
        "O Utilizador concretiza a sua encomenda através do processo de compra apresentado no website www.sildel.pt, adicionando o(s) produto(s) ou serviço(s) ao cesto de compras. Para enviar a sua encomenda, o Utilizador deverá:",
      ],
      list: [
        "Registar-se no website www.sildel.pt, fornecendo as informações aí solicitadas.",
        "Efetuar o login (com a combinação de e-mail e palavra-passe escolhidas no ato de registo).",
        "Completar a informação e escolher as opções disponibilizadas ao longo da encomenda (morada de entrega e faturação, forma de envio, forma de pagamento, bem como o NIF e o nome a constar na fatura).",
      ],
    },
    {
      paragraphs: [
        "A confirmação final da encomenda pelo Utilizador equivale à aceitação plena e completa dos preços e da descrição dos produtos, assim como destas Condições Gerais de Venda, que serão as únicas aplicáveis ao contrato concluído.",
        "A Sildel honrará as encomendas recebidas online unicamente até ao limite dos stocks disponíveis. Na falta de disponibilidade, a Sildel compromete-se a informar o Utilizador logo que possível.",
        "Os dados constantes na fatura são da inteira responsabilidade do Utilizador. A fatura, depois de emitida, não poderá ser reemitida com alterações.",
        "Os pedidos de encomenda têm uma validade de 4 (quatro) dias, exceto se registados ao abrigo de uma campanha promocional com prazo diferente; não é possível garantir preços, descontos, promoções e ofertas para além deste prazo. Se o pagamento não for rececionado dentro do prazo, a encomenda não poderá ser validada, e qualquer valor recebido após essa data será devolvido ou usado numa nova encomenda.",
      ],
    },
    {
      heading: "Artigo 3 — Pagamento",
      paragraphs: ["A Sildel propõe ao Utilizador as seguintes modalidades de pagamento:"],
      list: ["Multibanco", "MB WAY", "Envio à cobrança (+3,69€)"],
    },
    {
      heading: "Artigo 4 — Entrega",
      paragraphs: [
        "Portugal Continental: se o pagamento for feito até às 14 horas (hora de Portugal Continental) de um dia útil, a encomenda é processada de imediato e enviada no dia útil seguinte por correio ou transportadora, sendo entregue no espaço de 1 a 3 dias úteis após processada.",
        "Madeira e Açores: se o pagamento for feito até às 14 horas de um dia útil, a encomenda é processada de imediato e enviada no próprio dia, sendo recebida 4 a 10 dias úteis depois. Pagamentos rececionados após as 14 horas são enviados no dia útil seguinte. A entrega é realizada pelos CTT ou transportadora contratada.",
        "À encomenda são acrescidos os custos de portes de envio, se aplicável.",
      ],
    },
    {
      heading: "Artigo 5 — Preços",
      paragraphs: [
        "Os preços entendem-se em Euros, com taxas e impostos incluídos, tendo em conta o IVA em vigor à data do pagamento.",
        "Caso se verifique um aumento do preço de algum produto, o Utilizador será informado de imediato, podendo optar por receber a encomenda (pagando a diferença) ou por cancelá-la.",
      ],
    },
    {
      heading: "Artigo 6 — Cancelamento e devolução",
      paragraphs: [
        "O processo de cancelamento ou devolução é tratado caso a caso pela Sildel. O pedido deve chegar por escrito para sildel@sildel.pt até 15 dias após a encomenda; as instruções são respondidas e definidas pela Sildel pelo mesmo meio.",
        "Sempre que possível, a devolução é feita pela mesma via de pagamento; caso não seja possível, o Utilizador deverá apresentar comprovativos de pagamento e de titularidade de conta ou cartão, para que a devolução seja feita por transferência bancária.",
        "A Sildel compromete-se a reembolsar o Utilizador no prazo máximo de 60 dias.",
        "Os produtos devolvidos têm obrigatoriamente de se encontrar em condições de venda — no mesmo estado em que chegaram ao Utilizador, sem qualquer anomalia, dano ou sinais de uso.",
        "Se o valor da troca for inferior ou superior ao valor inicial, as condições de acerto serão indicadas pela Sildel.",
      ],
    },
    {
      heading:
        "Artigo 7 — Disponibilidade dos produtos e confirmação / cancelamento da encomenda",
      paragraphs: [
        "A Sildel só processa a encomenda após confirmação do respetivo pagamento, podendo por esse motivo não garantir a disponibilidade dos artigos até ao início do processamento.",
        "A Sildel procura assegurar que todos os artigos à venda estão em stock, mas os artigos estão sujeitos a limitação de stock. A Sildel reserva-se o direito de não aceitar ou de cancelar encomendas já confirmadas de produtos sem stock. Em caso de indisponibilidade, a Sildel informará de imediato o(a) Consumidor(a) do cancelamento parcial ou total, tendo o(a) comprador(a) direito ao reembolso do valor pago.",
      ],
    },
    {
      heading: "Artigo 8 — Política de privacidade",
      paragraphs: [
        "O tratamento dos seus dados é feito no cumprimento da legislação sobre proteção de dados pessoais. Sujeitos a tratamento informático, os dados constam na(s) base(s) de dados da Sildel e destinam-se ao registo e apresentação de produtos, serviços e informação institucional. O seu fornecimento é facultativo, sendo garantido o direito de acesso, retificação e anulação de qualquer dado que lhe diga respeito, nos termos da lei. Consulte a nossa Política de Privacidade para mais detalhes.",
      ],
    },
    {
      heading: "Nota",
      paragraphs: [
        "Seguindo uma política de melhoria contínua, a Sildel reserva-se o direito de introduzir alterações mantendo as características essenciais e distintivas dos produtos. Em consequência, as representações fotográficas e as características técnicas são meramente indicativas; a Sildel fica vinculada ao acordo entre ambas as partes da nota de encomenda.",
      ],
    },
  ],
};

/* ───────────────────────── Privacy ───────────────────────── */

const privacyEn: LegalDoc = {
  eyebrow: "Privacy",
  title: "Privacy Policy",
  updated: "Last updated May 2026",
  intro:
    "Your privacy is important to us. It is the policy of SILDEL – Arte e Conceito no Mobiliário, Lda. (VAT no. 505184419, Rua das Ruivas, 108, 3885-494 Esmoriz) to respect your privacy regarding any information we may collect on the Sildel website and other sites we own and operate.",
  sections: [
    {
      paragraphs: [
        "We only ask for personal information when we truly need it to provide you with a service. We do this by fair and lawful means, with your knowledge and consent. We also let you know why we are collecting it and how it will be used.",
        "We retain the information collected only for as long as necessary to provide the requested service. When we store data, we protect it within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.",
        "We do not share personally identifiable information publicly or with third parties, except where required by law.",
        "Our website may contain links to external sites that we do not operate. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies.",
        "You are free to decline our request for personal information, understanding that we may not be able to provide some of the services you desire.",
        "Continued use of our website is regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data, please contact us.",
      ],
    },
    {
      heading: "Cookies — what are they?",
      paragraphs: [
        "As is common practice on almost all professional websites, this site uses cookies — small files downloaded to your device — to improve your experience. This section describes what information they collect, how we use it, and why we sometimes need to store them. You can prevent cookies from being stored by adjusting your browser settings, though this may downgrade or break certain elements of the site's functionality.",
      ],
    },
    {
      heading: "Cookies we use",
      list: [
        "Account-related cookies — to manage the registration process and general administration.",
        "Login-related cookies — to remember that you are logged in as you move between pages.",
        "Newsletter cookies — to remember whether you are already subscribed.",
        "Order-processing cookies — essential to remember your order between pages.",
        "Survey cookies — to remember who has already taken part in a survey.",
        "Form cookies — to remember details you submit through contact or feedback forms.",
        "Preference cookies — to remember the preferences you set for how the site runs.",
      ],
    },
    {
      heading: "Third-party cookies",
      paragraphs: [
        "In some cases we use cookies from trusted third parties. This website uses Google Analytics — one of the most widespread and trusted analytics solutions on the web — to help us understand how you use the site and how we can improve it. These cookies may track items such as how long you spend on the site and which pages you visit. For more information, see the official Google Analytics page.",
        "If you are unsure whether you need cookies, it is usually safer to leave them enabled in case they are used to provide a service you rely on.",
      ],
    },
  ],
};

const privacyPt: LegalDoc = {
  eyebrow: "Privacidade",
  title: "Política de Privacidade",
  updated: "Última atualização em maio de 2026",
  intro:
    "A sua privacidade é importante para nós. É política da SILDEL – Arte e Conceito no Mobiliário, Lda. (NIF 505184419, Rua das Ruivas, 108, 3885-494 Esmoriz) respeitar a sua privacidade relativamente a qualquer informação que possamos recolher no website da Sildel e noutros sites que detenhamos e operemos.",
  sections: [
    {
      paragraphs: [
        "Só solicitamos informações pessoais quando realmente são necessárias para lhe prestar um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Informamos também por que motivo as recolhemos e como serão utilizadas.",
        "Retemos a informação recolhida apenas pelo tempo necessário para prestar o serviço solicitado. Quando guardamos dados, protegemo-los por meios comercialmente aceitáveis, de modo a evitar perdas e roubos, bem como acessos, divulgação, cópia, utilização ou modificação não autorizados.",
        "Não partilhamos informações de identificação pessoal publicamente nem com terceiros, exceto quando exigido por lei.",
        "O nosso website pode conter ligações para sites externos que não são operados por nós. Não temos controlo sobre o conteúdo e as práticas desses sites e não podemos assumir responsabilidade pelas respetivas políticas de privacidade.",
        "É livre de recusar o nosso pedido de informações pessoais, entendendo que poderemos não conseguir prestar alguns dos serviços pretendidos.",
        "A utilização contínua do nosso website é considerada como aceitação das nossas práticas de privacidade e de dados pessoais. Se tiver questões sobre como tratamos os dados dos utilizadores, contacte-nos.",
      ],
    },
    {
      heading: "Cookies — o que são?",
      paragraphs: [
        "Como é prática comum em quase todos os websites profissionais, este site utiliza cookies — pequenos ficheiros descarregados no seu dispositivo — para melhorar a sua experiência. Esta secção descreve que informação recolhem, como a usamos e por que motivo, por vezes, precisamos de os guardar. Pode impedir o armazenamento de cookies ajustando as definições do seu navegador, embora isso possa degradar ou comprometer certas funcionalidades do site.",
      ],
    },
    {
      heading: "Cookies que utilizamos",
      list: [
        "Cookies de conta — para gerir o registo e a administração geral.",
        "Cookies de início de sessão — para recordar que tem sessão iniciada ao navegar entre páginas.",
        "Cookies de newsletter — para recordar se já está subscrito.",
        "Cookies de processamento de encomendas — essenciais para recordar a sua encomenda entre páginas.",
        "Cookies de inquéritos — para recordar quem já participou num inquérito.",
        "Cookies de formulários — para recordar dados submetidos em formulários de contacto ou feedback.",
        "Cookies de preferências — para recordar as preferências que define para o funcionamento do site.",
      ],
    },
    {
      heading: "Cookies de terceiros",
      paragraphs: [
        "Em alguns casos utilizamos cookies de terceiros de confiança. Este website usa o Google Analytics — uma das soluções de análise mais difundidas e fiáveis da web — para nos ajudar a compreender como utiliza o site e como o podemos melhorar. Estes cookies podem registar dados como o tempo que passa no site e as páginas que visita. Para mais informação, consulte a página oficial do Google Analytics.",
        "Se não tiver a certeza de que precisa dos cookies, é normalmente mais seguro mantê-los ativos, caso sejam usados para prestar um serviço de que depende.",
      ],
    },
  ],
};

/* ───────────────────────── Shipping & Returns ───────────────────────── */

const shippingEn: LegalDoc = {
  eyebrow: "Shipping & Returns",
  title: "Shipping & Returns",
  updated: "Last updated May 2026",
  intro:
    "Every Sildel treasure is hand-packed in our Portuguese atelier and shipped worldwide with DHL, with full tracking. Below is everything about delivery, exchanges, returns and your right of withdrawal.",
  sections: [
    {
      heading: "Shipping",
      paragraphs: [
        "Shipments are made worldwide with DHL. After payment is confirmed, your piece is carefully packed and dispatched within 4 working days. Delivery time depends on the destination country and is shown to you when shipping is calculated at checkout.",
      ],
    },
    {
      heading: "Exchange for other items",
      paragraphs: [
        "An exchange may be made within 14 consecutive days of receiving the item, provided the identification tag is intact and the whole exchange is completed within those 14 days. The exchange is handled by Sildel's carrier, which delivers the new item and collects the previous one; the customer bears the costs of the return and the new shipment.",
      ],
    },
    {
      heading: "Exchange & returns of defective products",
      paragraphs: [
        "You are entitled to an exchange or refund if the products are found to be defective, are not the item chosen, or do not conform to what was ordered. The request must be made within 14 consecutive days of receipt, with the identification tag intact. If the non-conformity is confirmed, the exchange is made at no cost to you. You may instead choose a refund of the full amount (item + shipping), provided you email the invoice/receipt with the associated costs.",
      ],
    },
    {
      heading: "Refund",
      paragraphs: [
        "A return may be made within 14 days of receiving the item, with the identification tag intact and no signs of use. You may choose a refund of the item's value; return shipping costs are the customer's responsibility. The amount for the item is always paid by bank transfer after we receive and inspect the product.",
      ],
    },
    {
      heading: "How to return — step by step",
      list: [
        "Step 1 — Email sildel@sildel.pt with a photo of the item(s) you received.",
        "Step 2 — Pack the item in its original packaging (or any undamaged box). Remove any labels from previous shipments and apply the details we send you.",
        "Step 3 — DHL, contracted by Sildel, collects from your address and delivers the replacement, as agreed by email.",
        "Step 4 — After we receive and inspect the product, we inform you of any refund due, paid by bank transfer.",
      ],
    },
    {
      heading: "Right of withdrawal",
      paragraphs: [
        "Valid within the EU for consumers. You have 14 consecutive days after receiving your order at the chosen address to contact us and express your wish to withdraw from the purchase, for any reason. Sildel will refund the corresponding amount (excluding the initial shipping costs) through the same payment method used. We may withhold the refund until we have received the product and confirmed it is in good condition.",
      ],
    },
  ],
};

const shippingPt: LegalDoc = {
  eyebrow: "Envios e Devoluções",
  title: "Envios e Devoluções",
  updated: "Última atualização em maio de 2026",
  intro:
    "Cada tesouro Sildel é embalado à mão no nosso atelier em Portugal e enviado para todo o mundo pela DHL, com rastreio. Em baixo encontra tudo sobre entrega, trocas, devoluções e o direito a arrependimento.",
  sections: [
    {
      heading: "Envios",
      paragraphs: [
        "Os envios são feitos para todo o mundo pela DHL. Após a confirmação do pagamento, a peça é cuidadosamente embalada e expedida no prazo de 4 dias úteis. O tempo de entrega depende do país de destino e é-lhe indicado no momento do cálculo dos portes.",
      ],
    },
    {
      heading: "Troca por outros artigos",
      paragraphs: [
        "A troca pode ser feita no período de 14 dias seguidos após a receção do artigo, desde que mantenha a etiqueta de identificação e todo o processo seja concluído dentro desses 14 dias. A troca é feita pela transportadora subcontratada pela Sildel, que entrega o artigo novo e recolhe o anterior; o cliente suporta os custos da retoma e da nova expedição.",
      ],
    },
    {
      heading: "Troca e devolução de produtos defeituosos",
      paragraphs: [
        "Tem direito a troca ou reembolso se verificar que os produtos apresentam defeitos, não correspondem ao artigo escolhido ou não estão conformes com o que encomendou. O pedido deve ser feito no prazo de 14 dias seguidos após a receção, com a etiqueta de identificação intacta. Confirmada a não conformidade, a troca é feita sem qualquer custo para si. Em alternativa, pode optar pelo reembolso do valor total (artigo + portes), desde que envie por e-mail a fatura/talão com os custos associados.",
      ],
    },
    {
      heading: "Reembolso",
      paragraphs: [
        "A devolução pode ser feita no período de 14 dias após a receção do artigo, com a etiqueta de identificação intacta e sem sinais de uso. Pode optar pelo reembolso do valor do artigo; os custos de envio da devolução são da responsabilidade do cliente. O valor do artigo é sempre pago por transferência bancária, depois de recebermos e analisarmos o produto.",
      ],
    },
    {
      heading: "Como devolver — passo a passo",
      list: [
        "1.º passo — Envie e-mail para sildel@sildel.pt com uma foto do(s) artigo(s) que recebeu.",
        "2.º passo — Embale o artigo na embalagem original (ou noutra caixa não danificada). Remova etiquetas de expedições anteriores e cole os dados que lhe enviarmos.",
        "3.º passo — A DHL, contratada pela Sildel, faz a recolha na morada indicada e entrega o novo artigo, conforme combinado por e-mail.",
        "4.º passo — Depois de recebermos e analisarmos o produto, informamos do reembolso a que tiver direito, pago por transferência bancária.",
      ],
    },
    {
      heading: "Direito a arrependimento",
      paragraphs: [
        "Válido no espaço da UE, para o consumidor. Tem até 14 dias seguidos, após a receção do produto na morada escolhida, para nos contactar e expressar a vontade de desistir da compra, por qualquer motivo. A Sildel reembolsará o montante correspondente (excluindo os gastos de envio inicial), através do mesmo meio de pagamento utilizado. Poderemos reter o reembolso até recebermos o produto e comprovarmos o seu bom estado.",
      ],
    },
  ],
};

/* ───────────────────────── FAQ (written) ───────────────────────── */

const faqEn: Faq[] = [
  {
    q: "What is Sildel?",
    a: "Sildel is a Portuguese atelier creating fine-art and luxury home pieces from genuine, sustainably harvested cork. Every treasure is designed and finished by hand in Portugal.",
  },
  {
    q: "Is each piece unique?",
    a: "Yes. Cork is a living material, so the grain you see is the only grain you will ever see. Each treasure is one of a kind, signed and numbered within its edition.",
  },
  {
    q: "How do I buy a piece — I don't see prices?",
    a: "Our treasures are offered on an enquiry basis. Use the “Enquire about this piece” button on any product, or the WhatsApp button, and we'll reply with availability and price. Each piece is unique, so we prefer a personal conversation.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. Every piece is hand-packed in our atelier and shipped worldwide with DHL, with full tracking. Delivery time depends on the destination and is confirmed when we arrange your order.",
  },
  {
    q: "Can I return or exchange a piece?",
    a: "Yes — you have 14 days from receipt to request an exchange or return, provided the piece is unused and the identification tag is intact. EU consumers also have a 14-day right of withdrawal. See our Shipping & Returns page for the full process.",
  },
  {
    q: "How do I care for a cork piece?",
    a: "Cork is naturally durable and water-resistant. Simply dust it; for marble or glass elements, clean with a soft microfibre cloth and avoid abrasives or harsh chemicals.",
  },
  {
    q: "Is the cork really sustainable?",
    a: "Yes. Cork is harvested by hand from the bark of the cork oak without harming the tree, which regenerates and is harvested again every nine years — one of the world's most sustainable natural materials.",
  },
  {
    q: "Can we develop a custom or commercial project together?",
    a: "Absolutely. Through our “You Think Cork” programme we collaborate with brands, studios and makers — as we do with Porcel, Lightenjin and Festival Mental. Tell us your idea via the contact page.",
  },
];

const faqPt: Faq[] = [
  {
    q: "O que é a Sildel?",
    a: "A Sildel é um atelier português que cria peças de arte e decoração de luxo a partir de cortiça genuína, colhida de forma sustentável. Cada tesouro é desenhado e acabado à mão em Portugal.",
  },
  {
    q: "Cada peça é única?",
    a: "Sim. A cortiça é um material vivo, por isso o grão que vê é o único que existirá. Cada tesouro é único, assinado e numerado dentro da sua edição.",
  },
  {
    q: "Como compro uma peça — não vejo preços?",
    a: "Os nossos tesouros são apresentados por consulta. Use o botão “Falar sobre esta peça” em qualquer produto, ou o botão de WhatsApp, e responderemos com disponibilidade e valor. Como cada peça é única, preferimos uma conversa pessoal.",
  },
  {
    q: "Enviam para todo o mundo?",
    a: "Sim. Cada peça é embalada à mão no nosso atelier e enviada para todo o mundo pela DHL, com rastreio. O tempo de entrega depende do destino e é confirmado quando organizamos a sua encomenda.",
  },
  {
    q: "Posso trocar ou devolver uma peça?",
    a: "Sim — tem 14 dias após a receção para pedir uma troca ou devolução, desde que a peça esteja sem uso e a etiqueta de identificação intacta. Os consumidores na UE têm ainda 14 dias de direito a arrependimento. Consulte a página de Envios e Devoluções para o processo completo.",
  },
  {
    q: "Como cuido de uma peça em cortiça?",
    a: "A cortiça é naturalmente resistente e impermeável. Basta limpar o pó; nos elementos em mármore ou vidro, use um pano de microfibra macio e evite abrasivos ou produtos agressivos.",
  },
  {
    q: "A cortiça é mesmo sustentável?",
    a: "Sim. A cortiça é extraída à mão da casca do sobreiro sem ferir a árvore, que se regenera e volta a ser colhida a cada nove anos — um dos materiais naturais mais sustentáveis do mundo.",
  },
  {
    q: "Podemos desenvolver um projeto personalizado ou comercial em conjunto?",
    a: "Com certeza. Através do programa “Pensa em Cortiça” colaboramos com marcas, estúdios e criadores — como fazemos com a Porcel, a Lightenjin e o Festival Mental. Conte-nos a sua ideia através da página de contacto.",
  },
];

/* ───────────────────────── Getters ───────────────────────── */

export const getTerms = (locale: Locale): LegalDoc => (locale === "pt" ? termsPt : termsEn);
export const getPrivacy = (locale: Locale): LegalDoc => (locale === "pt" ? privacyPt : privacyEn);
export const getShipping = (locale: Locale): LegalDoc => (locale === "pt" ? shippingPt : shippingEn);
export const getFaqs = (locale: Locale): Faq[] => (locale === "pt" ? faqPt : faqEn);