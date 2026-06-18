import image_hero from '../assets/image_hero.png';

export default function Hero (){
    return (
        <section className="bg-bg-primary">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-24 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-8">
                <div className="w-full lg:w-1/2 text-left">
                    <h1 className="text-3xl font-extrabold text-color-logo sm:text-4xl lg:text-5xl">Plataforma de Conexões e Oportunidades</h1>
                    <p className="mt-4 text-base text-text sm:text-lg">Encontre inspirações, oportunidades e conexões que impulsionam sua carreira e projetos.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href="/auth" className="rounded-full bg-action-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-95">Começar</a>
                        <a href="/auth" className="rounded-full border border-details-primary px-6 py-3 text-sm font-semibold text-color-logo">Saiba mais</a>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img src={image_hero} alt="Ilustração da plataforma" className="w-full max-w-md lg:max-w-lg h-auto object-contain" />
                </div>
            </div>
        </section>
    );
}