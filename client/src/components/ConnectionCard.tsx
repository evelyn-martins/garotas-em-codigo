import { FaUser, FaHandshake, FaCheckCircle } from 'react-icons/fa';

export default function ConnectionCard() {
    const steps = [
        {
            title: 'Escolha sua Conexão',
            description: 'Encontre usuárias com interesses em comum e solicite uma conversa sobre os temas que você deseja aprender.',
            icon: <FaUser />,
        },
        {
            title: 'Match de Conhecimento',
            description: 'Aguarde o aceite da sua solicitação. Esse é o momento de validar o interesse mútuo em compartilhar experiências.',
            icon: <FaHandshake />,
        },
        {
            title: 'Conectadas!',
            description: 'Com a solicitação aceita, o chat é liberado! Aproveite o espaço para trocar ideias, tirar dúvidas e criar conexões reais.',
            icon: <FaCheckCircle />,
        },
    ];

    return (
        <section className="bg-white/5">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-extrabold text-color-logo sm:text-3xl">Conexão Garotas</h2>
                    <p className="mt-3 text-sm text-text sm:text-base">Encontre parceiras de estudo, compartilhe o que você sabe e evoluam juntas na tecnologia.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <article key={step.title} className="relative">
                            <div className="h-full group bg-white/85 border border-details-primary rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:border-action-primary/50">
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-action-primary/15 text-action-primary text-2xl mb-4">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full bg-action-primary text-white text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-base font-semibold text-color-logo">{step.title}</h3>
                                    <p className="mt-3 text-sm text-text leading-5">{step.description}</p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-linear-to-r from-action-primary/50 to-transparent transform -translate-y-1/2" />
                            )}
                        </article>
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="text-sm text-text max-w-2xl">Amplie sua rede de contatos, aprenda com outras mulheres na tecnologia e descubra novas perspectivas sobre os assuntos que você se interessa.</p>
                    <a href="#" aria-label="Comece a se conectar" className="rounded-full bg-action-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-95 transition-all">Comece a se Conectar</a>
                </div>
            </div>
        </section>
    );
}