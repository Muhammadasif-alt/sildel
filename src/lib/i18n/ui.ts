/**
 * UI dictionary — short, reusable strings used across the site
 * (nav, header, footer, buttons, cart, checkout, common CTAs).
 *
 * Long-form content (page sections, marketing copy) lives in `src/content/`
 * with per-locale files — not here.
 */
import type { Locale } from "./config";

export type UiDict = {
  nav: {
    home: string;
    ourStory: string;
    authenticCork: string;
    youThinkCork: string;
    treasures: string;
    blog: string;
    press: string;
    contact: string;
  };
  header: {
    account: string;
    cart: string;
    cartCount: (n: number) => string;
  };
  footer: {
    rights: string;
    tagline: string;
    sections: { explore: string; help: string; legal: string };
    legalLinks: { privacy: string; terms: string; shipping: string };
    helpLinks: { contact: string; faq: string; shipping: string; returns: string };
    newsletter: {
      title: string;
      body: string;
      placeholder: string;
      cta: string;
      thanks: string;
    };
  };
  common: {
    shopTreasures: string;
    watchOurFilm: string;
    learnMore: string;
    addToCart: string;
    added: string;
    viewAll: string;
    viewTreasure: string;
    explore: string;
    readStory: string;
    discover: string;
    inStock: string;
    soldOut: string;
    loading: string;
    error: string;
    backTo: string;
  };
  cart: {
    title: string;
    eyebrow: string;
    emptyHeadline1: string;
    emptyHeadline2: string;
    emptyBody: string;
    emptyCta: string;
    treasure: (n: number) => string;
    pieces: (n: number) => string;
    signedNumbered: string;
    each: string;
    couponNotRecognized: (code: string) => string;
    shippingNote: string;
    secureCheckoutNote: string;
    empty: { title: string; body: string; cta: string };
    item: { remove: string; quantity: string };
    summary: {
      title: string;
      subtotal: string;
      shipping: string;
      shippingFree: string;
      total: string;
      proceedToCheckout: string;
      continueShopping: string;
      couponPlaceholder: string;
      couponApply: string;
    };
  };
  checkout: {
    title: string;
    backToCart: string;
    emptyCart: { title: string; body: string };
    couponHint: string;
    billingDetails: string;
    yourOrder: string;
    sections: {
      contact: string;
      shipping: string;
      payment: string;
      review: string;
    };
    fields: {
      firstName: string;
      lastName: string;
      company: string;
      country: string;
      street: string;
      apt: string;
      city: string;
      postcode: string;
      phone: string;
      email: string;
      orderNotes: string;
      orderNotesPlaceholder: string;
    };
    validation: {
      required: (label: string) => string;
      invalidEmail: string;
      mustAgreeTerms: string;
    };
    summary: {
      subtotal: string;
      shipment: string;
      freeShipping: string;
      shippingNote: string;
      total: string;
    };
    paymentSectionTitle: string;
    payment: {
      paypal: { label: string; description: string };
      multibanco: { label: string; description: string };
      cod: { label: string; description: string };
    };
    privacyNotice: { before: string; link: string; after: string };
    termsLabel: { before: string; link: string };
    placeOrderLabel: (price: string) => string;
    placingOrder: string;
    demoNote: string;
    terms: string;
    placeOrder: string;
    processing: string;
    success: {
      eyebrow: string;
      title: string;
      titleAccent: string;
      body: string;
      orderNumber: string;
      email: string;
      payment: string;
      total: string;
      browseMore: string;
      backHome: string;
    };
  };
};

