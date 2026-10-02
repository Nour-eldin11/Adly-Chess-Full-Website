const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.focus()}});
for (const form of document.querySelectorAll('.academy-form')) {
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const originalLabel = button.innerHTML;
  let busy = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;
    const trial = form.dataset.type === 'trial';
    data._subject = trial ? 'Adly website — Free trial class request' : 'Adly website — ' + data['Inquiry type'];
    data._replyto = data.email;
    data._template = 'table';
    data.Website = window.location.origin + window.location.pathname;
    busy = true;
    button.disabled = true;
    button.textContent = 'Submitting…';
    form.setAttribute('aria-busy', 'true');
    status.hidden = false;
    status.className = 'form-status wide';
    status.setAttribute('role', 'status');
    status.textContent = 'Sending your request…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    let submitted = false;
    try {
      const response = await fetch(form.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const result = await response.json();
      const message = String(result.message || '');
      const activationPending = /activat|confirm.{0,25}email|check.{0,25}email/i.test(message);
      if (activationPending) {
        status.classList.add('is-error');
        status.setAttribute('role', 'alert');
        status.textContent = 'Online requests are awaiting email activation. Your details have been kept here. Please contact info@adlychess.com or call +20 103 317 2288.';
      } else if (response.ok && (result.success === true || result.success === 'true')) {
        submitted = true;
        status.classList.add('is-success');
        status.textContent = trial
          ? 'Your free-class request has been submitted. The academy will contact you to confirm availability and arrange your session. This is not a confirmed booking.'
          : 'Your message has been submitted. The academy will reply using the contact details you provided.';
        form.reset();
        button.textContent = 'Request submitted';
      } else {
        status.classList.add('is-error');
        status.setAttribute('role', 'alert');
        status.textContent = 'Your request could not be submitted. Your details are still here. Please try again, or contact info@adlychess.com / +20 103 317 2288.';
      }
    } catch {
      status.classList.add('is-error');
      status.setAttribute('role', 'alert');
      status.textContent = 'We could not confirm submission. Your details are still here. Please check with the academy at info@adlychess.com or +20 103 317 2288 before sending again.';
    } finally {
      clearTimeout(timeout);
      busy = false;
      form.removeAttribute('aria-busy');
      if (!submitted) { button.disabled = false; button.innerHTML = originalLabel; }
    }
  });
}

const lightbox=document.querySelector('#gallery-dialog');
if(lightbox){const buttons=[...document.querySelectorAll('.gallery-item')],photo=lightbox.querySelector('img'),counter=lightbox.querySelector('[data-counter]');let index=0;function show(n){index=(n+buttons.length)%buttons.length;photo.src=buttons[index].dataset.full;photo.alt=buttons[index].querySelector('img').alt;counter.textContent=(index+1)+' / '+buttons.length;}for(const [i,b] of buttons.entries())b.addEventListener('click',()=>{show(i);lightbox.showModal()});lightbox.querySelector('.close').addEventListener('click',()=>lightbox.close());lightbox.querySelector('[data-prev]').addEventListener('click',()=>show(index-1));lightbox.querySelector('[data-next]').addEventListener('click',()=>show(index+1));lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}});lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close()}});}
