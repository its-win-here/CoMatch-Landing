// Scroll reveal
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));

  // Smooth nav anchor scrolling + active tab state
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const sectionLinks = Array.from(anchorLinks).filter(a => a.getAttribute('href').length > 1);
  const pageSections = Array.from(document.querySelectorAll('section[id]'));

  function updateNavActiveLink() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.15;
    let currentId = '';
    pageSections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    sectionLinks.forEach(link => {
      const target = link.getAttribute('href');
      link.classList.toggle('active', target === `#${currentId}`);
    });
  }

  sectionLinks.forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', updateNavActiveLink);
  window.addEventListener('resize', updateNavActiveLink);
  window.addEventListener('load', updateNavActiveLink);