const en: UiDict = {
  nav: {
    home: "Home",
    ourStory: "Our Story",
    authenticCork: "Authentic Cork",
    youThinkCork: "You Think Cork",
    treasures: "Treasures",
    blog: "Journal",
    press: "Press",
    contact: "Contact",
  },
  header: {
    account: "Account",
    cart: "Cart",
    cartCount: (n) => (n === 1 ? "1 item" : `${n} items`),
  },
  footer: {
    rights: "All rights reserved.",
    tagline: "Sculptural pieces from authentic Portuguese cork.",
    sections: { explore: "Explore", help: "Help", legal: "Legal" },
    legalLinks: { privacy: "Privacy", terms: "Terms", shipping: "Shipping" },
    helpLinks: {
      contact: "Contact",
      faq: "FAQ",
      shipping: "Shipping",
      returns: "Returns",
    },
    newsletter: {
      title: "Join the Atelier",
      body: "First looks at new treasures and stories from the studio. No noise.",
      placeholder: "Your email",
      cta: "Subscribe",
      thanks: "Welcome to the atelier.",
    },
  },
  common: {
    shopTreasures: "Shop Treasures",
    watchOurFilm: "Watch our film",
    learnMore: "Learn more",
    addToCart: "Add to cart",
    added: "Added ✓",
    viewAll: "View all",
    viewTreasure: "View treasure",
    explore: "Explore",
    readStory: "Read the story",
    discover: "Discover",
    inStock: "In stock",
    soldOut: "Sold out",
    loading: "Loading…",
    error: "Something went wrong.",
    backTo: "Back to",
  },
  cart: {
    title: "Your cart",
    eyebrow: "Your Cart",
    emptyHeadline1: "Empty",
    emptyHeadline2: "for now.",
    emptyBody:
      "You haven't added a treasure yet. Take a wander through the collection — each piece is hand-finished, signed, and numbered.",
    emptyCta: "Explore Treasures",
    treasure: (n) => (n === 1 ? "1 treasure" : `${n} treasures`),
    pieces: (n) => (n === 1 ? "1 total piece" : `${n} total pieces`),
    signedNumbered: "Signed & numbered",
    each: "each",
    couponNotRecognized: (code) =>
      `We don't recognize "${code}". Try at checkout.`,
    shippingNote: "Europe 4–7 days · Other 7–12 days",
    secureCheckoutNote: "Secure checkout · PayPal · Multibanco",
    empty: {
      title: "Your cart is empty.",
      body: "Begin with a single piece. The atelier is open.",
      cta: "Browse treasures",
    },
    item: { remove: "Remove", quantity: "Quantity" },
    summary: {
      title: "Order summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      shippingFree: "Free",
      total: "Total",
      proceedToCheckout: "Proceed to Checkout",
      continueShopping: "Continue shopping",
      couponPlaceholder: "Coupon code",
      couponApply: "Apply",
    },
  },
  checkout: {
    title: "Checkout",
    backToCart: "Back to cart",
    emptyCart: {
      title: "Your cart is empty.",
      body: "Add a treasure to your cart, then come back here to complete your order.",
    },
    couponHint: "Have a coupon? Add it on the previous step.",
    billingDetails: "Billing details",
    yourOrder: "Your order",
    sections: {
      contact: "Contact",
      shipping: "Shipping",
      payment: "Payment",
      review: "Review",
    },
    fields: {
      firstName: "First name",
      lastName: "Last name",
      company: "Company (optional)",
      country: "Country / Region",
      street: "Street address",
      apt: "Apartment, suite, etc. (optional)",
      city: "Town / City",
      postcode: "Postcode / ZIP",
      phone: "Phone",
      email: "Email address",
      orderNotes: "Order notes (optional)",
      orderNotesPlaceholder:
        "Notes about your order, e.g. special notes for delivery.",
    },
    validation: {
      required: (label) => `${label} is required`,
      invalidEmail: "Please enter a valid email address",
      mustAgreeTerms: "You must agree to the terms before placing your order",
    },
    summary: {
      subtotal: "Subtotal",
      shipment: "Shipment",
      freeShipping: "Free shipping",
      shippingNote: "Europe 4–7 days · Other 7–12 days",
      total: "Total",
    },
    paymentSectionTitle: "Payment method",
    payment: {
      paypal: { label: "PayPal", description: "Pay via PayPal." },
      multibanco: {
        label: "Multibanco",
        description: "Pay via Multibanco reference (Portugal).",
      },
      cod: {
        label: "Cash on Delivery",
        description: "Pay in cash when your treasure is delivered.",
      },
    },
    privacyNotice: {
      before:
        "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our ",
      link: "privacy policy",
      after: ".",
    },
    termsLabel: {
      before: "I have read and agree to the website ",
      link: "terms and conditions",
    },
    placeOrderLabel: (price) => `Place order — ${price}`,
    placingOrder: "Placing order…",
    demoNote: "Demo checkout · no charge will be made",
    terms: "I agree to the terms and the privacy policy.",
    placeOrder: "Place order",
    processing: "Processing…",
    success: {
      eyebrow: "Order placed",
      title: "Thank you,",
      titleAccent: "your treasure is on its way.",
      body: "We've received your order. A confirmation email will arrive shortly with tracking details. Each Sildel treasure is hand-packed in our Portuguese atelier before it ships.",
      orderNumber: "Order number",
      email: "Email",
      payment: "Payment",
      total: "Total",
      browseMore: "Browse more treasures",
      backHome: "Back to home",
    },
  },
};

