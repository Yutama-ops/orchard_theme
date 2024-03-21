class General {
	constructor() {
		this.init();
	}

	init() {
		this.renderPosts();
		this.bindAnchorClicks();
	}

	bindAnchorClicks() {
		// console.log anchor interaction
		document.body.addEventListener('click', (e) => {
			const anchor = e.target.closest('a');
			if (anchor) {
				console.log('Anchor clicked:', anchor);
			}
		});
	}

	renderPosts() {
		// rendering content using this so the data can be changed with ease fromt the json
		if (document.getElementById('static')) {
			fetch('../assets/src/content.json')
				.then((response) => response.json())
				.then((data) => {
					const latestPostsSection = document.querySelector('.latest-post .row');
					const modalSection = document.querySelector('.section-modal');
					const latestPosts = data.sections.find((section) => section.id === 'latest-post').posts;
					const mainContentImages = data.sections.find((section) => section.id === 'main-content').images;
					const imageElements = document.querySelectorAll('#main-content .container .row .d-none img');
					const mainContent = data.sections.find((section) => section.id === 'main-content');
					const mainContentSection = document.querySelector('#main-content-text');
					const imgCarouselSection = document.querySelector('.carousel-mobile');

					imgCarouselSection.innerHTML += `
					<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-inner">
					<div class="carousel-item active">
					<img src="${mainContentImages[0].srcMobile}" class="d-block w-100" alt="${mainContentImages[0].alt}" data-bs-toggle="modal" data-bs-target="#modal-${mainContentImages[0].id}">
					</div>
						<div class="carousel-item">
						<img src="${mainContentImages[1].srcMobile}" class="d-block w-100 pb-2" alt="${mainContentImages[1].alt}" data-bs-toggle="modal" data-bs-target="#modal-${mainContentImages[1].id}">
						<img src="${mainContentImages[2].srcMobile}" class="d-block w-100" alt="${mainContentImages[2].alt}" data-bs-toggle="modal" data-bs-target="#modal-${mainContentImages[2].id}">
						
					</div>
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
					</div>`;

					mainContentSection.innerHTML += `
						<div>
							<h3 class="fw-light text-uppercase border-bottom border-secondary main-title">${mainContent.title}</h3>
							<div class="content-overflow">
							<p class="main-content-paragraph main-content">${mainContent.content}</p>
							<h6 class="text-danger sub-title">${mainContent.subTitle}</h6>
							<h5 class="fw-bold text-primary sub-content mb-0">${mainContent.subContent}</h5>
						</div>
						`;

					imageElements.forEach((imgElement, index) => {
						const imageSource = mainContentImages[index] ? mainContentImages[index].src : '/assets/src/img/orchard_logo.jpeg';
						imgElement.src = imageSource;
						imgElement.alt = mainContentImages[index] ? mainContentImages[index].alt : 'Placeholder image';
						imgElement.setAttribute('data-bs-toggle', 'modal');
						imgElement.setAttribute('data-bs-target', `#modal-${mainContentImages[index].id}`);
						imgElement.onerror = () => {
							imgElement.src = '/assets/src/img/orchard_logo.jpeg';
							imgElement.alt = 'Placeholder image';
						};

						modalSection.innerHTML += `
							<div class="modal fade" id="modal-${mainContentImages[index].id}" tabindex="-1" aria-labelledby="modal-${mainContentImages[index].id}" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered">
									<div class="modal-content">
										<div class="modal-body bg-light position-relative">
											<button type="button" class="btn-close end-0 position-absolute py-1 px-1 bg-primary mx-2 my-1" data-bs-dismiss="modal" aria-label="Close"></button>
											<img src="${imgElement.src}" class="img-fluid w-100 align-self-stretch" alt="${imgElement.alt}">
										</div>
									</div>
								</div>
							</div>
						`;
					});

					latestPosts.forEach((post) => {
						latestPostsSection.innerHTML += `
							<div class="col-12 col-md-6 col-lg-4 post-container">
								<a href="${post.readMoreLink}" aria-label="Read more about ${post.title}">
									<article class="post-entry">
										<img src="${post.image.src}" onerror="this.src='/assets/src/img/orchard_logo.jpeg';" class="w-100 border-danger border-bottom border-5 mb-1 mb-md-2" alt="${post.image.alt}">
										<h5 class="fw-bold">${post.title}</h5>
										<p>${post.content}</p>
										<h5 class="read-more text-primary d-inline-block fw-bold border-danger border-bottom border-2 mb-3">Read More</h5>
									</article>
								</a>
							</div>
						`;
					});
				})
				.catch((error) => console.error('Error could not fetch data :', error));
		}
	}
}
export default General;
