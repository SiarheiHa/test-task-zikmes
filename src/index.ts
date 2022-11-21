import './font-awesome/font-awesome.min.css';
import './index.scss';

const showMessage = (message: string) => {
  const node = document.createElement('p');
  node.classList.add('message');
  node.innerText = message;
  document.body.append(node);
  setTimeout(() => node.remove(), 1500);
};

const submitData = async (data: object) => {
  const res = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Could not fetch, received ${res.status}`);
  }
  return res.json();
};

const handlesubmit = async (e: SubmitEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData.entries());
  try {
    await submitData(formDataObj);
    form.reset();
    showMessage('Форма отправлена');
  } catch {
    showMessage('Завершено неудачей');
  }
};

const form = document.querySelector('.form') as HTMLFormElement;

form.addEventListener('submit', handlesubmit);
