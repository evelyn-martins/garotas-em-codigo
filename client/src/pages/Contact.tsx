import { LuMail } from 'react-icons/lu';
import Header from '../components/Header';
import Footer from '../components/Footer';

const channels = [
    {
        icon: <LuMail className="text-2xl" />,
        title: 'E-mail',
        description: 'Prefere escrever? Nos envie uma mensagem por e-mail e responderemos em até 2 dias úteis.',
        value: 'contato@garotasemcodigo.com.br',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Instagram',
        description: 'Acompanhe novidades, bastidores e conteúdo sobre mulheres na tecnologia.',
        value: '@garotasemcodigo',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'LinkedIn',
        description: 'Conecte-se com a comunidade e fique por dentro de oportunidades e parcerias.',
        value: 'Garotas em Código',
    },
];

const faqs = [
    {
        question: 'Como posso fazer parte da comunidade?',
        answer: 'Basta criar uma conta gratuitamente na plataforma. O cadastro é rápido e abre acesso a todas as funcionalidades.',
    },
    {
        question: 'A plataforma é gratuita?',
        answer: 'Sim! O acesso à plataforma é totalmente gratuito para todas as usuárias.',
    },
    {
        question: 'Posso me tornar uma guia de mentoria?',
        answer: 'Sim. Após criar sua conta, você pode solicitar o perfil de guia e começar a ajudar outras mulheres na tecnologia.',
    },
    {
        question: 'Tenho uma sugestão para a plataforma. Como envio?',
        answer: 'Adoramos sugestões! Entre em contato pelo e-mail ou pelas redes sociais listados nesta página.',
    },
];

export default function Contact() {
    return (
        <div className="flex min-h-svh flex-col">
            <Header />

            <main className="flex-1">
                <section className="bg-bg-primary">
                    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-28 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <span className="inline-block rounded-full bg-action-primary/20 px-4 py-1 text-xs font-semibold text-action-primary">
                                Contato
                            </span>
                            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-color-logo sm:text-4xl lg:text-5xl">
                                Fale com a gente
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-text sm:text-lg">
                                Tem dúvidas, sugestões ou quer saber mais sobre a plataforma? Escolha o canal que preferir.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-extrabold text-color-logo sm:text-3xl">Nossos canais</h2>
                            <p className="mt-3 max-w-xl text-sm text-text sm:text-base">
                                Escolha a forma que for mais cômoda para você.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {channels.map(channel => (
                                <a
                                    key={channel.title}
                                    className="group flex flex-col items-center rounded-2xl border border-details-primary bg-bg-primary/20 p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-action-primary/40 hover:shadow-md"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-action-primary/10 text-action-primary transition-colors group-hover:bg-action-primary/20">
                                        {channel.icon}
                                    </div>
                                    <h3 className="mt-4 text-base font-semibold text-color-logo">{channel.title}</h3>
                                    <p className="mt-2 text-xs leading-5 text-text">{channel.description}</p>
                                    <span className="mt-4 text-xs font-semibold text-action-primary">{channel.value}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(242,172,172,0.14),transparent_38%),linear-gradient(180deg,#fffaf8_0%,#fff_100%)]">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-0 top-12 h-40 w-40 rounded-full bg-action-primary/10 blur-3xl" />
                        <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-details-primary/20 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-extrabold text-color-logo sm:text-3xl">Perguntas frequentes</h2>
                            <p className="mt-3 max-w-xl text-sm text-text sm:text-base">
                                Talvez sua dúvida já esteja respondida aqui.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {faqs.map(faq => (
                                <div
                                    key={faq.question}
                                    className="rounded-2xl border border-details-primary bg-white/85 p-6 text-left shadow-sm"
                                >
                                    <h3 className="text-sm font-semibold text-color-logo">{faq.question}</h3>
                                    <p className="mt-2 text-xs leading-5 text-text">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-t border-action-primary/30 bg-action-primary/10">
                    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-extrabold text-color-logo sm:text-3xl">Ainda tem dúvidas?</h2>
                            <p className="mt-3 max-w-xl text-sm text-text sm:text-base">
                                Entre em contato pelo e-mail e nossa equipe responderá o mais breve possível.
                            </p>
                            <a
                                href="mailto:contato@garotasemcodigo.com.br"
                                className="mt-8 inline-block rounded-full bg-action-primary px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-action-primary/40 transition-all hover:-translate-y-0.5 hover:brightness-95"
                            >
                                Enviar e-mail
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
