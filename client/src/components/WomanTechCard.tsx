import ada_lovelace from '../assets/ada_lovelace.jpg';
import grace_hopper from '../assets/grace_hopper.jpg';
import hedy_lamarr from '../assets/hedy_lamarr.jpg';
import sheryl_sandberg from '../assets/sheryl_sandberg.webp';
export default function WomanTechCard() {
    const women = [
        {
            name: 'Ada Lovelace',
            area: 'Primeira Programadora',
            description: 'Criou o primeiro algoritmo destinado a ser executado por uma máquina.',
            image: ada_lovelace,
        },
        {
            name: 'Grace Hopper',
            area: 'Ciência da Computação',
            description: 'Criou a Flow-Matic, que influenciou o desenvolvimento do COBOL.',
            image: grace_hopper,
        },
        {
            name: 'Hedy Lamarr',
            area: 'Engenharia',
            description: 'Desenvolveu uma tecnologia que influenciou o Wi-Fi e o Bluetooth.',
            image: hedy_lamarr,
        },
        {
            name: 'Sheryl Sandberg',
            area: 'Tecnologia & Negócios',
            description: 'Ex-COO da Meta e líder no setor de tecnologia.',
            image: sheryl_sandberg,
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(242,172,172,0.14),transparent_38%),linear-gradient(180deg,#fffaf8_0%,#fff_100%)]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-0 top-12 h-40 w-40 rounded-full bg-action-primary/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-details-primary/20 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-color-logo sm:text-4xl">
                        Mulheres que Inspiram
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-text sm:text-base">
                        Conheça algumas das mulheres mais influentes no mundo da tecnologia.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {women.map((woman) => (
                        <article key={woman.name} className="w-full h-44 sm:h-48 lg:h-52">
                            <div className="group flex h-full flex-col items-center justify-center rounded-2xl border border-details-primary bg-white/85 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-action-primary/40 hover:shadow-md">
                                <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-action-primary/15 text-3xl ring-4 ring-action-primary/10">
                                    <img src={woman.image} alt={woman.name} className="rounded-full h-full w-full object-cover" />
                                </div>
                                <h3 className="text-base font-semibold text-color-logo">{woman.name}</h3>
                                <p className="mt-1 text-xs font-medium text-action-primary">{woman.area}</p>
                                {woman.description && <p className="mt-2 text-xs leading-5 text-text line-clamp-2">{woman.description}</p>}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <a
                        href="/auth"
                        className="rounded-full bg-action-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-95 transition-all"
                    >
                        Explorar mais
                    </a>
                </div>
            </div>
        </section>
    );
}
