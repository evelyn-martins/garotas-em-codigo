import { FaReact, FaServer, FaChartBar, FaMobileAlt } from 'react-icons/fa';

export default function AreasCard(){
  const areas = [
    { title: 'Front-end', description: 'React, HTML, CSS, UI/UX', icon: <FaReact /> },
    { title: 'Back-end', description: 'Node.js, APIs, bancos de dados', icon: <FaServer /> },
    { title: 'Data Science', description: 'Análise de dados e ML', icon: <FaChartBar /> },
    { title: 'Mobile', description: 'Apps iOS/Android', icon: <FaMobileAlt /> },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-color-logo">Áreas de Tecnologia da Informação</h2>
          <p className="mt-2 text-sm text-text">Algumas áreas populares para explorar na plataforma.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <article key={area.title} className="w-full h-28 sm:h-32 lg:h-36">
              <div className="group bg-white/85 border border-details-primary rounded-2xl p-3 hover:shadow-md transition-shadow h-full flex items-center">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-action-primary/10 text-action-primary text-xl shrink-0">
                    {area.icon}
                  </div>

                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-color-logo">{area.title}</h3>
                    {area.description && <p className="mt-1 text-xs text-text">{area.description}</p>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a href="/areas" className="rounded-full bg-action-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-95">Explorar mais</a>
        </div>
      </div>
    </section>
  );
}