const pt: UiDict = {
  nav: {
    home: "Início",
    ourStory: "A Nossa História",
    authenticCork: "Cortiça Autêntica",
    youThinkCork: "Pensa em Cortiça",
    treasures: "Tesouros",
    blog: "Jornal",
    press: "Imprensa",
    contact: "Contacto",
  },
  header: {
    account: "Conta",
    cart: "Carrinho",
    cartCount: (n) => (n === 1 ? "1 artigo" : `${n} artigos`),
  },
  footer: {
    rights: "Todos os direitos reservados.",
    tagline: "Peças esculturais em cortiça portuguesa autêntica.",
    sections: { explore: "Explorar", help: "Apoio", legal: "Legal" },
    legalLinks: { privacy: "Privacidade", terms: "Termos", shipping: "Envios" },
    helpLinks: {
      contact: "Contacto",
      faq: "Perguntas",
      shipping: "Envios",
      returns: "Devoluções",
    },
    newsletter: {
      title: "Junte-se ao Atelier",
      body: "Primeiros olhares sobre novos tesouros e histórias do estúdio. Sem ruído.",
      placeholder: "O seu email",
      cta: "Subscrever",
      thanks: "Bem-vindo(a) ao atelier.",
    },
  },
  common: {
    shopTreasures: "Comprar Tesouros",
    watchOurFilm: "Ver o filme",
    learnMore: "Saber mais",
    addToCart: "Adicionar ao carrinho",
    added: "Adicionado ✓",
    viewAll: "Ver tudo",
    viewTreasure: "Ver tesouro",
    explore: "Explorar",
    readStory: "Ler a história",
    discover: "Descobrir",
    inStock: "Em stock",
    soldOut: "Esgotado",
    loading: "A carregar…",
    error: "Ocorreu um erro.",
    backTo: "Voltar a",
  },
  cart: {
    title: "O seu carrinho",
    eyebrow: "O Seu Carrinho",
    emptyHeadline1: "Vazio",
    emptyHeadline2: "por agora.",
    emptyBody:
      "Ainda não adicionou nenhum tesouro. Dê um passeio pela colecção — cada peça é acabada à mão, assinada e numerada.",
    emptyCta: "Explorar Tesouros",
    treasure: (n) => (n === 1 ? "1 tesouro" : `${n} tesouros`),
    pieces: (n) => (n === 1 ? "1 peça no total" : `${n} peças no total`),
    signedNumbered: "Assinado e numerado",
    each: "cada",
    couponNotRecognized: (code) =>
      `Não reconhecemos "${code}". Tente no checkout.`,
    shippingNote: "Europa 4–7 dias · Outros 7–12 dias",
    secureCheckoutNote: "Pagamento seguro · PayPal · Multibanco",
    empty: {
      title: "O seu carrinho está vazio.",
      body: "Comece com uma única peça. O atelier está aberto.",
      cta: "Ver tesouros",
    },
    item: { remove: "Remover", quantity: "Quantidade" },
    summary: {
      title: "Resumo da encomenda",
      subtotal: "Subtotal",
      shipping: "Envio",
      shippingFree: "Grátis",
      total: "Total",
      proceedToCheckout: "Finalizar Compra",
      continueShopping: "Continuar a comprar",
      couponPlaceholder: "Código promocional",
      couponApply: "Aplicar",
    },
  },
  checkout: {
    title: "Finalização",
    backToCart: "Voltar ao carrinho",
    emptyCart: {
      title: "O seu carrinho está vazio.",
      body: "Adicione um tesouro ao carrinho e volte aqui para concluir a sua encomenda.",
    },
    couponHint: "Tem um cupão? Adicione-o no passo anterior.",
    billingDetails: "Dados de facturação",
    yourOrder: "A sua encomenda",
    sections: {
      contact: "Contacto",
      shipping: "Envio",
      payment: "Pagamento",
      review: "Revisão",
    },
    fields: {
      firstName: "Nome próprio",
      lastName: "Apelido",
      company: "Empresa (opcional)",
      country: "País / Região",
      street: "Morada",
      apt: "Apartamento, andar, etc. (opcional)",
      city: "Localidade / Cidade",
      postcode: "Código postal",
      phone: "Telefone",
      email: "Endereço de email",
      orderNotes: "Notas da encomenda (opcional)",
      orderNotesPlaceholder:
        "Notas sobre a encomenda, ex. instruções especiais de entrega.",
    },
    validation: {
      required: (label) => `${label} é obrigatório`,
      invalidEmail: "Por favor, introduza um email válido",
      mustAgreeTerms: "Tem de aceitar os termos antes de finalizar a encomenda",
    },
    summary: {
      subtotal: "Subtotal",
      shipment: "Envio",
      freeShipping: "Envio gratuito",
      shippingNote: "Europa 4–7 dias · Outros 7–12 dias",
      total: "Total",
    },
    paymentSectionTitle: "Método de pagamento",
    payment: {
      paypal: { label: "PayPal", description: "Pagar via PayPal." },
      multibanco: {
        label: "Multibanco",
        description: "Pagar com referência Multibanco (Portugal).",
      },
      cod: {
        label: "Pagamento na Entrega",
        description: "Pague em dinheiro quando o seu tesouro for entregue.",
      },
    },
    privacyNotice: {
      before:
        "Os seus dados pessoais serão usados para processar a sua encomenda, apoiar a sua experiência neste website e para outros fins descritos na nossa ",
      link: "política de privacidade",
      after: ".",
    },
    termsLabel: {
      before: "Li e aceito os ",
      link: "termos e condições",
    },
    placeOrderLabel: (price) => `Finalizar encomenda — ${price}`,
    placingOrder: "A finalizar…",
    demoNote: "Checkout demo · não será cobrado nenhum valor",
    terms: "Aceito os termos e a política de privacidade.",
    placeOrder: "Finalizar encomenda",
    processing: "A processar…",
    success: {
      eyebrow: "Encomenda colocada",
      title: "Obrigado,",
      titleAccent: "o seu tesouro está a caminho.",
      body: "Recebemos a sua encomenda. Em breve receberá um email de confirmação com os detalhes de acompanhamento. Cada tesouro Sildel é embalado à mão no nosso atelier em Portugal antes de ser enviado.",
      orderNumber: "Número da encomenda",
      email: "Email",
      payment: "Pagamento",
      total: "Total",
      browseMore: "Ver mais tesouros",
      backHome: "Voltar ao início",
    },
  },
};

export const UI_DICT: Record<Locale, UiDict> = { en, pt };

export function getUi(locale: Locale): UiDict {
  return UI_DICT[locale];
}
