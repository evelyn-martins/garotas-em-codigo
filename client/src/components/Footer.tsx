export default function Footer() {
	const year = new Date().getFullYear();

	const links = [
		{ heading: 'Produtos', items: ['Plataforma', 'Oportunidades', 'Conexões'] },
		{ heading: 'Recursos', items: ['Blog', 'Eventos', 'Guias'] },
		{ heading: 'Comunidade', items: ['Fórum', 'Mentorias', 'Voluntariado'] },
	];

	return (
		<footer className="border-t border-action-primary/30 bg-action-primary/10">
			<div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:px-8">
				<div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between">
					<div className="flex flex-col items-center text-center sm:max-w-xs sm:items-start sm:text-left">
						<h3 className="text-lg font-semibold text-color-logo">Garotas em Código</h3>
						<p className="mt-2 text-sm text-text">Conectando talentos, inspirando carreiras — uma comunidade de mulheres na tecnologia.</p>

						<div className="mt-4 flex items-center gap-3">
							<a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-action-primary/10 text-action-primary transition-colors hover:bg-action-primary/20">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
									<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</a>

							<a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-action-primary/10 text-action-primary transition-colors hover:bg-action-primary/20">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
									<path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</a>
						</div>
					</div>

					<div className="grid w-full grid-cols-3 gap-4 sm:w-auto sm:gap-8">
						{links.map(col => (
							<div key={col.heading} className="flex flex-col items-center sm:items-start">
								<h4 className="text-sm font-semibold text-color-logo">{col.heading}</h4>
								<ul className="mt-3 space-y-2">
									{col.items.map(item => (
										<li key={item}>
											<a href="#" className="text-sm text-text transition-colors hover:text-action-primary">{item}</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="mt-8 border-t border-action-primary/30 pt-6 text-center text-sm text-text sm:flex sm:items-center sm:justify-between">
					<p>© {year} Garotas em Código. Todos os direitos reservados.</p>
					<div className="mt-3 flex items-center justify-center gap-4 sm:mt-0">
						<a href="#" className="text-text transition-colors hover:text-action-primary">Termos</a>
						<span className="text-action-primary/60">•</span>
						<a href="#" className="text-text transition-colors hover:text-action-primary">Privacidade</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
