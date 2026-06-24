import { LuUsers, LuStar, LuBriefcase, LuGraduationCap } from 'react-icons/lu';
import Header from '../components/Header';
import Footer from '../components/Footer';

const values = [
    {
        icon: <LuUsers />,
        title: 'Comunidade',
        description: 'Um espaço seguro e acolhedor onde mulheres se apoiam, compartilham experiências e crescem juntas na tecnologia.',
    },
    {
        icon: <LuStar />,
        title: 'Inspiração',
        description: 'Referências femininas que mostram que o caminho é possível — do passado ao presente, mulheres moldando a tecnologia.',
    },
    {
        icon: <LuBriefcase />,
        title: 'Oportunidades',
        description: 'Vagas, programas e bolsas pensados para ampliar o acesso de mulheres ao mercado de tecnologia.',
    },
    {
        icon: <LuGraduationCap />,
        title: 'Mentoria',
        description: 'Conexões com profissionais que já percorreram esse caminho e estão prontas para guiar quem está começando.',
    },
];

const features = [
    { title: 'Mentoria Colaborativa', desc: 'Conecte-se com profissionais e peça orientação para sua carreira em TI.' },
    { title: 'Feed da Comunidade', desc: 'Compartilhe conquistas, dúvidas e experiências com outras mulheres.' },
    { title: 'Referências Femininas', desc: 'Conheça mulheres que moldaram e continuam moldando a tecnologia.' },
    { title: 'Oportunidades', desc: 'Descubra vagas, bolsas e programas voltados para mulheres em tech.' },
];

export default function About() {
    return (
        <div className="flex min-h-svh flex-col">
            <Header />

            <main className="flex-1">
                <section className="bg-bg-primary">
                    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-28 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <span className="inline-block rounded-full bg-action-primary/20 px-4 py-1 text-xs font-semibold text-action-primary">
                                Sobre a plataforma
                            </span>
                            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-color-logo sm:text-4xl lg:text-5xl">
                                Feita por e para mulheres<br className="hidden sm:block" /> na tecnologia
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text sm:text-lg">
                                A <strong className="font-semibold text-color-logo">Garotas em Código</strong> nasceu com um propósito: reduzir as barreiras que mulheres enfrentam para entrar e crescer no mercado de TI. Somos uma plataforma de conexões, inspiração e oportunidades.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <a
                                    href="/auth"
                                    className="rounded-full bg-action-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-95"
                                >
                                    Fazer parte
                                </a>
                                <a
                                    href="/auth/login"
                                    className="rounded-full border border-details-primary px-7 py-3 text-sm font-semibold text-color-logo transition-all hover:bg-white/60"
                                >
                                    Já tenho conta
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(242,172,172,0.14),transparent_38%),linear-gradient(180deg,#fffaf8_0%,#fff_100%)]">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-0 top-12 h-40 w-40 rounded-full bg-action-primary/10 blur-3xl" />
                        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-details-primary/20 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-extrabold text-color-logo sm:text-3xl">Nossos pilares</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-text sm:text-base">
                                Tudo que construímos gira em torno de quatro valores que acreditamos ser essenciais.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {values.map(value => (
                                <article key={value.title} className="group flex flex-col rounded-2xl border border-details-primary bg-white/85 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-action-primary/40 hover:shadow-md">
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-action-primary/10 text-action-primary text-xl">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-sm font-semibold text-color-logo">{value.title}</h3>
                                    <p className="mt-2 text-xs leading-5 text-text">{value.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24 lg:px-8">
                        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
                            <div className="text-left lg:w-1/2">
                                <h2 className="text-2xl font-extrabold text-color-logo sm:text-3xl">Nossa história</h2>
                                <p className="mt-4 text-sm leading-7 text-text sm:text-base">
                                    A plataforma surgiu como um Trabalho de Conclusão de Curso com uma missão clara: criar um espaço digital que incentive e apoie mulheres que desejam ingressar ou crescer na área de TI.
                                </p>
                                <p className="mt-4 text-sm leading-7 text-text sm:text-base">
                                    Sabemos que a sub-representação feminina na tecnologia é um problema real — e acreditamos que conexões humanas, referências inspiradoras e acesso à informação são ferramentas poderosas para mudar esse cenário.
                                </p>
                                <p className="mt-4 text-sm leading-7 text-text sm:text-base">
                                    Aqui você encontra mentoras, oportunidades, uma comunidade ativa e histórias de mulheres que já trilharam esse caminho.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-1/2">
                                {features.map(item => (
                                    <div key={item.title} className="rounded-xl border border-details-primary/60 bg-bg-primary/30 p-5 text-left">
                                        <h4 className="text-sm font-semibold text-color-logo">{item.title}</h4>
                                        <p className="mt-1.5 text-xs leading-5 text-text">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-action-primary/30 bg-action-primary/10">
                    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-extrabold text-color-logo sm:text-3xl">Pronta para começar?</h2>
                            <p className="mt-3 max-w-xl text-sm text-text sm:text-base">
                                Junte-se a mulheres que já estão construindo sua carreira em tecnologia.
                            </p>
                            <a
                                href="/auth"
                                className="mt-8 inline-block rounded-full bg-action-primary px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-action-primary/40 transition-all hover:-translate-y-0.5 hover:brightness-95"
                            >
                                Criar minha conta
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
