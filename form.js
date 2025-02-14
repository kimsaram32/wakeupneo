const form = document.querySelector('[data-form]');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(form);
  const date =
    `${formData.get('date')}T00:00:00`; // Set time zone to the local timezone
  const message = btoa(formData.get('message'));

  const searchParams = new URLSearchParams({
    date,
    message,
  });

  location.href = `./countdown?${searchParams}`;
});
